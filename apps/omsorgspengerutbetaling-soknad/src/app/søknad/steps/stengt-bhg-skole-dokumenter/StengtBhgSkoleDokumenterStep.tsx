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
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { getUploadedAttachments } from '../../../utils/attachmentUtils';
import { FormikValuesObserver } from '@navikt/sif-common-formik-ds/lib';
import StengtBhgSkoleDokumenterForm, {
    StengtBhgSkoleDokumenterFormFields,
    StengtBhgSkoleDokumenterFormValues,
} from './StengtBhgSkoleDokumenterForm';
import {
    getStengtBhgSkoleDokumenterStepInitialValues,
    getStengtBhgSkoleDokumenterSøknadsdataFromFormValues,
} from './StengtBhgSkoleDokumenterStepUtils';

const { FormikWrapper } = getTypedFormComponents<
    StengtBhgSkoleDokumenterFormFields,
    StengtBhgSkoleDokumenterFormValues
>();

const StengtBhgSkoleDokumenterStep = () => {
    const {
        state: { søknadsdata },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.DOKUMENTER_STENGT_SKOLE_BHG;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues = {}, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: StengtBhgSkoleDokumenterFormValues) => {
        const stengtBhgSkoleDokumenterSøknadsdata = getStengtBhgSkoleDokumenterSøknadsdataFromFormValues(values);
        if (stengtBhgSkoleDokumenterSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadStengtBhgSkoleDokumenter(stengtBhgSkoleDokumenterSøknadsdata)];
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

    const syncVedleggState = (vedlegg: Attachment[] = []) => {
        dispatch(
            actionsCreator.setSøknadStengtBhgSkoleDokumenter({
                vedlegg: getUploadedAttachments(vedlegg),
            })
        );
        dispatch(actionsCreator.requestLagreSøknad());
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getStengtBhgSkoleDokumenterStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    return (
                        <>
                            <FormikValuesObserver
                                onChange={(formValues: Partial<StengtBhgSkoleDokumenterFormValues>) => {
                                    syncVedleggState(formValues[StengtBhgSkoleDokumenterFormFields.vedlegg]);
                                }}
                            />
                            <PersistStepFormValues stepId={stepId} />
                            <StengtBhgSkoleDokumenterForm values={values} goBack={goBack} isSubmitting={isSubmitting} />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default StengtBhgSkoleDokumenterStep;
