import { dateFormatter, ISODate } from '@sif/utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface EndretSluttdatoOppsummeringProps {
    sluttdato: ISODate;
}

export const MeldtUtOppsummering = ({ sluttdato }: EndretSluttdatoOppsummeringProps) => {
    return (
        <UngUiText
            id="@ungInnsyn.meldtUt.oppsummering"
            values={{
                ny: dateFormatter.full(sluttdato),
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};
