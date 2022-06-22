import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';
import { FraværÅrsak } from './types';

export const getFraværÅrsakRadios = (intl: IntlShape): FormikRadioProp[] => [
    {
        label: intlHelper(intl, `fravær.årsak.${FraværÅrsak.stengtSkoleBhg}`),
        value: FraværÅrsak.stengtSkoleBhg,
    },
    {
        label: intlHelper(intl, `fravær.årsak.${FraværÅrsak.smittevernhensyn}`),
        value: FraværÅrsak.smittevernhensyn,
    },
];
