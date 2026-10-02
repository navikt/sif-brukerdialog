import { AppText, useAppIntl } from '@app/i18n';
import { BodyLong, ReadMore, VStack } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';

import { MedlemskapFormFields, MedlemskapFormValues } from '../types';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

export const HarJobbetINorgeSporsmal = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetINorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetINorge')}
            description={
                <VStack gap="space-12">
                    <BodyLong>
                        <AppText id="medlemskapSteg.spørsmål.harJobbetINorge.text.1" />
                    </BodyLong>
                    <ReadMore header={text('medlemskapSteg.spørsmål.ytelserINorge.header')}>
                        <BodyLong>
                            <AppText id="medlemskapSteg.spørsmål.ytelserINorge.text" />
                        </BodyLong>
                    </ReadMore>
                </VStack>
            }
            validate={validateField(MedlemskapFormFields.harJobbetINorge, getYesOrNoValidator())}
        />
    );
};
