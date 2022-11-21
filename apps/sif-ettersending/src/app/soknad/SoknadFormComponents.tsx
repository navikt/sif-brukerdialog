import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { SoknadFormField, SoknadFormData } from '../types/SoknadFormData';

const SoknadFormComponents = getTypedFormComponents<SoknadFormField, SoknadFormData, ValidationError>();

export default SoknadFormComponents;
