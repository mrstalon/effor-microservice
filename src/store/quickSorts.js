const quickAlphabetSort = function quickAlphabetSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const random = Math.round(Math.random(0, array.length));
    const pivot = array[random].letter;

    const arrayOfBigger = array.filter((item) => {
        return item.letter > pivot;
    });

    const arrayOfSmaller = array.filter((item) => {
        return item.letter < pivot;
    });

    const obj = {
        letter: pivot,
    };

    return quickAlphabetSort(arrayOfSmaller).concat(obj).concat(quickAlphabetSort(arrayOfBigger));
};

const quickParallelsSort = function quickParallelSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const random = Math.round(Math.random(0, array.length));
    const pivot = array[random];

    const arrayOfBigger = array.filter((item) => {
        return item.number > pivot.number;
    });

    const arrayOfSmaller = array.filter((item) => {
        return item.number < pivot.number;
    });

    const obj = {
        number: pivot.number,
        classes: pivot.classes,
    };

    return quickParallelsSort(arrayOfSmaller).concat(obj).concat(quickParallelsSort(arrayOfBigger));
};

const functionsToExport = {
    quickAlphabetSort,
    quickParallelsSort,
};

export default functionsToExport;
