import { dateFormatter, ISODate } from '@sif/utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface EndretSluttdatoOppsummeringProps {
    forrigeSluttdato: ISODate;
    nySluttdato: ISODate;
}

export const EndretSluttdatoOppsummering = ({ forrigeSluttdato, nySluttdato }: EndretSluttdatoOppsummeringProps) => {
    return (
        <UngUiText
            id="@ungInnsyn.endretSluttdato.oppsummering.endret"
            values={{
                forrige: dateFormatter.full(forrigeSluttdato),
                ny: dateFormatter.full(nySluttdato),
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};
