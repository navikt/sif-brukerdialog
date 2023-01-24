import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import LegeerklæringForm, { LegeerklæringFormFields, LegeerklæringFormValues } from './LegeerklæringForm';
import { getLegeerklæringStepInitialValues, getLegeerklæringSøknadsdataFromFormValues } from './legeerklæringStepUtils';

const { FormikWrapper } = getTypedFormComponents<LegeerklæringFormFields, LegeerklæringFormValues>();

const LegeerklæringStep = () => {
    const {
        state: { søknadsdata },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.LEGEERKLÆRING;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues = {}, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: LegeerklæringFormValues) => {
        const LegeerklæringSøknadsdata = getLegeerklæringSøknadsdataFromFormValues(values);
        if (LegeerklæringSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadLegeerklæring(LegeerklæringSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    const requestLagreSøknad = () => {
        dispatch(actionsCreator.requestLagreSøknad());
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getLegeerklæringStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <LegeerklæringForm
                            values={values}
                            goBack={goBack}
                            isSubmitting={isSubmitting}
                            onAttachmentDeleted={requestLagreSøknad}
                            onAttachmentsUploaded={requestLagreSøknad}
                        />
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default LegeerklæringStep;
