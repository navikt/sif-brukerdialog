import { ReactNode } from 'react';

import { AppText } from '../../../../../i18n';

const FjernetPeriodeOppsummering = () => {
    return (
        <AppText
            id="fjernetPeriode.oppsummering"
            values={{
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};

export default FjernetPeriodeOppsummering;
