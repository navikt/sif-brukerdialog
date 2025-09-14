import { VelgBarn_AnnetBarnValue } from '@navikt/sif-common-forms-ds';
import { hasValue } from '@navikt/sif-validation';

import { SoknadFormData, SoknadFormField } from '../types/SoknadFormData';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: SoknadFormData): boolean =>
    harForståttRettigheterOgPlikter === true;

export const beskrivelseStepIsValid = (values: SoknadFormData) =>
    hasValue(values.beskrivelse) && welcomingPageIsValid(values);

export const dokumentTypeStepIsValid = (values: SoknadFormData) => {
    const { registrertBarnAktørId, barnetsFødselsnummer } = values;
    let isValid = false;

    const gjelderEtAnnetBarn = values[SoknadFormField.registrertBarnAktørId] === VelgBarn_AnnetBarnValue;

    if (gjelderEtAnnetBarn) {
        isValid = hasValue(barnetsFødselsnummer);
    } else {
        isValid = hasValue(registrertBarnAktørId);
    }

    return isValid && welcomingPageIsValid(values);
};

export const documentsStepIsValid = ({ dokumenter }: SoknadFormData) => dokumenter.length > 0;
