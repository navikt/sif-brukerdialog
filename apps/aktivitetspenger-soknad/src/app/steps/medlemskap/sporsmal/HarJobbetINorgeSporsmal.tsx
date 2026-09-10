import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { AppText, useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { BodyLong, ReadMore, VStack } from '@navikt/ds-react';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

interface Props {}

export const HarJobbetINorgeSporsmal = ({}: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetINorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetINorge')}
            description={
                <>
                    <ReadMore header={text('medlemskapSteg.spørsmål.harJobbetINorge.readmore.title')}>
                        <VStack gap="space-12">
                            <BodyLong>
                                <AppText id="medlemskapSteg.spørsmål.harJobbetINorge.readmore.text.1" />
                            </BodyLong>
                            <BodyLong>
                                <AppText id="medlemskapSteg.spørsmål.harJobbetINorge.readmore.text.2" />
                            </BodyLong>
                        </VStack>
                    </ReadMore>
                </>
            }
            validate={validateField(MedlemskapFormFields.harJobbetINorge, getYesOrNoValidator())}
        />
    );
};
