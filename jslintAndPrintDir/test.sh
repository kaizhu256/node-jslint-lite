# jslint utility2:true

# test embed-js-in-sh handling-behavior
node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    return;
}());
'

# test err-shFunction handling-behavior
shBb () {
}
shAa () {
}
shCc(){
}

# test err-validate-line-sorted-case-esac-statement handling-behavior
    case 1 in
    2)
        case 1 in
        2)
            ;;
        1)
            ;;
        esac
        ;;
    1)
        ;;
    esac
