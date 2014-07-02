#!/bin/sh
shAesDecrypt() {
  ## this function decrypts base64-encode stdin to stdout using aes-256-cbc
  ## save stdin to $TEXT
  local TEXT=$(cat /dev/stdin)
  ## init $IV from first 44 base64-encoded bytes of $TEXT
  local IV=$(printf $TEXT | cut -c1-44 | base64 --decode)
  ## decrypt remaining base64-encoded bytes of $TEXT to stdout using aes-256-cbc
  printf $TEXT | cut -c45-9999 | base64 --decode | openssl enc -aes-256-cbc -d -K $AES_256_KEY -iv $IV
}

shAesDecryptTravis() {
  ## this function decrypts $AES_ENCRYPTED_SH in .travis.yml to stdout
  perl -ne "print \$2 if /(- AES_ENCRYPTED_SH: )(.*)( ## AES_ENCRYPTED_SH\$)/" .travis.yml |\
    shAesDecrypt || return $?
}

shAesEncrypt() {
  ## this function encrypts stdin to base64-encode stdout,
  ## with a random iv prepended using aes-256-cbc
  ## init $IV from random 16 bytes
  local IV=$(openssl rand -hex 16)
  ## print base64-encoded $IV to stdout
  printf $(printf "$IV " | base64)
  ## encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
  openssl enc -aes-256-cbc -K $AES_256_KEY -iv $IV | base64 | tr -d "\n" || return $?
}

shAesEncryptTravis() {
  ## this function encrypts the script $1 to $AES_ENCRYPTED_SH and stores it in .travis.yml
  ## init $FILE
  local FILE=$1
  if [ ! -f "$FILE" ]
  then
    printf "## non-existent file $FILE\n"
    return 1
  fi
  if [ ! "$AES_256_KEY" ]
  then
    printf "## no \$AES_256_KEY detected in env - creating new AES_256_KEY ...\n"
    AES_256_KEY=$(openssl rand -hex 32)
    printf "## a new \$AES_256_KEY for encrypting data has been created.\n"
    printf "## you may want to copy the following to your .bashrc script\n"
    printf "## so you can run ci builds locally:\n"
    printf "export AES_256_KEY=$AES_256_KEY\n\n"
  fi
  printf "## travis-encrypting \$AES_256_KEY for $GITHUB_REPO ...\n"
  AES_256_KEY_ENCRYPTED=$(shTravisEncrypt $GITHUB_REPO \$AES_256_KEY=$AES_256_KEY)
  ## return non-zero exit code if $AES_256_KEY_ENCRYPTED is empty string
  if [ ! "$AES_256_KEY_ENCRYPTED" ]
  then
    return 1
  fi
  printf "## updating .travis.yml with encrypted key ...\n"
  perl -i -pe\
    "s%(- secure: )(.*)( ## AES_256_KEY$)%\$1$AES_256_KEY_ENCRYPTED\$3%"\
    .travis.yml || return $?

  printf "## updating .travis.yml with encrypted script ...\n"
  perl -i -pe\
    "s%(- AES_ENCRYPTED_SH: )(.*)( ## AES_ENCRYPTED_SH$)%\$1$(shAesEncrypt < $FILE)\$3%"\
    .travis.yml || return $?
}

shBuild() {
  ## this function builds the package
  ## decrypt and exec encrypted data
  eval "$(shAesDecryptTravis)" || return $?
  ## init travis-ci.org env
  if [ "$TRAVIS" ]
  then
    ## init xvfb
    ## http://docs.travis-ci.com/user/gui-and-headless-browsers/
    export DISPLAY=:99.0 && sh -e /etc/init.d/xvfb start
    export CI_BUILD_DIR=build.travis-ci.org
    export CI_BRANCH=$TRAVIS_BRANCH
    export CI_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
    export CI_COMMIT_ID=$TRAVIS_COMMIT
  ## init default env
  else
    export CI_BUILD_DIR=build.local
    export CI_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    export CI_BUILD_NUMBER=0
    export CI_COMMIT_ID=$(git rev-parse --verify HEAD)
  fi
  export CI_COMMIT_MESSAGE=$(git log -1 --pretty=%s)
  export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE"
  npm test
  ## create coverage badge
  node $MAIN_JS --mode-cli=coverageReportBadgeCreate || return $?
  ## upload build
  for DIR in\
    $CI_BUILD_DIR/latest.$CI_BRANCH\
    $CI_BUILD_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID
  do
    for FILE in $(find .build -type f)
    do
      node $MAIN_JS --mode-cli=githubContentsFilePush $FILE .build $DIR || return $?
      ## throttle github file updates
      sleep 1
    done
  done
}

shGithubContentsDirPush() {
  ## this function pushes the local dir $1 to the remote github dir $2
  local DIR1=$1
  local DIR2=$2
  local FILE2
  for FILE1 in $(find $DIR1 -type f)
  do
    node $MAIN_JS --mode-cli=githubContentsFilePush $FILE1 $DIR1 $DIR2 || return $?
    ## throttle github file updates
    sleep 1
  done
}

shNpmInstall() {
  ## this function runs after npm install
  node $MAIN_JS --mode-cli=npmInstall || return $?
}

shNpmTest() {
  ## this function runs npm test
  ## jslint example.js and jslint-lite.js
  node $MAIN_JS example.js jslint-lite.js
  ## install istanbul
  if [ ! "$(which istanbul)" ]
  then
    npm install istanbul || return $?
  fi
  ## run example.js
  node example.js || return $?
  ## remove old coverage report
  rm -fr .build/coverage-report
  ## init $ARGS
  local ARGS="$MAIN_JS"
  ARGS="$ARGS --dir=.build/coverage-report"
  ARGS="$ARGS --print=detail"
  ARGS="$ARGS --report=html"
  ARGS="$ARGS --"
  ARGS="$ARGS --mode-cli=npmTest"
  ## npm test with coverage
  istanbul cover $ARGS
  ## save $EXIT_CODE
  EXIT_CODE=$?
  ## re-run npm test without coverage if tests failed,
  ## so we can debug line numbers in stack trace
  if [ "$EXIT_CODE" != 0 ]
  then
    ## npm test without coverage
    istanbul test $ARGS || return $?
  fi
  ## return $EXIT_CODE
  return $EXIT_CODE
}

shSandbox() {
  ## this function is for sandboxing
  ## decrypt and exec encrypted data
  eval "$(shAesDecryptTravis)" || return $?
}

shTravisEncrypt() {
  ## this function travis-encrypts github repo $1's secret $2
  local GITHUB_REPO=$1
  local SECRET=$2
  ## get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
  curl -3fLs https://api.travis-ci.org/repos/$GITHUB_REPO/key |\
    perl -pe "s/[^-]+(.+-).+/\$1/; s/\\\\n/\n/g; s/ RSA / /g" >\
    $TMPFILE || return $?
  ## rsa-encrypt $SECRET and print it
  printf "$SECRET" |\
    openssl rsautl -encrypt -pubin -inkey $TMPFILE |\
    base64 |\
    tr -d "\n" || return $?
}

shMain() {
  ## this function is the main program and parses argv
  ## return if argv is empty
  if [ "$#" = 0 ]
  then
    return
  fi
  ## init node $MAIN_JS
  MAIN_JS=jslint-lite.js
  ## save current dir to $CWD
  CWD=$(pwd)
  ## init $GITHUB_REPO
  export GITHUB_REPO=$(git config --file .git-config --get remote.origin.url |\
    perl -ne "print \$1 if /([^:]+)\.git$/")
  ## init $PATH with $CWD/node_modules
  export PATH=$CWD/node_modules/.bin:$PATH
  ## init $TMPFILE
  TMPFILE=/tmp/tmpfile.$(openssl rand -hex 8)
  ## init $EXIT_CODE
  EXIT_CODE=0
  ## eval argv
  "$@"
  ## save $EXIT_CODE
  EXIT_CODE=$?
  ## restore $CWD
  cd $CWD
  ## cleanup $TMPFILE
  rm -f $TMPFILE
  ## return $EXIT_CODE
  return $EXIT_CODE
}
## int main routine
shMain "$@"
