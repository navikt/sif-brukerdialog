import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
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
import OpplysningerOmPleietrengendeForm, {
    OpplysningerOmPleietrengendeFormFields,
    OpplysningerOmPleietrengendeFormValues,
} from './OpplysningerOmPleietrengendeForm';
import {
    getOpplysningerOmPleietrengendeStepInitialValues,
    getOpplysningerOmPleietrengendeSøknadsdataFromFormValues,
} from './opplysningerOmPleietrengendeStepUtils';

const { FormikWrapper } = getTypedFormComponents<
    OpplysningerOmPleietrengendeFormFields,
    OpplysningerOmPleietrengendeFormValues,
    ValidationError
>();

const OpplysningerOmPleietrengendeStep = () => {
    const {
        state: { søknadsdata, søker },
    } = useSøknadContext();

    const stepId = StepId.OPPLYSNINGER_OM_PLEIETRENGENDE;

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const step = getSøknadStepConfigForStep(søknadsdata, stepId);
    const { goBack } = useStepNavigation(step);
    const andreVedlegg = søknadsdata.legeerklæring?.vedlegg || [];

    const onValidSubmitHandler = (values: OpplysningerOmPleietrengendeFormValues) => {
        const OpplysningerOmPleietrengendeSøknadsdata =
            getOpplysningerOmPleietrengendeSøknadsdataFromFormValues(values);
        if (OpplysningerOmPleietrengendeSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOpplysningerOmPleietrengende(OpplysningerOmPleietrengendeSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state });
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getOpplysningerOmPleietrengendeStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={() => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <OpplysningerOmPleietrengendeForm
                                søker={søker}
                                andreVedlegg={andreVedlegg}
                                goBack={goBack}
                                isSubmitting={isSubmitting}
                            />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default OpplysningerOmPleietrengendeStep;
