import React from 'react';
import AriaAlternative from '../aria/AriaAlternative';

export const stringToSpacedCharString = (str: string) => {
    return (str || '').split('').join(' ');
};

interface Props {
    str: string;
}

const SpacedCharString = ({ str }: Props) => (
    <AriaAlternative ariaText={stringToSpacedCharString(str)} visibleText={str} />
);

export default SpacedCharString;
