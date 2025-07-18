import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { OmBarnetFormFields, OmBarnetFormValues } from './OmBarnetStep';

export const omBarnetFormComponents = getTypedFormComponents<OmBarnetFormFields, OmBarnetFormValues, ValidationError>();
