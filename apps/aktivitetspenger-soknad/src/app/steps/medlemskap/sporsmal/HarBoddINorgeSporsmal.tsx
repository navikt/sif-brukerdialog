import { AppText, useAppIntl } from '@app/i18n';
import { BodyLong } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';

import { MedlemskapFormValues } from '../types';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

export const HarBoddINorgeSporsmal = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name="harBoddINorge"
            legend={text('medlemskapSteg.spørsmål.harBoddINorge')}
            validate={validateField('harBoddINorge', getYesOrNoValidator())}
            description={
                <BodyLong>
                    <AppText id="medlemskapSteg.spørsmål.harBoddINorge.readMore.tekst" />
                </BodyLong>
            }
        />
    );
};
