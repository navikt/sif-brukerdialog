import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';
import { ReactNode } from 'react';

interface EndretSluttdatoOppsummeringProps {
    forrigeSluttdato: Date;
    nySluttdato: Date;
}

const EndretSluttdatoOppsummering = ({ forrigeSluttdato, nySluttdato }: EndretSluttdatoOppsummeringProps) => {
    const nySluttdatoFormatted = dateFormatter.compact(nySluttdato);

    return (
        <AppText
            id="endretSluttdato.oppsummering.endret"
            values={{
                forrige: dateFormatter.compact(forrigeSluttdato),
                ny: nySluttdatoFormatted,
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};

export default EndretSluttdatoOppsummering;
