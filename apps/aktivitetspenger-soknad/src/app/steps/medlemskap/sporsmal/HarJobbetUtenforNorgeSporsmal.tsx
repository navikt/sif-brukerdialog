import { AppText, useAppIntl } from '@app/i18n';
import { BodyLong, ReadMore, VStack } from '@navikt/ds-react';
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
                <VStack gap="space-12">
                    <BodyLong>
                        <AppText id="medlemskapSteg.spørsmål.harJobbetUtenforNorge.readmore.text" />
                    </BodyLong>
                    <ReadMore header={text('medlemskapSteg.spørsmål.ytelserSomJobb.readmore.header')}>
                        <BodyLong>
                            <AppText id="medlemskapSteg.spørsmål.ytelserSomJobb.readmore.text.2" />
                        </BodyLong>
                    </ReadMore>
                </VStack>
            }
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    );
};
