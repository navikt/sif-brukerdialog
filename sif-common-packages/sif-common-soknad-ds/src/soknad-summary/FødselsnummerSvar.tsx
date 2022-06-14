import React from 'react';
import SpacedCharString from '@navikt/sif-common-core/lib/components/spaced-char-string/SpacedCharString';

interface Props {
    fødselsnummer: string;
}

const FødselsnummerSvar = ({ fødselsnummer }: Props) => <SpacedCharString str={fødselsnummer} />;

export default FødselsnummerSvar;
