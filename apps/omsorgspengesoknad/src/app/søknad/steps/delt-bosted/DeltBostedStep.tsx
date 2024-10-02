import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
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
import { getDeltBostedStepInitialValues, getDeltBostedSøknadsdataFromFormValues } from './deltBostedStepUtils';
import DeltBostedForm, { DeltBostedFormFields, DeltBostedFormValues } from './DeltBostedForm';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { FormikValuesObserver } from '@navikt/sif-common-formik-ds';
import { getUploadedAttachments } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';

const { FormikWrapper } = getTypedFormComponents<DeltBostedFormFields, DeltBostedFormValues>();

const DeltBostedStep = () => {
    const {
        state: { søknadsdata },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.DELT_BOSTED;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues = {}, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: DeltBostedFormValues) => {
        const deltBostedSøknadsdata = getDeltBostedSøknadsdataFromFormValues(values);
        if (deltBostedSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadDeltBosted(deltBostedSøknadsdata)];
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

    const syncVedleggState = (vedlegg: Attachment[] = []) => {
        dispatch(
            actionsCreator.setSøknadDeltBosted({
                vedlegg: getUploadedAttachments(vedlegg),
            }),
        );
        dispatch(actionsCreator.requestLagreSøknad());
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getDeltBostedStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => (
                    <>
                        <FormikValuesObserver
                            onChange={(formValues: Partial<DeltBostedFormValues>) => {
                                syncVedleggState(formValues[DeltBostedFormFields.samværsavtale]);
                            }}
                        />
                        <PersistStepFormValues stepId={stepId} />
                        <DeltBostedForm
                            samværsavtaler={values[DeltBostedFormFields.samværsavtale]}
                            goBack={goBack}
                            isSubmitting={isSubmitting}
                        />
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default DeltBostedStep;
