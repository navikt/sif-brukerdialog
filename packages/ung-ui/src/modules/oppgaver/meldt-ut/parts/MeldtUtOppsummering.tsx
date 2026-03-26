import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface EndretSluttdatoOppsummeringProps {
    sluttdato: Date;
}

export const MeldtUtOppsummering = ({ sluttdato }: EndretSluttdatoOppsummeringProps) => {
    return (
        <UngUiText
            id="meldtUt.oppsummering"
            values={{
                ny: dateFormatter.full(sluttdato),
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};
