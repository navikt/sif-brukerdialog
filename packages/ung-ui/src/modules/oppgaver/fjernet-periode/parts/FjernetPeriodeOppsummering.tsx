import { ReactNode } from 'react';

import { UngUiText } from '@ui/i18n';

const FjernetPeriodeOppsummering = () => {
    return (
        <UngUiText
            id="fjernetPeriode.oppsummering"
            values={{
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};

export default FjernetPeriodeOppsummering;
