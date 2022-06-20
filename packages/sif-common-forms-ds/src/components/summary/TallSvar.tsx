import React from 'react';
import { FormattedNumber } from 'react-intl';

interface Props {
    verdi?: number;
}

const TallSvar: React.FunctionComponent<Props> = ({ verdi }) =>
    verdi !== undefined ? <FormattedNumber value={verdi} /> : null;

export default TallSvar;
