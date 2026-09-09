import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { AppText, useAppIntl } from '../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { ReadMore, VStack } from '@navikt/ds-react';

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

interface Props {
    harJobbetINorge?: boolean;
}

export const HarJobbetUtenforNorgeSporsmal = ({ harJobbetINorge }: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('medlemskapForm');
    return harJobbetINorge ? (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetUtenforNorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetINorgeOgUtenforNorge')}
            description={
                <VStack gap="space-8">
                    <AppText id="medlemskapSteg.spørsmål.harJobbetINorgeOgUtenforNorge.info" />
                    <ReadMore header={text('medlemskapSteg.readMore.ytelserIUtlandet.tittel')}>
                        {text('medlemskapSteg.readMore.ytelserIUtlandet.tekst')}
                    </ReadMore>
                </VStack>
            }
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    ) : (
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetUtenforNorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetUtenforNorge')}
            description={
                <VStack gap="space-8">
                    <AppText id="medlemskapSteg.spørsmål.harJobbetINorgeOgUtenforNorge.info" />
                    <ReadMore header={text('medlemskapSteg.readMore.ytelserIUtlandet.tittel')}>
                        {text('medlemskapSteg.readMore.ytelserIUtlandet.tekst')}
                    </ReadMore>
                </VStack>
            }
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    );
};
