import { DateRange } from '@navikt/sif-common-utils/lib';
import { cleanupArbeidssituasjonStep } from '../søknad/arbeidssituasjon-step/utils/cleanupArbeidssituasjonStep';
import { cleanupArbeidstidStep } from '../søknad/arbeidstid-step/utils/cleanupArbeidstidStep';
import { cleanupNattevåkOgBeredskapStep } from '../søknad/nattevåk-og-beredskap-step/NattevåkOgBeredskapStep';
import { cleanupOmsorgstilbudStep } from '../søknad/omsorgstilbud-step/omsorgstilbudStepUtils';
import { cleanupTidsromStep } from '../søknad/tidsrom-step/cleanupTidsromStep';
import { StepID } from '../types/_StepID';
import { SøknadFormValues } from '../types/_SøknadFormValues';
import { Søknadsdata } from '../types/søknadsdata/_Søknadsdata';
import { getSøknadsperiodeFromFormData } from './formDataUtils';

export const cleanupSøknadStepValues = (
    step: StepID,
    values: SøknadFormValues,
    søknadsperiode: DateRange,
    søknadsdata: Søknadsdata
): SøknadFormValues => {
    switch (step) {
        case StepID.TIDSROM:
            return cleanupTidsromStep(values, søknadsperiode);
        case StepID.ARBEIDSSITUASJON:
            return cleanupArbeidssituasjonStep(values, søknadsperiode);
        case StepID.ARBEIDSTID:
            return søknadsdata.arbeidstidIPerioden
                ? cleanupArbeidstidStep(values, søknadsdata.arbeidssituasjon)
                : values;
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
    søknadsdata: Søknadsdata,
    setValues: (values: SøknadFormValues) => void
): Promise<SøknadFormValues> => {
    await Promise.resolve();
    const søknadsperiode = getSøknadsperiodeFromFormData(values);
    if (!søknadsperiode) {
        return Promise.resolve(values);
    }
    const cleanedValues = cleanupSøknadStepValues(step, values, søknadsperiode, søknadsdata);
    setValues(cleanedValues);
    await Promise.resolve();
    return Promise.resolve(cleanedValues);
};
