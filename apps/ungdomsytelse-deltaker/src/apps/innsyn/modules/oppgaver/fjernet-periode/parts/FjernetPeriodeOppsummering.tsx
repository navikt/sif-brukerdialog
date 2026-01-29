import { AppText } from '@shared/i18n';
import { ReactNode } from 'react';

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
