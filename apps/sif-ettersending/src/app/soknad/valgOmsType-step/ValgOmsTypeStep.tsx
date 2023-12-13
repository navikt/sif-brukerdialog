import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { YtelseKey, Ytelser } from '@navikt/sif-common-core-ds/src/types/Ytelser';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';

interface Props {
    søknadstype: Søknadstype;
}

const getYtelseRadio = (ytelseKey: YtelseKey): FormikRadioProp => {
    return {
        value: ytelseKey,
        label: Ytelser[ytelseKey].søknadstittel.nb,
    };
};

const ValgOmsTypeStep: React.FC<Props> = ({ søknadstype }) => {
    const intl = useIntl();
    return (
        <SoknadFormStep id={StepID.OMS_TYPE} søknadstype={søknadstype}>
            <FormBlock>
                <SoknadFormComponents.RadioGroup
                    name={SoknadFormField.ytelse}
                    legend={intlHelper(intl, 'step.omsorgspenger_type.søknadstype.spm')}
                    validate={getRequiredFieldValidator()}
                    radios={[
                        getYtelseRadio(YtelseKey.omsorgsdagerKroniskSyk),
                        getYtelseRadio(YtelseKey.omsorgspengerutbetalingSNFri),
                        getYtelseRadio(YtelseKey.omsorgspengerutbetalingArbeidstaker),
                        // getYtelseRadio(YtelseKey.omsorgsdagerAleneomsorg), Midlertidig tatt bort frem til backend støtter denne
                        getYtelseRadio(YtelseKey.omsorgsdagerAnnenForelderIkkeTilsyn),
                    ]}
                />
            </FormBlock>
        </SoknadFormStep>
    );
};

export default ValgOmsTypeStep;
