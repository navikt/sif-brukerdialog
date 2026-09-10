import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { MedlemskapFormFields, MedlemskapFormValues } from '../types';
import { useAppIntl } from '../../../i18n';
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
        // Har jobbet også i Norge
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetUtenforNorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetINorgeOgUtenforNorge')}
            description={
                <VStack gap="space-8">
                    <ReadMore header="Mer informasjon om jobb i utlandet">
                        Jobb i utlandet er hvis du har perioder med inntektsgivende arbeid utenfor Norge, eller har
                        mottatt ytelser fra utenlandske myndigheter.
                        {/* Hvis du har mottatt ytelser (for eksempel dagpenger, sykepenger og foreldrepenger) fra utenlandske myndigheter, regnes dette som jobb utenfor Norge. */}
                        {/* {text('medlemskapSteg.readMore.ytelserIUtlandet.tekst')} */}
                    </ReadMore>
                    {/* <AppText id="medlemskapSteg.spørsmål.harJobbetINorgeOgUtenforNorge.info" />
                    <ReadMore header={text('medlemskapSteg.readMore.ytelserIUtlandet.tittel')}>
                        {text('medlemskapSteg.readMore.ytelserIUtlandet.tekst')}
                    </ReadMore> */}
                    <hr />
                    AAP: Hvis du har jobbet i et annet land, kan du i noen tilfeller få mer utbetalt i AAP. Nav bruker
                    bare denne inntekten hvis det er til fordel for deg.
                    <ReadMore header="AAP: Regnes ytelser fra utenlandske myndigheter som jobb i et annet land?">
                        Hvis du har mottatt ytelser (for eksempel dagpenger, sykepenger og foreldrepenger) fra
                        utenlandske myndigheter, regnes dette som jobb utenfor Norge. Pensjon regnes ikke som erstatning
                        for jobb.
                    </ReadMore>
                </VStack>
            }
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    ) : (
        // Har ikke jobbet i Norge
        <YesOrNoQuestion
            name={MedlemskapFormFields.harJobbetUtenforNorge}
            legend={text('medlemskapSteg.spørsmål.harJobbetUtenforNorge')}
            description={
                <VStack gap="space-8">
                    <ReadMore header="Mer informasjon om jobb i utlandet?">
                        Jobb i utlandet er hvis du har perioder med inntektsgivende arbeid utenfor Norge, eller har
                        mottatt ytelser fra utenlandske myndigheter.
                        {/* {text('medlemskapSteg.readMore.ytelserIUtlandet.tekst')} */}
                    </ReadMore>
                    <ReadMore header="AAP: Regnes ytelser fra norske myndigheter som jobb?">
                        Med “jobb” menes også offentlige ytelser du har fått som erstatning for arbeid, for eksempel
                        dagpenger, sykepenger og foreldrepenger. Pensjon regnes ikke som erstatning for jobb.
                    </ReadMore>

                    {/* <AppText id="medlemskapSteg.spørsmål.harJobbetINorgeOgUtenforNorge.info" />
                    <ReadMore header={text('medlemskapSteg.readMore.ytelserIUtlandet.tittel')}>
                        {text('medlemskapSteg.readMore.ytelserIUtlandet.tekst')}
                    </ReadMore> */}
                </VStack>
            }
            validate={validateField(MedlemskapFormFields.harJobbetUtenforNorge, getYesOrNoValidator())}
        />
    );
};
