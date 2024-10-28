import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { OmBarnetFormFields, OmBarnetFormValues } from '../types';

export const OmBarnetFormComponents = getTypedFormComponents<OmBarnetFormFields, OmBarnetFormValues, ValidationError>();
