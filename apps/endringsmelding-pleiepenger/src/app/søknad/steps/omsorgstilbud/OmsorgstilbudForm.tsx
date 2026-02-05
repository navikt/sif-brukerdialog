import { useOnValidSubmit } from '@hooks';
import { VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { SøknadContextState } from '@types';
import { useIntl } from 'react-intl';

import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { OmsorgstilbudEndringMap } from '../../../types/OmsorgstilbudEndring';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import { getOmsorgstilbudSøknadsdataFromFormValues } from './omsorgstilbudStepUtils';

const { FormikWrapper, Form } = getTypedFormComponents<
    OmsorgstilbudFormFields,
    OmsorgstilbudFormValues,
    ValidationError
>();

export interface OmsorgstilbudFormValues {
    endringer: OmsorgstilbudEndringMap;
}

export enum OmsorgstilbudFormFields {
    omsorgstilbud = 'omsorgstilbud',
}

interface Props {
    goBack?: () => void;
}

const OmsorgstilbudForm = ({ goBack }: Props) => {
    const stepId = StepId.OMSORGSTILBUD;
    const intl = useIntl();
    const { clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OmsorgstilbudFormValues) => {
        const omsorgstilbudSøknadsdata = getOmsorgstilbudSøknadsdataFromFormValues(values);
        if (omsorgstilbudSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOmsorgstilbud(omsorgstilbudSøknadsdata)];
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
        <FormikWrapper
            initialValues={{}}
            onSubmit={handleSubmit}
            renderForm={() => {
                return (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'omsorgstilbudForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            <VStack gap="space-16">Skjema for å endre omsorgstilbud</VStack>
                        </Form>
                    </>
                );
            }}
        />
    );
};

export default OmsorgstilbudForm;
