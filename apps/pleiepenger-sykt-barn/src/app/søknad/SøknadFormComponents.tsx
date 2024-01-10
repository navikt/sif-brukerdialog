import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { SøknadFormField, SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';

const SøknadFormComponents = getTypedFormComponents<SøknadFormField, SøknadFormValues, ValidationError>();

export default SøknadFormComponents;
