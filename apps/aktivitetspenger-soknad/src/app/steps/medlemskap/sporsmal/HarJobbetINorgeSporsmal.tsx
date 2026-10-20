import { AppText, useAppIntl } from '@app/i18n';
import { BodyLong, ReadMore, VStack } from '@navikt/ds-react';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { getYesOrNoValidator } from '@sif/validation';

import { MedlemskapFormValues } from '../types';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

export const HarJobbetINorgeSporsmal = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name="harJobbetINorge"
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
            validate={validateField('harJobbetINorge', getYesOrNoValidator())}
        />
    );
};
