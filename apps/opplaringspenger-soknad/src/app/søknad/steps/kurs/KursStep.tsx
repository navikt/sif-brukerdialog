import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { StepId } from '../../../types/StepId';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { getBarnetsFødselsdato, getTillattSøknadsperiode } from '../../../utils/søknadsperiodeUtils';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import KursStepForm, { KursFormComponents } from './KursStepForm';
import { getKursSøknadsdataFromFormValues, getKursStepInitialValues } from './utils/kursStepUtils';

const KursStep = () => {
    const {
        state: { søknadsdata, institusjoner, spørOmFraværFraJobb = false },
    } = useSøknadContext();

    const stepId = StepId.KURS;
    const step = getSøknadStepConfigForStep(stepId, søknadsdata);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values) => {
        const kursSøknadsdata = getKursSøknadsdataFromFormValues(values, spørOmFraværFraJobb === false);
        if (kursSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadKurs(kursSøknadsdata),
                actionsCreator.syncArbeidstidMedKursperioder(kursSøknadsdata),
            ];
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

    const gyldigSøknadsperiode = getTillattSøknadsperiode(getBarnetsFødselsdato(søknadsdata.omBarnet));

    return (
        <SøknadStep stepId={stepId}>
            <KursFormComponents.FormikWrapper
                initialValues={getKursStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <KursStepForm
                                institusjoner={institusjoner}
                                values={values || {}}
                                isSubmitting={isSubmitting}
                                goBack={goBack}
                                gyldigSøknadsperiode={gyldigSøknadsperiode}
                                spørOmVarighetKursOgReise={spørOmFraværFraJobb}
                            />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default KursStep;
