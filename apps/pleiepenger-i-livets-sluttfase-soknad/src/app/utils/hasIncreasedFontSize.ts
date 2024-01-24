/** Veldig basic sjekk for å se om bruker har større fontsize enn default */
export const hasIncreasedFontSize = (defaultFontSize = 20): boolean => {
    if (window && window.getComputedStyle) {
        const size = window?.getComputedStyle(window.document.body).fontSize;
        const pixels = size.replace('px', '');
        const numPixels = parseInt(pixels, 10);
        const isIncreased = numPixels > defaultFontSize;
        return isIncreased;
    }
    return false;
};
