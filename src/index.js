module.exports = function check(str, bracketsConfig) {
    let countersForClones = [];
    let result = [];

    for (let i = 0; i < str.length; i++) {
        let currentChar = str.charAt(i);
        let coordinateOfFoundBrack = getCoordinateOfFoundBrack(bracketsConfig, currentChar, countersForClones);

        let oppositeBrack = coordinateOfFoundBrack[0];
        let isOpenning = coordinateOfFoundBrack[1];
        if (isOpenning) {
            result.push(currentChar);

        } else {
            let poppedOpenning = result.pop();
            if (poppedOpenning != oppositeBrack){
                return false;
            }
        }
    }

    for (let i = 0; i < result.length; i++) {
        if (result[i].length != 0){
            return false;
        }
    }

    return true;
};

function getCoordinateOfFoundBrack(bracketsConfig, char, countersForClones) {
    for (let i = 0; i < bracketsConfig.length; i++) {
        let subArray = bracketsConfig[i];
        if (subArray[0] == char) {
            //case when brackets in config are identical
            if (subArray[0] == subArray[1]){
                if (countersForClones[i] == undefined){
                    countersForClones[i] = 2;
                }
                return [subArray[0], (countersForClones[i]++)%2 == 0]
            }
            return [subArray[1], true];
        }
        else if (subArray[1] == char) {
            return [subArray[0], false];
        }
    }
}