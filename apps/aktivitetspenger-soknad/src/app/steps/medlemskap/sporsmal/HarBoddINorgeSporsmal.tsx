import { AppText, useAppIntl } from '@app/i18n';
import { BodyLong } from '@navikt/ds-react';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { getYesOrNoValidator } from '@sif/validation';

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
