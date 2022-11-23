import { SoknadFormData } from '../types/SoknadFormData';
import { ApplicationType } from '../types/ApplicationType';
import { beskrivelseStepIsValid, documentsStepIsValid, welcomingPageIsValid } from '../validation/stepValidations';

export const beskrivelseStepIsAvailable = (formData: SoknadFormData) => welcomingPageIsValid(formData);

export const omsTypeStepIsAvailable = (formData: SoknadFormData) => welcomingPageIsValid(formData);

export const documentsStepIsAvailable = (formData: SoknadFormData, søknadstype: ApplicationType) =>
    søknadstype === ApplicationType.pleiepengerBarn || søknadstype === ApplicationType.pleiepengerLivetsSluttfase
        ? beskrivelseStepIsValid(formData)
        : welcomingPageIsValid(formData);

export const summaryStepAvailable = (formData: SoknadFormData) => documentsStepIsValid(formData);
