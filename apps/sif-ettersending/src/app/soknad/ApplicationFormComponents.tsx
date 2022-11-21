import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { SoknadFormData, SoknadFormField } from '../types/SoknadFormData';

/**
 * Lager typed skjema komponenter med formik
 * @navikt/sif-common-formik-ds
 */
const ApplicationFormComponents = getTypedFormComponents<SoknadFormField, SoknadFormData, ValidationError>();

export default ApplicationFormComponents;
