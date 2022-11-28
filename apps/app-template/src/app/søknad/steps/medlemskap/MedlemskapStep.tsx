import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig } from '../../søknadStepConfig';
import MedlemskapForm, { MedlemskapFormFields, MedlemskapFormValues } from './MedlemskapForm';
import { getMedlemskapStepInitialValues, getMedlemskapSøknadsdataFromFormValues } from './medlemskapStepUtils';

const { FormikWrapper } = getTypedFormComponents<MedlemskapFormFields, MedlemskapFormValues>();

const MedlemskapStep = () => {
    const {
        dispatch,
        state: { søknadsdata, søknadsdato },
    } = useSøknadContext();
    const stepId = StepId.MEDLEMSKAP;

    const stepConfig = getSøknadStepConfig(søknadsdata);
    const step = stepConfig[stepId];
    const { hasInvalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: MedlemskapFormValues) => {
        const medlemskapSøknadsdata = getMedlemskapSøknadsdataFromFormValues(values);
        if (medlemskapSøknadsdata) {
            clearStepFormValues(stepId);
            dispatch(actionsCreator.setSøknadMedlemskap(medlemskapSøknadsdata));
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        StepId.MEDLEMSKAP,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={StepId.MEDLEMSKAP}>
            <FormikWrapper
                initialValues={getMedlemskapStepInitialValues(søknadsdata, stepFormValues?.medlemskap)}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                renderForm={({ values }) => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <MedlemskapForm
                            values={values}
                            søknadsdato={søknadsdato}
                            goBack={goBack}
                            submitDisabled={hasInvalidSteps}
                        />
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default MedlemskapStep;
