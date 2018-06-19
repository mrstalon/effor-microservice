const checkDoWeNeedToMakeRequest = function areArraysEquil(arr1, arr2) {
    const arr1Length = arr1.length;
    const arr1copy = JSON.parse(JSON.stringify(arr1));
    const arr2copy = JSON.parse(JSON.stringify(arr2));

    for (let i = 0; i < arr1Length; i += 1) {
        const isElementInsideSecondArray = arr2copy.find((item) => {
            return arr1copy[0].letter === item.letter;
        });

        if (isElementInsideSecondArray === undefined) {
            return false;
        }

        const elementFromSecondArrayId = arr2copy.findIndex((item) => {
            return item.letter === arr1copy[0].letter;
        });

        arr1copy.splice(0, 1);
        arr2copy.splice(elementFromSecondArrayId, 1);
    }
    return true;
};

export default checkDoWeNeedToMakeRequest;
