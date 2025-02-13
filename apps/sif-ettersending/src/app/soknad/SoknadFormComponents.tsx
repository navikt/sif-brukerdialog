import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { SoknadFormField, SoknadFormData } from '../types/SoknadFormData';

const SoknadFormComponents = getTypedFormComponents<SoknadFormField, SoknadFormData, ValidationError>();

export default SoknadFormComponents;
