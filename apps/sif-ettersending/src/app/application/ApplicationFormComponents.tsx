import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { ApplicationFormData, ApplicationFormField } from '../types/ApplicationFormData';

/**
 * Lager typed skjema komponenter med formik
 * @navikt/sif-common-formik-ds
 */
const ApplicationFormComponents = getTypedFormComponents<ApplicationFormField, ApplicationFormData, ValidationError>();

export default ApplicationFormComponents;
