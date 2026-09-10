import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { AppText, useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { ReadMore } from '@navikt/ds-react';

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
