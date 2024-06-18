import { DokumentType } from '../types/DokumentType';
import { SoknadFormData } from '../types/SoknadFormData';
import { hasValue } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: SoknadFormData): boolean =>
    harForståttRettigheterOgPlikter === true;

export const beskrivelseStepIsValid = (values: SoknadFormData) =>
    hasValue(values.beskrivelse) && welcomingPageIsValid(values);

export const dokumentTypeStepIsValid = (values: SoknadFormData) => {
    const { dokumentType, registrertBarnAktørId, barnetsFødselsnummer, legeerklæringGjelderEtAnnetBarn } = values;
    let isValid = false;

    if (dokumentType === DokumentType.annet) {
        isValid = true;
    } else if (legeerklæringGjelderEtAnnetBarn) {
        isValid = hasValue(barnetsFødselsnummer);
    } else {
        isValid = hasValue(registrertBarnAktørId);
    }

    return isValid && welcomingPageIsValid(values);
};

export const documentsStepIsValid = ({ dokumenter }: SoknadFormData) => dokumenter.length > 0;
