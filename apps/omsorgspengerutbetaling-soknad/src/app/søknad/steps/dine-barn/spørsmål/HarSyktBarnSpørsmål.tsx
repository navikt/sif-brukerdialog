import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { AppText, useAppIntl } from '../../../../i18n';
import { DineBarnFormFields } from '../DineBarnStep';

const HarSyktBarnSpørsmål: React.FunctionComponent = () => {
    const { text } = useAppIntl();
    return (
        <FormBlock>
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
        </FormBlock>
    );
};

export default HarSyktBarnSpørsmål;
