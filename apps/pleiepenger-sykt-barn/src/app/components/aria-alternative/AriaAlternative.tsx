import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import React from 'react';

export interface AriaAlternativeTextProps {
    ariaText?: React.ReactNode;
    visibleText: React.ReactNode;
}

const AriaAlternative = ({ ariaText, visibleText }: AriaAlternativeTextProps) => {
    if (!ariaText) {
        return <>{visibleText}</>;
    }
    return (
        <>
            <AriaText>{ariaText}</AriaText>
            <span aria-hidden={true} role="presentation">
                {visibleText}
            </span>
        </>
    );
};

export default AriaAlternative;
