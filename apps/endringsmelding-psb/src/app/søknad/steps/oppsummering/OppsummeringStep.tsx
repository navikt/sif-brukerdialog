import { Alert, ErrorSummary, Heading } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { ArbeidstakerApiData } from '../../../types/søknadApiData/SøknadApiData';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';

enum OppsummeringFormFields {
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
}

export interface OppsummeringFormValues {
    [OppsummeringFormFields.harBekreftetOpplysninger]: boolean;
}

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<
    OppsummeringFormFields,
    OppsummeringFormValues
>();

const OppsummeringStep = () => {
    const stepId = StepId.OPPSUMMERING;
    const intl = useIntl();
    const {
        state: { søknadsdata, sak, arbeidsgivere },
    } = useSøknadContext();

    const stepConfig = getSøknadStepConfig();
    const step = stepConfig[stepId];
    const { hasInvalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError, resetSendSøknad } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søknadsdata, sak);

    if (!apiData) {
        return <Alert variant="error">ApiData er undefined</Alert>;
    }

    const { arbeidstakerList } = apiData.ytelse.arbeidstid;

    // const lagArbeidsukerMedEndringFraApiData = (perioder: ArbeidstidPeriodeApiDataMap): ArbeidsukeMedEndring[] => {
    //     const arbeidsuker: ArbeidsukeMedEndring[] = [];

    //     Object.keys(perioder)
    //         .map((key) => ({ key, dateRange: ISODateRangeToDateRange(key), periodeApiData: perioder[key] }))
    //         .forEach(({ key, dateRange, periodeApiData }) => {
    //             const arbeidsuke: ArbeidsukeMedEndring = {
    //                 id: key,
    //                 periode: dateRange,
    //                 endring: undefined,
    //                 dagerMap: {},
    //                 normalt: ISODurationToDuration(periodeApiData.jobberNormaltTimerPerDag),
    //                 faktisk: ISODurationToDuration(periodeApiData.faktiskArbeidTimerPerDag),
    //             };
    //             arbeidsuker.push(arbeidsuke);
    //         });

    //     return arbeidsuker;
    // };

    return (
        <SøknadStep stepId={stepId}>
            {!apiData ? (
                <FormBlock paddingBottom="xl">
                    <Alert variant="error">Ugyldig apiData?</Alert>
                </FormBlock>
            ) : (
                <>
                    {arbeidstakerList &&
                        Object.keys(arbeidstakerList).map((key) => {
                            const { organisasjonsnummer }: ArbeidstakerApiData = arbeidstakerList[key];
                            const arbeidsgiver = arbeidsgivere.find((a) => (a.id = organisasjonsnummer));
                            if (!arbeidsgiver) {
                                return null;
                            }
                            return (
                                <FormBlock key={key}>
                                    <Heading level="2" size="medium">
                                        {arbeidsgiver.navn}
                                    </Heading>
                                </FormBlock>
                            );
                        })}
                </>
            )}
            <FormBlock margin="xxl">
                <FormikWrapper
                    initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                    onSubmit={() => {
                        apiData ? sendSøknad(apiData) : undefined;
                    }}
                    renderForm={() => {
                        return (
                            <>
                                <Form
                                    formErrorHandler={getIntlFormErrorHandler(intl, 'oppsummeringForm')}
                                    submitDisabled={isSubmitting || hasInvalidSteps}
                                    includeValidationSummary={true}
                                    submitButtonLabel="Send søknad"
                                    submitPending={isSubmitting}
                                    onValidSubmit={() => {
                                        resetSendSøknad();
                                    }}
                                    onBack={goBack}>
                                    <ConfirmationCheckbox
                                        label="Bekrefter opplysninger"
                                        validate={getCheckedValidator()}
                                        name={OppsummeringFormFields.harBekreftetOpplysninger}
                                    />
                                </Form>
                                {sendSøknadError && (
                                    <FormBlock>
                                        <ErrorSummary ref={sendSøknadErrorSummary}>
                                            {sendSøknadError.message}
                                        </ErrorSummary>
                                    </FormBlock>
                                )}
                            </>
                        );
                    }}
                />
            </FormBlock>
        </SøknadStep>
    );
};

export default OppsummeringStep;
