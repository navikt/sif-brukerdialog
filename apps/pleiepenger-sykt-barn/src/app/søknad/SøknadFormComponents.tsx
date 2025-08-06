import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { SøknadFormField, SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';

const SøknadFormComponents = getTypedFormComponents<SøknadFormField, SøknadFormValues, ValidationError>();

export default SøknadFormComponents;
