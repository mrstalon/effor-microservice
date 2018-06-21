const findLetterPosition = function findLetterPosition(alphabet, letter) {
    const letterId = alphabet.findIndex((letterObj) => {
        return letter === letterObj.letter;
    });

    return alphabet[letterId].letterPosition;
};

export default findLetterPosition;
