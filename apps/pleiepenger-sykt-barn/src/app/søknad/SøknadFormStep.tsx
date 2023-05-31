import { Button } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { ApplikasjonHendelse, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { Step as SøknadStep } from '@navikt/sif-common-soknad-ds';
import { useFormikContext } from 'formik';
import { purge } from '../api/api';
import Step, { StepProps } from '../components/step/Step';
import usePersistSoknad from '../hooks/usePersistSoknad';
import InvalidStepPage from '../pages/invalid-step-page/InvalidStepPage';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/SøknadFormValues';
import { relocateToDinePleiepenger, relocateToSoknad } from '../utils/navigationUtils';
import { getStepTexts } from '../utils/stepUtils';
import SøknadFormComponents from './SøknadFormComponents';
import { getSøknadStepConfig } from './søknadStepsConfig';

export interface FormikStepProps {
    children: React.ReactNode;
    showSubmitButton?: boolean;
    showButtonSpinner?: boolean;
    buttonDisabled?: boolean;
    skipValidation?: boolean;
    onValidFormSubmit?: () => void;
    customErrorSummary?: () => React.ReactNode;
    onStepCleanup?: (values: SøknadFormValues) => SøknadFormValues;
}

type Props = FormikStepProps & Omit<StepProps, 'onAvbryt' | 'onFortsettSenere'>;

const SøknadFormStep = (props: Props) => {
    const formik = useFormikContext<SøknadFormValues>();
    const { persistSoknad } = usePersistSoknad();
    const intl = useIntl();
    const {
        children,
        onValidFormSubmit,
        showButtonSpinner,
        buttonDisabled,
        id,
        customErrorSummary,
        showSubmitButton = true,
    } = props;
    const stepConfig = getSøknadStepConfig(formik.values);
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

    return (
        <>
            <SøknadStep
                activeStepId={StepID.TIDSROM}
                pageTitle="ABC"
                onCancel={handleAvbrytSøknad}
                onContinueLater={handleAvsluttOgFortsettSenere}
                steps={[{ id: StepID.TIDSROM, index: 0, label: 'BAC', completed: true }]}>
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
            <Step
                stepConfig={stepConfig}
                onFortsettSenere={handleAvsluttOgFortsettSenere}
                onAvbryt={handleAvbrytSøknad}
                {...props}>
                sdf
            </Step>
        </>
    );
};

export default SøknadFormStep;
