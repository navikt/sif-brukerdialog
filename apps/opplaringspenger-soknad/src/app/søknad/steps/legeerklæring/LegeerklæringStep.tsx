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
import LegeerklæringForm, { LegeerklæringFormFields, LegeerklæringFormValues } from './LegeerklæringForm';
import { getLegeerklæringStepInitialValues, getLegeerklæringSøknadsdataFromFormValues } from './legeerklæringStepUtils';
import { FormikValuesObserver } from '@navikt/sif-common-formik-ds';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getUploadedVedlegg } from '@navikt/sif-common-core-ds/src';

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
        const legeerklæringSøknadsdata = getLegeerklæringSøknadsdataFromFormValues(values);
        if (legeerklæringSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadLegeerklæring(legeerklæringSøknadsdata)];
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
            actionsCreator.setSøknadLegeerklæring({
                vedlegg: getUploadedVedlegg(vedlegg),
            }),
        );
        dispatch(actionsCreator.requestLagreSøknad());
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getLegeerklæringStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    return (
                        <>
                            <FormikValuesObserver
                                onChange={(formValues: Partial<LegeerklæringFormValues>) => {
                                    syncVedleggState(formValues[LegeerklæringFormFields.vedlegg]);
                                }}
                            />
                            <PersistStepFormValues stepId={stepId} />
                            <LegeerklæringForm values={values} goBack={goBack} isSubmitting={isSubmitting} />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default LegeerklæringStep;
