import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src/types';
import getYesOrNoValidator from '@navikt/sif-common-formik-ds/src/validation/getYesOrNoValidator';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import FosterbarnListAndDialog from '@navikt/sif-common-forms-ds/src/forms/fosterbarn/FosterbarnListAndDialog';
import { Fosterbarn } from '@navikt/sif-common-forms-ds/src/forms/fosterbarn/types';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { getFosterbarnStepInitialValues, getFosterbarnSøknadsdataFromFormValues } from './fosterbarnStepUtils';

export enum FosterbarnFormFields {
    harFostrerbarn = 'harFostrerbarn',
    fosterbarn = 'fosterbarn',
}

export interface FosterbarnFormValues {
    [FosterbarnFormFields.fosterbarn]?: Fosterbarn[];
    [FosterbarnFormFields.harFostrerbarn]?: YesOrNo;
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    FosterbarnFormFields,
    FosterbarnFormValues,
    ValidationError
>();

const FosterbarnStep = () => {
    const { text, intl } = useAppIntl();

    const {
        state: { søknadsdata, søker },
    } = useSøknadContext();

    const stepId = StepId.FOSTERBARN;
    const step = getSøknadStepConfigForStep(stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: FosterbarnFormValues) => {
        const FosterbarnSøknadsdata = getFosterbarnSøknadsdataFromFormValues(values);
        if (FosterbarnSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadFosterbarn(FosterbarnSøknadsdata),
                actionsCreator.setSøknadTempFormValues(undefined),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state, tempFormValues: undefined });
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getFosterbarnStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values: { fosterbarn = [], harFostrerbarn } }) => {
                    const fosterbarnFnr = fosterbarn.map((barn) => barn.fødselsnummer);

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <SifGuidePanel>
                                    <AppText id="step.fosterbarn.counsellorPanel.avsnitt.1" />
                                    <Block margin="l">
                                        <AppText id="step.fosterbarn.counsellorPanel.avsnitt.2" />
                                    </Block>
                                    <Block margin="l">
                                        <AppText id="step.fosterbarn.counsellorPanel.avsnitt.3" />
                                    </Block>
                                </SifGuidePanel>

                                <FormBlock>
                                    <YesOrNoQuestion
                                        name={FosterbarnFormFields.harFostrerbarn}
                                        legend={text('step.fosterbarn.info.spm.fosterbarn')}
                                        validate={getYesOrNoValidator()}
                                        data-testid="harFostrerbarn"
                                    />
                                </FormBlock>

                                {harFostrerbarn === YesOrNo.YES && (
                                    <FormBlock>
                                        <FosterbarnListAndDialog<FosterbarnFormFields>
                                            name={FosterbarnFormFields.fosterbarn}
                                            disallowedFødselsnumre={[...[søker.fødselsnummer], ...fosterbarnFnr]}
                                            validate={(fosterbarn: Fosterbarn[]) => {
                                                if (fosterbarn.length === 0) {
                                                    return {
                                                        key: 'validation.fosterbarn.required',
                                                        keepKeyUnaltered: true,
                                                    };
                                                }
                                                return undefined;
                                            }}
                                        />
                                    </FormBlock>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default FosterbarnStep;
