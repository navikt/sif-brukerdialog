import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange, getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds/lib';
import { durationUtils, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { RegistrerteBarn } from '../../types';
import { ArbeidsforholdFormValues } from '../../types/ArbeidsforholdFormValues';
import { AnsattNormalarbeidstidSnitt, SøknadsimportEndring } from '../../types/ImportertSøknad';
import { InnsendtSøknadInnhold } from '../../types/InnsendtSøknad';
import { initialValues, SøknadFormValues } from '../../types/SøknadFormValues';
import { extractArbeidFormValues } from './extractArbeidFormValues';
import { extractMedlemsskapFormValues } from './extractMedlemsskapFormValues';
import { extractNattevåkOgBeredskapFormValues } from './extractNattevåkOgBeredskapFormValues';
import { extractOmsorgstilbudFormValues } from './extractOmsorgtilbudFormValues';
import { extractTidsromFormValues } from './extractTidsromFormValues';
import { getRegistrertBarnISøknad } from './getRegistrertBarnISøknad';

const extractAnsattNormalarbeidstidSnitt = (
    ansattArbeidsforhold: ArbeidsforholdFormValues[] = []
): AnsattNormalarbeidstidSnitt[] => {
    const returnValues: AnsattNormalarbeidstidSnitt[] = [];
    ansattArbeidsforhold.forEach((forhold) => {
        if (forhold.erAnsatt === YesOrNo.YES && forhold.normalarbeidstid?.timerPerUke) {
            const timer = getNumberFromNumberInputValue(forhold.normalarbeidstid.timerPerUke);
            const timerISnitt = timer !== undefined ? durationUtils.decimalDurationToDuration(timer) : undefined;
            if (timerISnitt) {
                returnValues.push({
                    id: forhold.arbeidsgiver.id,
                    timerISnitt,
                });
            }
        }
    });
    return returnValues;
};

export const importerSøknad = (
    søknad: InnsendtSøknadInnhold,
    registrerteBarn: RegistrerteBarn[]
):
    | {
          endringer: SøknadsimportEndring[];
          formValues: SøknadFormValues;
          registrertBarn: RegistrerteBarn;
          søknadsperiode: DateRange;
          ansattNormalarbeidstidSnitt?: AnsattNormalarbeidstidSnitt[];
      }
    | undefined => {
    if (registrerteBarn.length === 0) {
        return undefined;
    }
    try {
        const barnISøknad = getRegistrertBarnISøknad(søknad.barn, registrerteBarn);
        if (!barnISøknad) {
            return undefined;
        }

        const medlemsskap = extractMedlemsskapFormValues(søknad.medlemskap);
        const arbeid = extractArbeidFormValues(søknad);
        const søknadsperiode: DateRange = {
            from: ISODateToDate(søknad.fraOgMed),
            to: ISODateToDate(søknad.tilOgMed),
        };

        const formValues: SøknadFormValues = {
            ...initialValues,
            harForståttRettigheterOgPlikter: true,
            harBekreftetOpplysninger: false,
            barnetSøknadenGjelder: barnISøknad.aktørId,
            ...extractTidsromFormValues(søknad),
            ...arbeid.formValues,
            ...extractOmsorgstilbudFormValues(søknad),
            ...extractNattevåkOgBeredskapFormValues(søknad),
            ...medlemsskap.formValues,
        };

        const ansattNormalarbeidstidSnitt = extractAnsattNormalarbeidstidSnitt(formValues.ansatt_arbeidsforhold);

        return {
            formValues,
            endringer: [...medlemsskap.endringer, ...arbeid.endringer],
            registrertBarn: barnISøknad,
            søknadsperiode,
            ansattNormalarbeidstidSnitt,
        };
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`getFormValuesFromInnsendtSøknad feilet: ${e}`);
        return undefined;
    }
};
