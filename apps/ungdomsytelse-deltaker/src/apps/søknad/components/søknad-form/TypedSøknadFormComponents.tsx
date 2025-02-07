import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { SøknadFormFields, SøknadFormValues } from './SøknadForm';

export const søknadFormComponents = getTypedFormComponents<SøknadFormFields, SøknadFormValues, ValidationError>();
