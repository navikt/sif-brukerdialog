import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { useAppIntl } from '@app/i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { ReadMore, VStack } from '@navikt/ds-react';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

// interface Props {
//     harJobbetINorge?: boolean;
// }

export const HarJobbetUtenforNorgeSporsmal = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetUtenforNorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetUtenforNorge')}
            description={
                <VStack gap="space-8">
                    <ReadMore header={text('medlemskapSteg.spørsmål.harJobbetUtenforNorge.readmore.title')}>
                        {text('medlemskapSteg.spørsmål.harJobbetUtenforNorge.readmore.text')}
                    </ReadMore>
                </VStack>
            }
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    );
};
