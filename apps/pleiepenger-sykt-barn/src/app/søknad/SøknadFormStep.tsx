import { Button } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { ApplikasjonHendelse, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { soknadStepUtils, Step as SøknadStep } from '@navikt/sif-common-soknad-ds';
import { useFormikContext } from 'formik';
import { purge } from '../api/api';
import usePersistSoknad from '../hooks/usePersistSoknad';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/SøknadFormValues';
import { relocateToDinePleiepenger, relocateToSoknad } from '../utils/navigationUtils';
import SøknadFormComponents from './SøknadFormComponents';
import { getSøknadStepConfig } from './søknadStepConfig';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

interface Props {
    stepId: StepID;
    useValidationErrorSummary?: boolean;
    children: React.ReactNode;
    showSubmitButton?: boolean;
    showButtonSpinner?: boolean;
    buttonDisabled?: boolean;
    skipValidation?: boolean;
    onValidFormSubmit?: () => void;
    customErrorSummary?: () => React.ReactNode;
    onStepCleanup?: (values: SøknadFormValues) => SøknadFormValues;
}

const SøknadFormStep = (props: Props) => {
    const formik = useFormikContext<SøknadFormValues>();
    const { persistSoknad } = usePersistSoknad();
    const intl = useIntl();
    const {
        children,
        onValidFormSubmit,
        showButtonSpinner,
        buttonDisabled,
        stepId,
        customErrorSummary,
        showSubmitButton = true,
    } = props;
    useLogSidevisning(stepId);
    const { logHendelse } = useAmplitudeInstance();

    const søknadStepConfig = getSøknadStepConfig(formik.values);
    const stepConfig = søknadStepConfig[stepId];
    const texts = soknadStepUtils.getStepTexts(intl, stepConfig);
    const { index } = stepConfig;

    const handleAvbrytSøknad = async () => {
        await purge();
        await logHendelse(ApplikasjonHendelse.avbryt);
        relocateToSoknad();
    };

    const handleAvsluttOgFortsettSenere = async () => {
        /** Mellomlagring lagrer forrige steg, derfor må dette hentes ut her **/
        await persistSoknad({ stepID: stepConfig.previousStep });
        await logHendelse(ApplikasjonHendelse.fortsettSenere);
        relocateToDinePleiepenger();
    };

    // TODO - sjekke om denne fortsatt må være med
    // if (stepConfig === undefined || stepConfig[id] === undefined || stepConfig[id].included === false) {
    //     return <InvalidStepPage stepId={id} />;
    // }

    return (
        <>
            <SøknadStep
                activeStepId={stepId}
                bannerTitle={intlHelper(intl, 'application.title')}
                pageTitle={texts.pageTitle}
                onCancel={handleAvbrytSøknad}
                onContinueLater={handleAvsluttOgFortsettSenere}
                steps={soknadStepUtils.getProgressStepsFromConfig(søknadStepConfig, index, intl)}>
                <SøknadFormComponents.Form
                    onValidSubmit={onValidFormSubmit}
                    includeButtons={false}
                    includeValidationSummary={true}
                    runDelayedFormValidation={true}
                    cleanup={
                        /**TODO: Fjernet cleanup enn så lenge - den stopper at bruker kommer videre til neste steg*/
                        1 + 1 === 3 ? props.onStepCleanup : undefined
                    }
                    formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                    formFooter={
                        <>
                            {customErrorSummary && <FormBlock>{customErrorSummary()}</FormBlock>}
                            {showSubmitButton && (
                                <FormBlock>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className={'step__button'}
                                        loading={showButtonSpinner || false}
                                        disabled={buttonDisabled || false}>
                                        {texts.nextButtonLabel}
                                    </Button>
                                </FormBlock>
                            )}
                        </>
                    }>
                    {children}
                </SøknadFormComponents.Form>
            </SøknadStep>
        </>
    );
};

export default SøknadFormStep;
