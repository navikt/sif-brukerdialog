import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { AppText } from '../../../../../i18n';

interface EndretSluttdatoOppsummeringProps {
    forrigeSluttdato: Date;
    nySluttdato: Date;
}

const EndretSluttdatoOppsummering = ({ forrigeSluttdato, nySluttdato }: EndretSluttdatoOppsummeringProps) => {
    return (
        <AppText
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
