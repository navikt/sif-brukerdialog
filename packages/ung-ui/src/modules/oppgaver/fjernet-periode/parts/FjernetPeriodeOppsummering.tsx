import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

export const FjernetPeriodeOppsummering = () => {
    return (
        <UngUiText
            id="fjernetPeriode.oppsummering"
            values={{
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};
