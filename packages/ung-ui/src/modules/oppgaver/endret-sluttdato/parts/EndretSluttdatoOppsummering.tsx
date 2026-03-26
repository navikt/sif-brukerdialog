import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { UngUiText } from '@ui/i18n';

interface EndretSluttdatoOppsummeringProps {
    forrigeSluttdato: Date;
    nySluttdato: Date;
}

const EndretSluttdatoOppsummering = ({ forrigeSluttdato, nySluttdato }: EndretSluttdatoOppsummeringProps) => {
    return (
        <UngUiText
            id="endretSluttdato.oppsummering.endret"
            values={{
                forrige: dateFormatter.full(forrigeSluttdato),
                ny: dateFormatter.full(nySluttdato),
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};

export default EndretSluttdatoOppsummering;
