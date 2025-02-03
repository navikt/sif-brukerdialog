import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { OmBarnetFormComponents } from './om-barnet-form/components/OmBarnetFormComponents';
import OmBarnetForm from './om-barnet-form/OmBarnetForm';
import { OmBarnetFormValues } from './om-barnet-form/types';
import {
    getOmBarnetFormInitialValues,
    getOmBarnetSøknadsdataFromFormValues,
} from './om-barnet-form/utils/omBarnetFormUtils';

const OmBarnetStep = () => {
    const stepId = StepId.OM_BARNET;
    const {
        state: { søknadsdata, registrerteBarn, søker },
    } = useSøknadContext();
    const { intl } = useAppIntl();

    const step = getSøknadStepConfigForStep(stepId);
    const { goBack } = useStepNavigation(step);
    const andreVedlegg = søknadsdata.legeerklæring?.vedlegg || [];

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OmBarnetFormValues) => {
        const OmBarnetSøknadsdata = getOmBarnetSøknadsdataFromFormValues(values, registrerteBarn);
        if (OmBarnetSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOmBarnet(OmBarnetSøknadsdata)];
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

    const initialValues = getOmBarnetFormInitialValues(søknadsdata.omBarnet, stepFormValues[stepId]);
    return (
        <SøknadStep stepId={stepId}>
            <OmBarnetFormComponents.FormikWrapper
                initialValues={initialValues}
                onSubmit={handleSubmit}
                renderForm={() => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <OmBarnetForm
                                initialValues={initialValues}
                                isSubmitting={isSubmitting}
                                registrerteBarn={registrerteBarn}
                                søkersFødselsnummer={søker.fødselsnummer}
                                goBack={goBack}
                                andreVedlegg={andreVedlegg}
                                ettersendelseURL={getLenker(intl.locale).ettersend}
                            />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default OmBarnetStep;
