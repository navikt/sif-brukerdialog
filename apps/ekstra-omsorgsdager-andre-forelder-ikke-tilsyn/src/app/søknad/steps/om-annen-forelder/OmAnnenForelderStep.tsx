import { List, VStack } from '@navikt/ds-react';
import { isDevMode } from '@navikt/sif-common-env';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { getFødselsnummerValidator, getStringValidator } from '@navikt/sif-validation';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useAppIntl } from '../../../i18n';
import actionsCreator from '../../../søknad/context/action/actionCreator';
import { useStepFormValuesContext } from '../../../søknad/context/StepFormValuesContext';
import { getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import {
    getOmAnnenForelderStepInitialValues,
    getOmAnnenForelderSøknadsdataFromFormValues,
} from './omAnnenForelderStepUtils';

export enum OmAnnenForelderFormFields {
    annenForelderNavn = 'annenForelderNavn',
    annenForelderFnr = 'annenForelderFnr',
}

export interface OmAnnenForelderFormValues {
    [OmAnnenForelderFormFields.annenForelderNavn]: string;
    [OmAnnenForelderFormFields.annenForelderFnr]: string;
}

const { FormikWrapper, Form, TextField } = getTypedFormComponents<
    OmAnnenForelderFormFields,
    OmAnnenForelderFormValues,
    ValidationError
>();

const OmAnnenForelderStep = () => {
    const { text, intl } = useAppIntl();
    const {
        state: { søknadsdata, søker },
    } = useSøknadContext();

    const stepId = StepId.OM_ANNEN_FORELDER;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OmAnnenForelderFormValues) => {
        const OmAnnenForelderSøknadsdata = getOmAnnenForelderSøknadsdataFromFormValues(values);
        if (OmAnnenForelderSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOmAnnenForelder(OmAnnenForelderSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getOmAnnenForelderStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={() => {
                    return (
                        <VStack gap="8">
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormLayout.Guide>
                                    {text('step.omAnnenForelder.sifGuidePanel')}
                                    <List>
                                        <List.Item>{text('step.omAnnenForelder.sifGuidePanel.list.1')}</List.Item>
                                        <List.Item>{text('step.omAnnenForelder.sifGuidePanel.list.2')}</List.Item>
                                    </List>
                                </FormLayout.Guide>
                                <FormLayout.Questions>
                                    <TextField
                                        name={OmAnnenForelderFormFields.annenForelderFnr}
                                        label={text('step.omAnnenForelder.fnr.spm')}
                                        validate={getFødselsnummerValidator({
                                            required: true,
                                            allowHnr: isDevMode(),
                                            disallowedValues: [søker.fødselsnummer],
                                        })}
                                        inputMode="numeric"
                                        maxLength={11}
                                        minLength={11}
                                        style={{ maxWidth: '20rem' }}
                                    />
                                    <TextField
                                        name={OmAnnenForelderFormFields.annenForelderNavn}
                                        label={text('step.omAnnenForelder.navn.spm')}
                                        validate={(value) => {
                                            const error = getStringValidator({
                                                required: true,
                                                minLength: 2,
                                                maxLength: 50,
                                            })(value);
                                            return error
                                                ? {
                                                      key: error,
                                                      values: {
                                                          min: 2,
                                                          maks: 50,
                                                      },
                                                  }
                                                : undefined;
                                        }}
                                        style={{ maxWidth: '20rem' }}
                                    />
                                </FormLayout.Questions>
                            </Form>
                        </VStack>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default OmAnnenForelderStep;
