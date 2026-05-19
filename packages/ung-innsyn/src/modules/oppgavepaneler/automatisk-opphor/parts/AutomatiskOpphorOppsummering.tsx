import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface AutomatiskOpphorOppsummeringProps {
    sisteDag: Date;
}

export const AutomatiskOpphorOppsummering = ({ sisteDag }: AutomatiskOpphorOppsummeringProps) => {
    return (
        <UngUiText
            id="@ungInnsyn.automatiskOpphor.oppsummering.sisteDag"
            values={{
                sisteDag: dateFormatter.full(sisteDag),
                strong: (content: ReactNode) => <strong>{content}</strong>,
            }}
        />
    );
};
