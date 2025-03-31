import { VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppIntl } from '@i18n/index';
import { PleiepengerSyktBarnApp } from '@navikt/sif-app-register';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { MedlemskapSummary } from '@navikt/sif-common-forms-ds/src';
import { LoadingPage } from '@navikt/sif-common-soknad-ds';
import { isInvalidParameterErrorResponse } from '@navikt/sif-common-soknad-ds/src/utils/innsendingErrorUtils';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { isAxiosError } from 'axios';
import { purge, sendApplication } from '../../api/api';
import routeConfig from '../../config/routeConfig';
import { SøkerdataContextConsumer } from '../../context/SøkerdataContext';
import useLogSøknadInfo from '../../hooks/useLogSøknadInfo';
import { AppText } from '../../i18n';
import { StepID } from '../../types/StepID';
import { Søkerdata } from '../../types/Søkerdata';
import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import appSentryLogger from '../../utils/appSentryLogger';
import { harArbeidIPerioden, harFraværFraJobb } from '../../utils/arbeidUtils';
import { getDataBruktTilUtledning } from '../../utils/getDataBruktTilUtledning';
import { relocateToLoginPage } from '../../utils/navigationUtils';
import { getApiDataFromSøknadsdata } from '../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { validateApiValues } from '../../validation/apiValuesValidation';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadFormStep from '../SøknadFormStep';
import { useSøknadsdataContext } from '../SøknadsdataContext';
import { getSøknadStepConfig } from '../søknadStepConfig';
import ApiValidationSummary from './api-validation-summary/ApiValidationSummary';
import ArbeidIPeriodenSummary from './arbeid-i-perioden-summary/ArbeidIPeriodenSummary';
import ArbeidssituasjonSummary from './arbeidssituasjon-summary/ArbeidssituasjonSummary';
import BarnSummary from './barn-summary/BarnSummary';
import InnsendingFeiletInformasjon from './InnsendingFeiletInformasjon';
import LegeerklæringSummary from './legeerklæring-summary/LegeerklæringSummary';
import NattevågOgBeredskapSummary from './nattevåk-og-beredskap-summary/NattevåkOgBeredskapSummary';
import OmsorgstilbudSummary from './omsorgstilbud-summary/OmsorgstilbudSummary';
import PeriodeSummary from './periode-summary/PeriodeSummary';
import SøkerSummary from './søker-summary/SøkerSummary';
import './oppsummeringStep.less';
import { InvalidParameterViolation } from '@navikt/sif-common-api';

interface Props {
    values: SøknadFormValues;
    søknadsdato: Date;
    onApplicationSent: (apiValues: SøknadApiData, søkerdata: Søkerdata) => void;
}

const OppsummeringStep = ({ onApplicationSent, søknadsdato, values }: Props) => {
    const [sendingInProgress, setSendingInProgress] = useState<boolean>(false);
    const [soknadSent, setSoknadSent] = useState<boolean>(false);
    const [invalidParameters, setInvalidParameters] = useState<InvalidParameterViolation[] | undefined>();

    const appIntl = useAppIntl();
    const { text, intl, locale } = appIntl;
    const navigate = useNavigate();

    const søknadStepConfig = getSøknadStepConfig(values);

    const { logSoknadSent, logSoknadFailed, logUserLoggedOut } = useAmplitudeInstance();
    const { logSenderInnSøknadMedIngenFravær } = useLogSøknadInfo();
    const { søknadsdata } = useSøknadsdataContext();

    if (!søknadsdata.isInitialized) {
        return <LoadingPage />;
    }

    const sendSoknad = async (apiValues: SøknadApiData, søkerdata: Søkerdata, harArbeidMenIngenFravær: boolean) => {
        if (sendingInProgress) {
            return;
        }
        setInvalidParameters(undefined);
        setSendingInProgress(true);
        try {
            await sendApplication(apiValues);
            await logSoknadSent(PleiepengerSyktBarnApp.key, locale);
            if (harArbeidMenIngenFravær) {
                await logSenderInnSøknadMedIngenFravær();
            }
            await purge();
            setSoknadSent(true);
            onApplicationSent(apiValues, søkerdata);
        } catch (error: any) {
            if (isAxiosError(error) && isInvalidParameterErrorResponse(error.response?.data)) {
                setSendingInProgress(false);
                setInvalidParameters(error.response.data.violations);
                appSentryLogger.logApiError(error as any);
            } else if (isUnauthorized(error)) {
                logUserLoggedOut('Ved innsending av søknad');
                relocateToLoginPage();
            } else {
                await logSoknadFailed(PleiepengerSyktBarnApp.navn);
                appSentryLogger.logApiError(error);
                navigate(routeConfig.ERROR_PAGE_ROUTE);
            }
        }
    };

    if (soknadSent) {
        /** User is redirected to confirmation page */
        return null;
    }

    return (
        <SøkerdataContextConsumer>
            {(søkerdata: Søkerdata | undefined) => {
                if (søkerdata === undefined) {
                    return <div>Det oppstod en feil - informasjon om søker mangler</div>;
                }
                if (søknadsdata === undefined) {
                    return <div>Det oppstod en feil - søknadsdata mangler</div>;
                }

                const harArbeidMenIngenFravær =
                    harArbeidIPerioden(søknadsdata.arbeidssituasjon) &&
                    !harFraværFraJobb(søknadsdata.arbeidstidIPerioden);

                const { barn } = søkerdata;
                const harBekreftetOpplysninger = values.harBekreftetOpplysninger;

                const apiValues = getApiDataFromSøknadsdata(
                    søkerdata.søker.fødselsnummer,
                    barn,
                    søknadsdata,
                    harBekreftetOpplysninger,
                    getDataBruktTilUtledning(søknadsdata),
                    intl.locale as Locale,
                );
                if (apiValues === undefined) {
                    return <div>Det oppstod en feil - api-data mangler</div>;
                }

                const søknadsperiode: DateRange = {
                    from: ISODateToDate(apiValues.fraOgMed),
                    to: ISODateToDate(apiValues.tilOgMed),
                };

                const apiValuesValidationErrors = validateApiValues(apiValues, values, appIntl);

                const { medlemskap, nattevåk, beredskap } = apiValues;

                return (
                    <SøknadFormStep
                        stepId={StepID.SUMMARY}
                        onValidFormSubmit={() => {
                            if (apiValuesValidationErrors === undefined) {
                                setTimeout(() => {
                                    /** La view oppdatere seg først */
                                    sendSoknad(apiValues, søkerdata, harArbeidMenIngenFravær);
                                });
                            } else {
                                document.getElementsByClassName('validationErrorSummary');
                            }
                        }}
                        useValidationErrorSummary={false}
                        showSubmitButton={apiValuesValidationErrors === undefined}
                        isFinalSubmit={true}
                        buttonDisabled={sendingInProgress}
                        showButtonSpinner={sendingInProgress}>
                        <VStack gap="8">
                            <SifGuidePanel>
                                <p>
                                    <AppText id="steg.oppsummering.info" />
                                </p>
                            </SifGuidePanel>

                            {apiValuesValidationErrors && apiValuesValidationErrors.length > 0 && (
                                <FormBlock>
                                    <ApiValidationSummary
                                        errors={apiValuesValidationErrors}
                                        søknadStepConfig={søknadStepConfig}
                                    />
                                </FormBlock>
                            )}

                            <SøkerSummary søker={søkerdata.søker} />
                            <BarnSummary
                                barn={barn}
                                formValues={values}
                                apiValues={apiValues}
                                onEdit={() => {
                                    navigate(søknadStepConfig[StepID.OPPLYSNINGER_OM_BARNET].route);
                                }}
                            />
                            <PeriodeSummary
                                apiValues={apiValues}
                                søknadsperiode={søknadsperiode}
                                onEdit={() => {
                                    navigate(søknadStepConfig[StepID.TIDSROM].route);
                                }}
                            />
                            <ArbeidssituasjonSummary
                                apiValues={apiValues}
                                søknadsperiode={søknadsperiode}
                                frilansoppdrag={values.frilansoppdrag}
                                onEdit={() => {
                                    navigate(søknadStepConfig[StepID.ARBEIDSSITUASJON].route);
                                }}
                            />

                            <ArbeidIPeriodenSummary
                                apiValues={apiValues}
                                søknadsperiode={søknadsperiode}
                                søknadsdato={søknadsdato}
                                onEdit={() => {
                                    navigate(søknadStepConfig[StepID.ARBEIDSTID].route);
                                }}
                            />

                            <OmsorgstilbudSummary
                                søknadsperiode={søknadsperiode}
                                apiValues={apiValues}
                                onEdit={() => {
                                    navigate(søknadStepConfig[StepID.OMSORGSTILBUD].route);
                                }}
                            />

                            {nattevåk && beredskap && (
                                <NattevågOgBeredskapSummary
                                    nattevåk={nattevåk}
                                    beredskap={beredskap}
                                    onEdit={() => {
                                        navigate(søknadStepConfig[StepID.NATTEVÅK_OG_BEREDSKAP].route);
                                    }}
                                />
                            )}

                            <MedlemskapSummary
                                medlemskap={medlemskap}
                                onEdit={() => {
                                    navigate(søknadStepConfig[StepID.MEDLEMSKAP].route);
                                }}
                            />

                            <LegeerklæringSummary
                                onEdit={() => {
                                    navigate(søknadStepConfig[StepID.LEGEERKLÆRING].route);
                                }}
                            />

                            <SøknadFormComponents.ConfirmationCheckbox
                                label={text('steg.oppsummering.bekrefterOpplysninger')}
                                name={SøknadFormField.harBekreftetOpplysninger}
                                validate={getCheckedValidator()}
                            />
                        </VStack>

                        <div aria-live="polite">
                            {invalidParameters && <InnsendingFeiletInformasjon invalidParameter={invalidParameters} />}
                        </div>
                    </SøknadFormStep>
                );
            }}
        </SøkerdataContextConsumer>
    );
};

export default OppsummeringStep;
