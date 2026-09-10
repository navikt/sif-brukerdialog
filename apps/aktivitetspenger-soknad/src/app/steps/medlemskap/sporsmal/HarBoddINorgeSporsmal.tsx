import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { AppText, useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { ReadMore } from '@navikt/ds-react';
import { Todo } from '@sif/soknad-ui';

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
                        <Todo>
                            AAp: Dette betyr at du har oppholdt deg i Norge mesteparten av hvert av disse årene.
                        </Todo>
                    </ReadMore>
                </>
            }
        />
    );
};
