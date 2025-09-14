import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import React from 'react';

import { AppText, useAppIntl } from '../../../../i18n';
import { DineBarnFormFields } from '../DineBarnStep';

const HarSyktBarnSpørsmål: React.FunctionComponent = () => {
    const { text } = useAppIntl();
    return (
        <FormikYesOrNoQuestion
            name={DineBarnFormFields.harSyktBarn}
            legend={text('step.dineBarn.utvidetRettSykdom.spm')}
            validate={getYesOrNoValidator()}
            description={
                <ExpandableInfo title={text('step.dineBarn.utvidetRettSykdom.info.tittel')}>
                    <p>
                        <AppText id="step.dineBarn.utvidetRettSykdom.info.1" />
                    </p>
                    <p>
                        <AppText id="step.dineBarn.utvidetRettSykdom.info.2" />
                    </p>
                </ExpandableInfo>
            }
        />
    );
};

export default HarSyktBarnSpørsmål;
