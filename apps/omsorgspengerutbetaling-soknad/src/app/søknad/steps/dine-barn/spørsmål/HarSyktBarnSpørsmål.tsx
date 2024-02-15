import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { DineBarnFormFields } from '../DineBarnStep';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

const HarSyktBarnSpørsmål: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <FormBlock>
            <FormikYesOrNoQuestion
                name={DineBarnFormFields.harSyktBarn}
                legend={intlHelper(intl, 'step.dineBarn.utvidetRettSykdom.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo title={intlHelper(intl, 'step.dineBarn.utvidetRettSykdom.info.tittel')}>
                        <p>
                            <FormattedMessage id="step.dineBarn.utvidetRettSykdom.info.1" />
                        </p>
                        <p>
                            <FormattedMessage id="step.dineBarn.utvidetRettSykdom.info.2" />
                        </p>
                    </ExpandableInfo>
                }
            />
        </FormBlock>
    );
};

export default HarSyktBarnSpørsmål;
