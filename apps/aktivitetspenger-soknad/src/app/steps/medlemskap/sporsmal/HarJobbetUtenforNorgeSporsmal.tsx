import { AppText, useAppIntl } from '@app/i18n';
import { BodyLong } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';

import { MedlemskapFormFields, MedlemskapFormValues } from '../types';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

export const HarJobbetUtenforNorgeSporsmal = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetUtenforNorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetUtenforNorge')}
            description={
                <BodyLong>
                    <AppText id="medlemskapSteg.spørsmål.harJobbetUtenforNorge.readmore.text" />
                </BodyLong>
            }
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    );
};
