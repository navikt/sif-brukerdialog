import { DateRange } from '@navikt/sif-common-utils/lib';
import { cleanupTidsromStep } from '../søknad/tidsrom-step/cleanupTidsromStep';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/SøknadFormValues';
import { getSøknadsperiodeFromFormData } from './formDataUtils';
import { cleanupArbeidssituasjonStep } from '../søknad/arbeidssituasjon-step/utils/cleanupArbeidssituasjonStep';
import { cleanupArbeidstidStep } from '../søknad/arbeidstid-step/utils/cleanupArbeidstidStep';
import { getSøknadsdataFromFormValues } from './formValuesToSøknadsdata/getSøknadsdataFromFormValues';
import { cleanupOmsorgstilbudStep } from '../søknad/omsorgstilbud-step/omsorgstilbudStepUtils';
import { cleanupNattevåkOgBeredskapStep } from '../søknad/nattevåk-og-beredskap-step/NattevåkOgBeredskapStep';

export const cleanupSøknadStepValues = (
    step: StepID,
    values: SøknadFormValues,
    periode: DateRange
): SøknadFormValues => {
    switch (step) {
        case StepID.TIDSROM:
            return cleanupTidsromStep(values, periode);
        case StepID.ARBEIDSSITUASJON:
            return cleanupArbeidssituasjonStep(values, periode);
        case StepID.ARBEIDSTID:
            const søknadsdata = getSøknadsdataFromFormValues(values);
            return søknadsdata.arbeid ? cleanupArbeidstidStep(values, søknadsdata.arbeid, periode) : values;
        case StepID.OMSORGSTILBUD:
            return cleanupOmsorgstilbudStep(values, periode);
        case StepID.NATTEVÅK_OG_BEREDSKAP:
            return cleanupNattevåkOgBeredskapStep(values);
        default:
            return values;
    }
};

export const cleanupAndSetFormikValues = async (
    step: StepID,
    values: SøknadFormValues,
    setValues: (values: SøknadFormValues) => void
): Promise<SøknadFormValues> => {
    await Promise.resolve();
    const periode = getSøknadsperiodeFromFormData(values);
    if (!periode) {
        return Promise.resolve(values);
    }
    const cleanedValues = cleanupSøknadStepValues(step, values, periode);
    setValues(cleanedValues);
    return Promise.resolve(cleanedValues);
};
