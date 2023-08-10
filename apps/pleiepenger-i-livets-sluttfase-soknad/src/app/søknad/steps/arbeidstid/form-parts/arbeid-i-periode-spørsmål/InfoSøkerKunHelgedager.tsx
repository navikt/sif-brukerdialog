import React from 'react';
import { FormattedMessage } from 'react-intl';
import AlertStripe from 'nav-frontend-alertstriper';

const InfoSøkerKunHelgedager: React.FunctionComponent = () => (
    <AlertStripe type="advarsel">
        <p>
            <FormattedMessage id="arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.1" />
        </p>
        <p>
            <FormattedMessage id="arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.2" />
        </p>
        <p>
            <FormattedMessage id="arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.3" />
        </p>
    </AlertStripe>
);

export default InfoSøkerKunHelgedager;
