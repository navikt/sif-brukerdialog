import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppIntl } from '@i18n/index';
import { ApplikasjonHendelse, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { soknadStepUtils, Step as SøknadStep } from '@navikt/sif-common-soknad-ds';
import { useFormikContext } from 'formik';
import { purge } from '../api/api';
import usePersistSoknad from '../hooks/usePersistSoknad';
import InvalidStepPage from '../pages/invalid-step-page/InvalidStepPage';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { relocateToMinSide, relocateToSoknad } from '../utils/navigationUtils';
import SøknadFormComponents from './SøknadFormComponents';
import { getSøknadStepConfig } from './søknadStepConfig';

interface Props {
    stepId: StepID;
    useValidationErrorSummary?: boolean;
    children: React.ReactNode;
    showSubmitButton?: boolean;
    isFinalSubmit?: boolean;
    showButtonSpinner?: boolean;
    buttonDisabled?: boolean;
    skipValidation?: boolean;
    onValidFormSubmit?: () => void;
    customErrorSummary?: () => React.ReactNode;
}

const SøknadFormStep = (props: Props) => {
    const formik = useFormikContext<SøknadFormValues>();
    const { persistSoknad } = usePersistSoknad();
    const { intl, text } = useAppIntl();
    const {
        children,
        onValidFormSubmit,
        showButtonSpinner,
        buttonDisabled,
        stepId,
        customErrorSummary,
        isFinalSubmit,
        showSubmitButton = true,
    } = props;
    useLogSidevisning(stepId);
    const navigate = useNavigate();
    const { logHendelse } = useAmplitudeInstance();

    const søknadStepConfig = getSøknadStepConfig(formik.values);
    const currentStepConfig = søknadStepConfig[stepId];

    if (currentStepConfig === undefined) {
        return <InvalidStepPage stepId={stepId} />;
    }
    const texts = soknadStepUtils.getStepTexts(intl, currentStepConfig);
    const { index } = currentStepConfig;

    const handleAvbrytSøknad = async () => {
        await purge();
        await logHendelse(ApplikasjonHendelse.avbryt);
        relocateToSoknad();
    };

    const handleAvsluttOgFortsettSenere = async () => {
        /** Mellomlagring lagrer forrige steg, derfor må dette hentes ut her **/
        await persistSoknad({ stepID: currentStepConfig.previousStep });
        await logHendelse(ApplikasjonHendelse.fortsettSenere);
        relocateToMinSide();
    };

    const { previousStepRoute } = currentStepConfig;

    return (
        <SøknadStep
            activeStepId={stepId}
            applicationTitle={text('application.title')}
            onCancel={handleAvbrytSøknad}
            onContinueLater={handleAvsluttOgFortsettSenere}
            steps={soknadStepUtils.getProgressStepsFromConfig(søknadStepConfig, index, intl)}>
            <SøknadFormComponents.Form
                onValidSubmit={onValidFormSubmit}
                includeButtons={true}
                submitButtonLabel={texts.nextButtonLabel}
                isFinalSubmit={isFinalSubmit}
                showSubmitButton={showSubmitButton}
                includeValidationSummary={true}
                runDelayedFormValidation={true}
                onBack={previousStepRoute ? () => navigate(previousStepRoute) : undefined}
                submitPending={showButtonSpinner}
                submitDisabled={buttonDisabled}
                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                formFooter={<>{customErrorSummary && <FormBlock>{customErrorSummary()}</FormBlock>}</>}>
                {children}
            </SøknadFormComponents.Form>
        </SøknadStep>
    );
};

export default SøknadFormStep;
