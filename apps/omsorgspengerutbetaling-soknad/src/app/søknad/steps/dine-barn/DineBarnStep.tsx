import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src/types';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { usePersistTempFormValues } from '../../../hooks/usePersistTempFormValues';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { getDineBarnStepInitialValues, getDineBarnSøknadsdataFromFormValues } from './dineBarnStepUtils';
import DineBarnForm from './DineBarnForm';

export enum DineBarnFormFields {
    andreBarn = 'andreBarn',
    harSyktBarn = 'harSyktBarn',
    harAleneomsorg = 'harAleneomsorg',
    harUtvidetRettFor = 'harUtvidetRettFor',
    harDekketTiFørsteDagerSelv = 'harDekketTiFørsteDagerSelv',
}

export interface DineBarnFormValues {
    [DineBarnFormFields.andreBarn]?: AnnetBarn[];
    [DineBarnFormFields.harDekketTiFørsteDagerSelv]?: boolean;
    [DineBarnFormFields.harSyktBarn]?: YesOrNo;
    [DineBarnFormFields.harAleneomsorg]?: YesOrNo;
    [DineBarnFormFields.harUtvidetRettFor]: string[];
}

const { FormikWrapper } = getTypedFormComponents<DineBarnFormFields, DineBarnFormValues, ValidationError>();

const DineBarnStep = () => {
    const {
        state: { søknadsdata, søker, registrerteBarn, tempFormData },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.DINE_BARN;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: DineBarnFormValues) => {
        const DineBarnSøknadsdata = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
        if (DineBarnSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadDineBarn(DineBarnSøknadsdata),
                actionsCreator.setSøknadTempFormData(undefined),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state, tempFormData: undefined });
        },
    );

    const { persistTempFormValues } = usePersistTempFormValues();

    const persistAndreBarnChangedValues = (values: Partial<DineBarnFormValues>) => {
        dispatch(actionsCreator.setSøknadTempFormData({ stepId, values }));
        persistTempFormValues({ stepId, values });
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getDineBarnStepInitialValues(søknadsdata, tempFormData, stepFormValues[stepId])}
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
