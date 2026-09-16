import { ReactNode } from 'react';

import { UngInnsynText } from '../../../../i18n';

export const FjernetPeriodeOppsummering = () => {
    return (
        <UngInnsynText
            id="@ungInnsyn.fjernetPeriode.oppsummering"
            values={{
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};
