import { getUploadedVedlegg } from '@navikt/sif-common-core-ds/src';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { FormikValuesObserver, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import LegeerklæringForm, { LegeerklæringFormFields, LegeerklæringFormValues } from './LegeerklæringForm';
import { getLegeerklæringStepInitialValues, getLegeerklæringSøknadsdataFromFormValues } from './legeerklæringStepUtils';
import { useSøknadMellomlagring } from '../../../hooks/useSøknadMellomlagring';

const { FormikWrapper } = getTypedFormComponents<LegeerklæringFormFields, LegeerklæringFormValues>();

const LegeerklæringStep = () => {
    const {
        state: { søknadsdata },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.LEGEERKLÆRING;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);
    const { lagreMellomlagring } = useSøknadMellomlagring();

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
            return lagreMellomlagring(state);
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
                            <LegeerklæringForm
                                legeerklæringer={values[LegeerklæringFormFields.vedlegg]}
                                isSubmitting={isSubmitting}
                                andreVedlegg={søknadsdata.deltBosted?.vedlegg}
                                goBack={goBack}
                            />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default LegeerklæringStep;
