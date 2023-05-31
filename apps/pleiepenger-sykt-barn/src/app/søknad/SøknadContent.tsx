import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ApiError, ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import apiUtils from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { dateToday } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { purge } from '../api/api';
import { SKJEMANAVN } from '../App';
import RouteConfig from '../config/routeConfig';
import useLogSøknadInfo from '../hooks/useLogSøknadInfo';
import usePersistSoknad from '../hooks/usePersistSoknad';
import ConfirmationPage from '../pages/confirmation-page/ConfirmationPage';
import WelcomingPage from '../pages/welcoming-page/WelcomingPage';
import { Søker } from '../types';
import { ConfirmationDialog } from '../types/ConfirmationDialog';
import { ImportertSøknad } from '../types/ImportertSøknad';
import { KvitteringInfo } from '../types/KvitteringInfo';
import { Søkerdata } from '../types/Søkerdata';
import { SøknadApiData } from '../types/søknad-api-data/SøknadApiData';
import { SøknadFormValues } from '../types/SøknadFormValues';
import { MellomlagringMetadata } from '../types/SøknadTempStorageData';
import { getSøknadsperiodeFromFormData } from '../utils/formDataUtils';
import { getSøknadsdataFromFormValues } from '../utils/formValuesToSøknadsdata/getSøknadsdataFromFormValues';
import { getKvitteringInfoFromApiData } from '../utils/kvitteringUtils';
import { navigateTo, navigateToErrorPage, relocateToLoginPage } from '../utils/navigationUtils';
import { getNextStepRoute, isAvailable } from '../utils/routeUtils';
import { getGyldigRedirectStepForMellomlagretSøknad } from '../utils/stepUtils';
import ArbeidssituasjonStep from './arbeidssituasjon-step/ArbeidssituasjonStep';
import ArbeidstidStep from './arbeidstid-step/components/ArbeidstidStep';
import { getArbeidsforhold, harFraværFraJobb } from './arbeidstid-step/utils/arbeidstidUtils';
import { getIngenFraværConfirmationDialog } from './confirmation-dialogs/ingenFraværConfirmation';
import LegeerklæringStep from './legeerklæring-step/LegeerklæringStep';
import MedlemsskapStep from './medlemskap-step/MedlemsskapStep';
import NattevåkOgBeredskapStep from './nattevåk-og-beredskap-step/NattevåkOgBeredskapStep';
import OmsorgstilbudStep from './omsorgstilbud-step/OmsorgstilbudStep';
import OpplysningerOmBarnetStep from './opplysninger-om-barnet-step/OpplysningerOmBarnetStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import { useSøknadsdataContext } from './SøknadsdataContext';
import { StepID } from './søknadStepsConfig';
import TidsromStep from './tidsrom-step/TidsromStep';
import BekreftDialog from '../components/bekreft-dialog/BekreftDialog';

interface PleiepengesøknadContentProps {
    /** Sist steg som bruker submittet skjema */
    mellomlagringMetadata?: MellomlagringMetadata;
    /** Forrige søknad sendt inn av bruker */
    forrigeSøknad: ImportertSøknad | undefined;
    søker: Søker;
    onSøknadSent: () => void;
    onSøknadStart: () => void;
}

const SøknadContent = ({
    mellomlagringMetadata,
    forrigeSøknad,
    søker,
    onSøknadSent,
    onSøknadStart,
}: PleiepengesøknadContentProps) => {
    const location = useLocation();
    const [søknadHasBeenSent, setSøknadHasBeenSent] = React.useState(false);
    const [kvitteringInfo, setKvitteringInfo] = React.useState<KvitteringInfo | undefined>(undefined);
    const [confirmationDialog, setConfirmationDialog] = useState<ConfirmationDialog | undefined>(undefined);
    const { values, setValues } = useFormikContext<SøknadFormValues>();
    const { logHendelse, logUserLoggedOut, logSoknadStartet, logApiError } = useAmplitudeInstance();
    const { setSøknadsdata, setImportertSøknadMetadata } = useSøknadsdataContext();
    const { logBekreftIngenFraværFraJobb } = useLogSøknadInfo();
    const { persistSoknad } = usePersistSoknad();

    const navigate = useNavigate();

    const sendUserToStep = useCallback(
        async (step: StepID) => {
            await logHendelse(ApplikasjonHendelse.starterMedMellomlagring, { step });
            navigateTo(step, navigate);
        },
        [logHendelse, navigate]
    );

    const isOnWelcomPage = location.pathname === RouteConfig.WELCOMING_PAGE_ROUTE;

    const nextStepRoute = søknadHasBeenSent
        ? undefined
        : mellomlagringMetadata?.lastStepID
        ? getNextStepRoute(mellomlagringMetadata.lastStepID, values)
        : undefined;

    /** Redirect til riktig side */
    useEffect(() => {
        if (mellomlagringMetadata !== undefined) {
            if (mellomlagringMetadata.importertSøknadMetadata !== undefined) {
                setImportertSøknadMetadata(mellomlagringMetadata?.importertSøknadMetadata);
            }
            if (isOnWelcomPage && nextStepRoute !== undefined && mellomlagringMetadata.lastStepID) {
                sendUserToStep(getGyldigRedirectStepForMellomlagretSøknad(mellomlagringMetadata.lastStepID, values));
            }
            if (isOnWelcomPage && nextStepRoute === undefined && !søknadHasBeenSent) {
                sendUserToStep(StepID.OPPLYSNINGER_OM_BARNET);
            }
        }
    }, [
        mellomlagringMetadata,
        isOnWelcomPage,
        nextStepRoute,
        sendUserToStep,
        setImportertSøknadMetadata,
        values,
        søknadHasBeenSent,
    ]);

    const userNotLoggedIn = async () => {
        await logUserLoggedOut('Mellomlagring ved navigasjon');
        relocateToLoginPage();
    };

    const navigateToNextStepFrom = async (stepID: StepID) => {
        setTimeout(() => {
            const nextStepRoute = getNextStepRoute(stepID, values);
            if (nextStepRoute) {
                persistSoknad({ formValues: values, stepID })
                    .then(() => {
                        navigateTo(nextStepRoute, navigate);
                    })
                    .catch((error) => {
                        if (apiUtils.isUnauthorized(error)) {
                            userNotLoggedIn();
                        } else {
                            logApiError(ApiError.mellomlagring, { stepId: stepID });
                            return navigateToErrorPage(navigate);
                        }
                    });
            }
        });
    };

    const startSoknad = async () => {
        onSøknadStart();
        await logSoknadStartet(SKJEMANAVN);
        await purge();

        const initialFormValues =
            forrigeSøknad && values.brukForrigeSøknad === YesOrNo.YES
                ? { ...forrigeSøknad?.formValues, brukForrigeSøknad: YesOrNo.YES }
                : undefined;

        if (forrigeSøknad && values.brukForrigeSøknad === YesOrNo.YES) {
            setImportertSøknadMetadata(forrigeSøknad?.metaData);
        }

        if (initialFormValues) {
            setValues(initialFormValues);
        }
        await persistSoknad({ formValues: initialFormValues, stepID: StepID.OPPLYSNINGER_OM_BARNET });

        setTimeout(() => {
            setSøknadsdata(getSøknadsdataFromFormValues(initialFormValues || values));
            navigateTo(`${RouteConfig.SØKNAD_ROUTE_PREFIX}/${StepID.OPPLYSNINGER_OM_BARNET}`, navigate);
        });
    };

    const søknadsperiode = values ? getSøknadsperiodeFromFormData(values) : undefined;
    const søknadsdato = dateToday;

    return (
        <>
            {confirmationDialog && (
                <BekreftDialog
                    open={true}
                    bekreftLabel={confirmationDialog.okLabel}
                    avbrytLabel={confirmationDialog.cancelLabel}
                    onBekreft={confirmationDialog.onConfirm}
                    onAvbryt={confirmationDialog.onCancel}
                    onClose={confirmationDialog.onCancel}
                    tittel={confirmationDialog.title}>
                    {confirmationDialog.content}
                </BekreftDialog>
            )}
            <Routes>
                <Route path={'/'} element={<Navigate to={RouteConfig.WELCOMING_PAGE_ROUTE} />} />
                <Route path={'velkommen'} element={<WelcomingPage onValidSubmit={startSoknad} søker={søker} />} />

                {isAvailable(StepID.OPPLYSNINGER_OM_BARNET, values) && (
                    <Route
                        path={StepID.OPPLYSNINGER_OM_BARNET}
                        element={
                            <OpplysningerOmBarnetStep
                                onValidSubmit={() => {
                                    setTimeout(() => {
                                        setSøknadsdata(getSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.OPPLYSNINGER_OM_BARNET);
                                    });
                                }}
                            />
                        }
                    />
                )}

                {isAvailable(StepID.TIDSROM, values) && (
                    <Route
                        path={StepID.TIDSROM}
                        element={
                            <TidsromStep
                                onValidSubmit={() => {
                                    setTimeout(() => {
                                        setSøknadsdata(getSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.TIDSROM);
                                    });
                                }}
                            />
                        }
                    />
                )}

                {isAvailable(StepID.ARBEIDSSITUASJON, values) && søknadsperiode && (
                    <Route
                        path={StepID.ARBEIDSSITUASJON}
                        element={
                            <ArbeidssituasjonStep
                                onValidSubmit={() => {
                                    setTimeout(() => {
                                        setSøknadsdata(getSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.ARBEIDSSITUASJON);
                                    });
                                }}
                                søknadsdato={søknadsdato}
                                søknadsperiode={søknadsperiode}
                            />
                        }
                    />
                )}

                {isAvailable(StepID.ARBEIDSTID, values) && søknadsperiode && (
                    <Route
                        path={StepID.ARBEIDSTID}
                        element={
                            <ArbeidstidStep
                                periode={søknadsperiode}
                                onValidSubmit={() => {
                                    setTimeout(() => {
                                        const søknadsdata = getSøknadsdataFromFormValues(values);
                                        setSøknadsdata(søknadsdata);
                                        if (
                                            søknadsdata.arbeid &&
                                            harFraværFraJobb(getArbeidsforhold(søknadsdata.arbeid)) === false
                                        ) {
                                            setConfirmationDialog(
                                                getIngenFraværConfirmationDialog({
                                                    onCancel: () => {
                                                        logBekreftIngenFraværFraJobb(false);
                                                        setConfirmationDialog(undefined);
                                                    },
                                                    onConfirm: () => {
                                                        logBekreftIngenFraværFraJobb(true);
                                                        setConfirmationDialog(undefined);
                                                        navigateToNextStepFrom(StepID.ARBEIDSTID);
                                                    },
                                                })
                                            );
                                        } else {
                                            navigateToNextStepFrom(StepID.ARBEIDSTID);
                                        }
                                    });
                                }}
                            />
                        }
                    />
                )}

                {isAvailable(StepID.OMSORGSTILBUD, values) && søknadsperiode && (
                    <Route
                        path={StepID.OMSORGSTILBUD}
                        element={
                            <OmsorgstilbudStep
                                onValidSubmit={() => {
                                    setTimeout(() => {
                                        setSøknadsdata(getSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.OMSORGSTILBUD);
                                    });
                                }}
                                søknadsperiode={søknadsperiode}
                            />
                        }
                    />
                )}

                {isAvailable(StepID.NATTEVÅK_OG_BEREDSKAP, values) && søknadsperiode && (
                    <Route
                        path={StepID.NATTEVÅK_OG_BEREDSKAP}
                        element={
                            <NattevåkOgBeredskapStep
                                onValidSubmit={() => {
                                    setTimeout(() => {
                                        setSøknadsdata(getSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.NATTEVÅK_OG_BEREDSKAP);
                                    });
                                }}
                            />
                        }
                    />
                )}

                {isAvailable(StepID.MEDLEMSKAP, values) && (
                    <Route
                        path={StepID.MEDLEMSKAP}
                        element={
                            <MedlemsskapStep
                                onValidSubmit={() => {
                                    setTimeout(() => {
                                        setSøknadsdata(getSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.MEDLEMSKAP);
                                    });
                                }}
                                søknadsdato={søknadsdato}
                            />
                        }
                    />
                )}

                {isAvailable(StepID.LEGEERKLÆRING, values) && (
                    <Route
                        path={StepID.LEGEERKLÆRING}
                        element={
                            <LegeerklæringStep
                                onValidSubmit={() => {
                                    setTimeout(() => {
                                        setSøknadsdata(getSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.LEGEERKLÆRING);
                                    });
                                }}
                            />
                        }
                    />
                )}

                {isAvailable(StepID.SUMMARY, values) && søknadsperiode && (
                    <Route
                        path={StepID.SUMMARY}
                        element={
                            <OppsummeringStep
                                values={values}
                                søknadsdato={søknadsdato}
                                onApplicationSent={(apiData: SøknadApiData, søkerdata: Søkerdata) => {
                                    setKvitteringInfo(getKvitteringInfoFromApiData(apiData, søkerdata));
                                    setSøknadHasBeenSent(true);
                                    onSøknadSent();
                                    navigateTo(RouteConfig.SØKNAD_SENDT_ROUTE, navigate);
                                }}
                            />
                        }
                    />
                )}

                {isAvailable(RouteConfig.SØKNAD_SENDT_ROUTE, values, søknadHasBeenSent) && (
                    <Route path={'soknad-sendt'} element={<ConfirmationPage kvitteringInfo={kvitteringInfo} />} />
                )}

                <Route path="*" element={<Navigate to={'/soknad/velkommen'} replace={true} />} />
            </Routes>
        </>
    );
};

export default SøknadContent;
