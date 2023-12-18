import { DateRange } from '@navikt/sif-common-utils';
import { cleanupArbeidssituasjonStep } from '../søknad/arbeidssituasjon-step/utils/cleanupArbeidssituasjonStep';
import { cleanupArbeidstidStep } from '../søknad/arbeidstid-step/utils/cleanupArbeidstidStep';
import { cleanupNattevåkOgBeredskapStep } from '../søknad/nattevåk-og-beredskap-step/NattevåkOgBeredskapStep';
import { cleanupOmsorgstilbudStep } from '../søknad/omsorgstilbud-step/omsorgstilbudStepUtils';
import { cleanupTidsromStep } from '../søknad/tidsrom-step/cleanupTidsromStep';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getSøknadsperiodeFromFormValues } from './formValuesUtils';

export const cleanupSøknadStepValues = (
    step: StepID,
    values: SøknadFormValues,
    søknadsperiode: DateRange,
    søknadsdata: Søknadsdata,
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
    setValues: (values: SøknadFormValues) => void,
): Promise<SøknadFormValues> => {
    await Promise.resolve();
    const søknadsperiode = getSøknadsperiodeFromFormValues(values);
    if (!søknadsperiode) {
        return Promise.resolve(values);
    }
    const cleanedValues = cleanupSøknadStepValues(step, values, søknadsperiode, søknadsdata);
    setValues(cleanedValues);
    await Promise.resolve();
    return Promise.resolve(cleanedValues);
};
