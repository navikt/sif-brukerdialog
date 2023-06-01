import { Button } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { ApplikasjonHendelse, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { soknadStepUtils, Step as SøknadStep } from '@navikt/sif-common-soknad-ds';
import { useFormikContext } from 'formik';
import { purge } from '../api/api';
import usePersistSoknad from '../hooks/usePersistSoknad';
import InvalidStepPage from '../pages/invalid-step-page/InvalidStepPage';
import { SøknadFormValues } from '../types/SøknadFormValues';
import { relocateToDinePleiepenger, relocateToSoknad } from '../utils/navigationUtils';
import { getStepTexts } from '../utils/stepUtils';
import SøknadFormComponents from './SøknadFormComponents';
import { getSøknadStepConfig } from './søknadStepConfig';
import { getSøknadStepConfigOld } from './søknadStepsConfig';
import { StepID } from '../types/StepID';

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
        stepId: id,
        customErrorSummary,
        showSubmitButton = true,
    } = props;
    const stepConfig = getSøknadStepConfigOld(formik.values);
    useLogSidevisning(id);
    const { logHendelse } = useAmplitudeInstance();

    const handleAvbrytSøknad = async () => {
        await purge();
        await logHendelse(ApplikasjonHendelse.avbryt);
        relocateToSoknad();
    };

    const handleAvsluttOgFortsettSenere = async () => {
        /** Mellomlagring lagrer forrige steg, derfor må dette hentes ut her **/
        const prevStep = stepConfig[id].prevStep;
        await persistSoknad({ stepID: prevStep });
        await logHendelse(ApplikasjonHendelse.fortsettSenere);
        relocateToDinePleiepenger();
    };

    if (stepConfig === undefined || stepConfig[id] === undefined || stepConfig[id].included === false) {
        return <InvalidStepPage stepId={id} />;
    }

    const texts = getStepTexts(intl, id, stepConfig);
    const stepConfigNew = getSøknadStepConfig(formik.values);
    const { pageTitleIntlKey, index } = stepConfigNew[id];

    return (
        <>
            <SøknadStep
                activeStepId={id}
                pageTitle={intlHelper(intl, pageTitleIntlKey)}
                onCancel={handleAvbrytSøknad}
                onContinueLater={handleAvsluttOgFortsettSenere}
                steps={soknadStepUtils.getProgressStepsFromConfig(stepConfigNew, index, intl)}>
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
                                        disabled={buttonDisabled || false}
                                        aria-label={texts.nextButtonAriaLabel}>
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
