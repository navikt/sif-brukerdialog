import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { AppText } from '../../../../../i18n';

interface EndretSluttdatoOppsummeringProps {
    sluttdato: Date;
}

const MeldtUtOppsummering = ({ sluttdato }: EndretSluttdatoOppsummeringProps) => {
    return (
        <AppText
            id="meldtUt.oppsummering"
            values={{
                ny: dateFormatter.full(sluttdato),
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};

export default MeldtUtOppsummering;
