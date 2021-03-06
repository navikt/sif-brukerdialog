import { ApplicationFormData } from '../types/ApplicationFormData';
import { hasValue } from '@navikt/sif-common-formik-ds/lib/validation/validationUtils';

export const welcomingPageIsValid = ({ harForst√•ttRettigheterOgPlikter }: ApplicationFormData): boolean =>
    harForst√•ttRettigheterOgPlikter === true;

export const beskrivelseStepIsValid = (values: ApplicationFormData) =>
    hasValue(values.beskrivelse) && welcomingPageIsValid(values);

export const documentsStepIsValid = ({ beskrivelse, dokumenter }: ApplicationFormData) => dokumenter.length > 0;
