import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { SoknadFormData, SoknadFormField } from '../types/SoknadFormData';

const SoknadFormComponents = getTypedFormComponents<SoknadFormField, SoknadFormData, ValidationError>();

export default SoknadFormComponents;
