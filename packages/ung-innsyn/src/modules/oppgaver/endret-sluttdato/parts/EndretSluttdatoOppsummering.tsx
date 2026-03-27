import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface EndretSluttdatoOppsummeringProps {
    forrigeSluttdato: Date;
    nySluttdato: Date;
}

export const EndretSluttdatoOppsummering = ({ forrigeSluttdato, nySluttdato }: EndretSluttdatoOppsummeringProps) => {
    return (
        <UngUiText
            id="@ungUi.endretSluttdato.oppsummering.endret"
            values={{
                forrige: dateFormatter.full(forrigeSluttdato),
                ny: dateFormatter.full(nySluttdato),
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};
