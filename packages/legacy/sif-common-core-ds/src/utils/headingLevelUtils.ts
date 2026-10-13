export type HeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

export const getChildHeadingLevel = (headingLevel: HeadingLevel): HeadingLevel => {
    switch (headingLevel) {
        case '1':
            return '2';
        case '2':
            return '3';
        case '3':
            return '4';
        case '4':
            return '5';
        case '5':
            return '6';
        case '6':
            return '6';
    }
};
