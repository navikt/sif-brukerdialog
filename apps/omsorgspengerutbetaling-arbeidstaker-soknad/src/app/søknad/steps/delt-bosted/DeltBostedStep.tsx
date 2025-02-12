import { getUploadedVedlegg } from '@navikt/sif-common-core-ds/src';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { FormikValuesObserver } from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { getAlleVedleggFraSøknadsdata } from '../../../utils/søknadVedleggUtils';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import DeltBostedForm, { DeltBostedFormFields, DeltBostedFormValues } from './DeltBostedForm';
import { getDeltBostedStepInitialValues, getDeltBostedSøknadsdataFromFormValues } from './deltBostedStepUtils';

const { FormikWrapper } = getTypedFormComponents<DeltBostedFormFields, DeltBostedFormValues>();

const DeltBostedStep = () => {
    const {
        state: { søknadsdata },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.DELT_BOSTED;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);
    const { legeerklæringer, situasjonVedlegg } = getAlleVedleggFraSøknadsdata(søknadsdata);
    const andreVedlegg = [...legeerklæringer, ...situasjonVedlegg];

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

    const syncVedleggState = (vedlegg: Vedlegg[] = []) => {
        dispatch(
            actionsCreator.setSøknadDeltBosted({
                vedlegg: getUploadedVedlegg(vedlegg),
            }),
        );
        dispatch(actionsCreator.requestLagreSøknad());
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getDeltBostedStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    return (
                        <>
                            <FormikValuesObserver
                                onChange={(formValues: Partial<DeltBostedFormValues>) => {
                                    syncVedleggState(formValues[DeltBostedFormFields.vedlegg]);
                                }}
                            />
                            <PersistStepFormValues stepId={stepId} />
                            <DeltBostedForm
                                values={values}
                                goBack={goBack}
                                andreVedlegg={andreVedlegg}
                                isSubmitting={isSubmitting}
                            />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default DeltBostedStep;
