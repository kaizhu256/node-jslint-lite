#!/bin/sh
shBuild() {
  ## this function builds the package on travis-ci.org
  npm test
}

shNpmTest() {
  ## this function runs npm test
  ## install istanbul
  if [ ! "$(which istanbul)" ]
  then
    npm install istanbul || return $?
  fi
  ## jslint jslint-lite.js
  node jslint-lite.js jslint-lite.js || return $?
  ## test jslint-lite.js
  node jslint-lite.js --mode-test || return $?
}

shMain() {
  ## this function is the main program and parses argv
  ## return if argv is empty
  if [ "$#" = 0 ]
  then
    return
  fi
  ## save current dir to $CWD
  CWD=$(pwd)
  ## init $GITHUB_REPO
  export GITHUB_REPO=$(git config --get remote.origin.url\
    | perl -ne "print \$1 if /([^:]+)\.git$/")
  ## init $PATH
  export PATH=$CWD/node_modules/.bin:$PATH
  ## init $EXIT_CODE
  EXIT_CODE=0
  ## eval argv
  "$@"
  ## save $EXIT_CODE
  EXIT_CODE=$?
  ## restore $CWD
  cd $CWD
  ## return $EXIT_CODE
  return $EXIT_CODE
}
## init utility2
shMain "$@"
