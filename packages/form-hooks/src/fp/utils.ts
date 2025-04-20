const usynligeCharsRegex = /[\p{Cf}\p{Zs}]/gu;

export const replaceInvisibleCharsWithSpace = (inputString: string): string | null => {
    if (inputString === '') {
        return null;
    }

    return inputString.replace(usynligeCharsRegex, '\u0020');
};
