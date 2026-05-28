import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface OpphorVedMaksdatoOppsummeringProps {
    sisteDag: Date;
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
