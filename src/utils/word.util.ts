export const getCorrectWord = (count: number): string => {
    if (count === 1) {
        return "елемент";
    } else if (count > 1 && count < 5) {
        return "елементи";
    } else {
        return "елементів";
    }
};
