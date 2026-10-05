import { AppText, useAppIntl } from '@app/i18n';
import { BodyLong, ReadMore, VStack } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';

import { MedlemskapFormFields, MedlemskapFormValues } from '../types';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

interface Props {
    harJobbetINorge?: boolean;
}
export const HarJobbetUtenforNorgeSporsmal = ({ harJobbetINorge }: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetUtenforNorge}
            legend={
                harJobbetINorge
                    ? text('medlemskapSteg.spørsmål.jobbetINorge.harJobbetUtenforNorge')
                    : text('medlemskapSteg.spørsmål.harJobbetUtenforNorge')
            }
            description={
                <VStack gap="space-12">
                    <BodyLong>
                        <AppText id="medlemskapSteg.spørsmål.harJobbetUtenforNorge.readmore.text" />
                    </BodyLong>
                    <ReadMore header={text('medlemskapSteg.readMore.ytelserIUtlandet.tittel')}>
                        <BodyLong>
                            <AppText id="medlemskapSteg.readMore.ytelserIUtlandet.tekst" />
                        </BodyLong>
                    </ReadMore>
                </VStack>
            }
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    );
};
