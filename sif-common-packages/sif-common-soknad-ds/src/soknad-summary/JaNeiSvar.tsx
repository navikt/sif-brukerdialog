import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    harSvartJa?: boolean;
}

const JaNeiSvar = ({ harSvartJa }: Props) => {
    return <FormattedMessage id={harSvartJa === true ? 'Ja' : 'Nei'} tagName="span" />;
};

export default JaNeiSvar;
