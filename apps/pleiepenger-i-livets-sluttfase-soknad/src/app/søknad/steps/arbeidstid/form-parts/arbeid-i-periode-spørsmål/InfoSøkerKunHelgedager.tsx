import { Alert } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const InfoSøkerKunHelgedager: React.FunctionComponent = () => (
    <Alert variant="warning">
        <p>
            <FormattedMessage id="arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.1" />
        </p>
        <p>
            <FormattedMessage id="arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.2" />
        </p>
        <p>
            <FormattedMessage id="arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.3" />
        </p>
    </Alert>
);

export default InfoSøkerKunHelgedager;
