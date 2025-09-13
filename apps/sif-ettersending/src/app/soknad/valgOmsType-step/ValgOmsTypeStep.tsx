import { FormikRadioProp } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { useAppIntl } from '../../i18n';
import { SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import { YtelseKey, Ytelser } from '../../types/Ytelser';
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

const ValgOmsTypeStep = ({ søknadstype }: Props) => {
    const { text } = useAppIntl();
    return (
        <SoknadFormStep id={StepID.OMS_TYPE} søknadstype={søknadstype}>
            <SoknadFormComponents.RadioGroup
                name={SoknadFormField.ytelse}
                legend={text('step.omsorgspenger_type.søknadstype.spm')}
                validate={getRequiredFieldValidator()}
                radios={[
                    getYtelseRadio(YtelseKey.omsorgsdagerKroniskSyk),
                    getYtelseRadio(YtelseKey.omsorgspengerutbetalingSNFri),
                    getYtelseRadio(YtelseKey.omsorgspengerutbetalingArbeidstaker),
                    getYtelseRadio(YtelseKey.omsorgsdagerAnnenForelderIkkeTilsyn),
                ]}
            />
        </SoknadFormStep>
    );
};

export default ValgOmsTypeStep;
