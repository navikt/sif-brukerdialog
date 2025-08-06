import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { usePersistTempFormValues } from '../../../hooks/usePersistTempFormValues';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import DineBarnForm from './DineBarnForm';
import { getDineBarnStepInitialValues, getDineBarnSøknadsdataFromFormValues } from './dineBarnStepUtils';

export enum DineBarnFormFields {
    andreBarn = 'andreBarn',
    harDeltBosted = 'harDeltBosted',
}

export interface DineBarnFormValues {
    [DineBarnFormFields.andreBarn]?: AnnetBarn[];
    [DineBarnFormFields.harDeltBosted]?: YesOrNo;
}

const { FormikWrapper } = getTypedFormComponents<DineBarnFormFields, DineBarnFormValues, ValidationError>();

const DineBarnStep = () => {
    const {
        state: { søknadsdata, søker, registrerteBarn, tempFormValues },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.DINE_BARN;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: DineBarnFormValues) => {
        const dineBarnSøknadsdata = getDineBarnSøknadsdataFromFormValues(values);
        if (dineBarnSøknadsdata) {
            clearStepFormValues(stepId);
            if (dineBarnSøknadsdata.harDeltBosted === false) {
                clearStepFormValues(StepId.DELT_BOSTED);
            }
            return [
                actionsCreator.setSøknadDineBarn(dineBarnSøknadsdata),
                actionsCreator.setSøknadRoute(
                    dineBarnSøknadsdata.harDeltBosted ? SøknadRoutes.DELT_BOSTED : SøknadRoutes.SITUASJON,
                ),
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

    const { persistTempFormValues } = usePersistTempFormValues();

    const persistAndreBarnChangedValues = (values: Partial<DineBarnFormValues>) => {
        dispatch(actionsCreator.setSøknadTempFormValues({ stepId, values }));
        persistTempFormValues({ stepId, values });
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getDineBarnStepInitialValues(søknadsdata, tempFormValues, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={(values) => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <DineBarnForm
                            values={values.values}
                            registrerteBarn={registrerteBarn}
                            goBack={goBack}
                            søker={søker}
                            isSubmitting={isSubmitting}
                            onAndreBarnChanged={persistAndreBarnChangedValues}
                        />
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default DineBarnStep;
