import { SoknadFormData } from '../types/SoknadFormData';
import { hasValue } from '@navikt/sif-validation';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: SoknadFormData): boolean =>
    harForståttRettigheterOgPlikter === true;

export const beskrivelseStepIsValid = (values: SoknadFormData) =>
    hasValue(values.beskrivelse) && welcomingPageIsValid(values);

export const dokumentTypeStepIsValid = (values: SoknadFormData) => {
    const { registrertBarnAktørId, barnetsFødselsnummer, gjelderEtAnnetBarn } = values;
    let isValid = false;

    if (gjelderEtAnnetBarn) {
        isValid = hasValue(barnetsFødselsnummer);
    } else {
        isValid = hasValue(registrertBarnAktørId);
    }

    return isValid && welcomingPageIsValid(values);
};

export const documentsStepIsValid = ({ dokumenter }: SoknadFormData) => dokumenter.length > 0;
