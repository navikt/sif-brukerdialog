import { dateFormatter, ISODate } from '@sif/utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface OpphorVedMaksdatoOppsummeringProps {
    sisteDag: ISODate;
}

export const OpphorVedMaksdatoOppsummering = ({ sisteDag }: OpphorVedMaksdatoOppsummeringProps) => {
    return (
        <UngUiText
            id="@ungInnsyn.opphorVedMaksdato.oppsummering.sisteDag"
            values={{
                sisteDag: dateFormatter.full(sisteDag),
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};
