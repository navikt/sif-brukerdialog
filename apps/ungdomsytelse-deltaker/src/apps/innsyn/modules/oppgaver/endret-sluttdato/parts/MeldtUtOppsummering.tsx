import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';
import { ReactNode } from 'react';

interface EndretSluttdatoOppsummeringProps {
    sluttdato: Date;
}

const MeldtUtOppsummering = ({ sluttdato }: EndretSluttdatoOppsummeringProps) => {
    return (
        <AppText
            id="endretSluttdato.oppsummering.meldtUt"
            values={{
                ny: dateFormatter.full(sluttdato),
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};

export default MeldtUtOppsummering;
