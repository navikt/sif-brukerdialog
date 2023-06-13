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
import SmittevernDokumenterForm, {
    SmittevernDokumenterFormFields,
    SmittevernDokumenterFormValues,
} from './SmittevernDokumenterForm';
import {
    getSmittevernDokumenterStepInitialValues,
    getSmittevernDokumenterSøknadsdataFromFormValues,
} from './SmittevernDokumenterStepUtils';

const { FormikWrapper } = getTypedFormComponents<SmittevernDokumenterFormFields, SmittevernDokumenterFormValues>();

const SmittevernDokumenterStep = () => {
    const {
        state: { søknadsdata },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.DOKUMENTER_SMITTEVERNHENSYN;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues = {}, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: SmittevernDokumenterFormValues) => {
        const smittevernDokumenterSøknadsdata = getSmittevernDokumenterSøknadsdataFromFormValues(values);
        if (smittevernDokumenterSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadSmittevernDokumenter(smittevernDokumenterSøknadsdata)];
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
            actionsCreator.setSøknadSmittevernDokumenter({
                vedlegg: getUploadedAttachments(vedlegg),
            })
        );
        dispatch(actionsCreator.requestLagreSøknad());
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getSmittevernDokumenterStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    return (
                        <>
                            <FormikValuesObserver
                                onChange={(formValues: Partial<SmittevernDokumenterFormValues>) => {
                                    syncVedleggState(formValues[SmittevernDokumenterFormFields.vedlegg]);
                                }}
                            />
                            <PersistStepFormValues stepId={stepId} />
                            <SmittevernDokumenterForm values={values} goBack={goBack} isSubmitting={isSubmitting} />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default SmittevernDokumenterStep;
