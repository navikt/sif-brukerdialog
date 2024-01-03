import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import FormikCheckboxGroup from '@navikt/sif-common-formik-ds/src/components/formik-checkbox-group/FormikCheckboxGroup';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { DineBarnFormFields } from '../DineBarnStep';
import { cleanHarUtvidetRettFor, getBarnOptions } from '../dineBarnStepUtils';

interface Props {
    registrerteBarn: RegistrertBarn[];
    andreBarn: AnnetBarn[];
}

const HarUtvidetRettForPart: React.FunctionComponent<Props> = ({ registrerteBarn, andreBarn }) => {
    const intl = useIntl();
    if (registrerteBarn.length === 0 && andreBarn.length === 0) {
        return null;
    }
    return (
        <FormBlock>
            <FormikCheckboxGroup
                legend={intlHelper(intl, 'step.dineBarn.utvidetRettFor.spm')}
                name={DineBarnFormFields.harUtvidetRettFor}
                checkboxes={getBarnOptions(registrerteBarn, andreBarn)}
                validate={(value) =>
                    getListValidator({ required: true })(cleanHarUtvidetRettFor(value, andreBarn, registrerteBarn))
                }
                data-testid="harUtvidetRettFor"
            />
        </FormBlock>
    );
};

export default HarUtvidetRettForPart;
