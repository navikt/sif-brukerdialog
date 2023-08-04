import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { SøknadFormField, SøknadFormValues } from '../types/SøknadFormValues';

const SøknadFormComponents = getTypedFormComponents<SøknadFormField, SøknadFormValues, ValidationError>();

export default SøknadFormComponents;
