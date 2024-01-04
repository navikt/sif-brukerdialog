import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { DineBarnFormFields } from '../DineBarnStep';

interface Props {}

const HarAleneomsorgSpørsmål: React.FunctionComponent<Props> = () => {
    const intl = useIntl();
    return (
        <FormBlock>
            <FormikYesOrNoQuestion
                name={DineBarnFormFields.harAleneomsorg}
                legend={intlHelper(intl, 'step.dineBarn.utvidetRettAleneomsorg.spm')}
                validate={getYesOrNoValidator()}
                data-testid="harAleneomsorg"
            />
        </FormBlock>
    );
};

export default HarAleneomsorgSpørsmål;
