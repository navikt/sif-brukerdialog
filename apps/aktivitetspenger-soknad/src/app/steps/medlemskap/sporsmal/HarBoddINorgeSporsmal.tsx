import { AppText, useAppIntl } from '@app/i18n';
import { ReadMore } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';

import { MedlemskapFormFields, MedlemskapFormValues } from '../types';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

interface Props {}

export const HarBoddINorgeSporsmal = ({}: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harBoddINorge}
            legend={text('medlemskapSteg.spørsmål.harBoddINorge')}
            validate={validateField(MedlemskapFormFields.harBoddINorge, getYesOrNoValidator())}
            description={
                <>
                    <ReadMore header={text('medlemskapSteg.spørsmål.harBoddINorge.readMore.tittel')}>
                        <AppText id="medlemskapSteg.spørsmål.harBoddINorge.readMore.tekst" />
                    </ReadMore>
                </>
            }
        />
    );
};
