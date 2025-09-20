import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';
import { ReactNode } from 'react';

interface EndretSluttdatoOppsummeringProps {
    dato: Date;
}

const MeldtUtOppsummering = ({ dato }: EndretSluttdatoOppsummeringProps) => {
    const nySluttdatoFormatted = dateFormatter.compact(dato);

    return (
        <AppText
            id="endretSluttdato.oppsummering.meldtUt"
            values={{
                ny: nySluttdatoFormatted,
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};

export default MeldtUtOppsummering;
