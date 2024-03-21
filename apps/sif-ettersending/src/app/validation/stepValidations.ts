import { DokumentType } from '../types/DokumentType';
import { SoknadFormData } from '../types/SoknadFormData';
import { hasValue } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: SoknadFormData): boolean =>
    harForståttRettigheterOgPlikter === true;

export const beskrivelseStepIsValid = (values: SoknadFormData) =>
    hasValue(values.beskrivelse) && welcomingPageIsValid(values);

export const beskrivelsePPStepIsValid = (values: SoknadFormData) => {
    const {
        dokumentType,
        barnetLegeerklæringGjelder,
        barnetsFødselsnummer,
        barnetHarIkkeFnr,
        legeerklæringGjelderEtAnnetBarn,
    } = values;
    let isValid = false;

    if (dokumentType === DokumentType.annet) {
        isValid = hasValue(values.beskrivelse);
    } else if (barnetHarIkkeFnr) {
        isValid = true;
    } else if (legeerklæringGjelderEtAnnetBarn) {
        isValid = hasValue(barnetsFødselsnummer);
    } else {
        isValid = hasValue(barnetLegeerklæringGjelder);
    }

    return isValid && welcomingPageIsValid(values);
};

export const documentsStepIsValid = ({ dokumenter }: SoknadFormData) => dokumenter.length > 0;
