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
    søknadsperiode: DateRange
): SøknadFormValues => {
    switch (step) {
        case StepID.TIDSROM:
            return cleanupTidsromStep(values, søknadsperiode);
        case StepID.ARBEIDSSITUASJON:
            return cleanupArbeidssituasjonStep(values, søknadsperiode);
        case StepID.ARBEIDSTID:
            const søknadsdata = getSøknadsdataFromFormValues(values);
            return søknadsdata.arbeid ? cleanupArbeidstidStep(values, søknadsdata.arbeid) : values;
        case StepID.OMSORGSTILBUD:
            return cleanupOmsorgstilbudStep(values, søknadsperiode);
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
    const søknadsperiode = getSøknadsperiodeFromFormData(values);
    if (!søknadsperiode) {
        return Promise.resolve(values);
    }
    const cleanedValues = cleanupSøknadStepValues(step, values, søknadsperiode);
    setValues(cleanedValues);
    return Promise.resolve(cleanedValues);
};
