import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { PleiepengerSyktBarnApp } from '@navikt/sif-app-register';

import { useFormikContext } from 'formik';
import { purge } from '../api/api';
import BekreftDialog from '../components/bekreft-dialog/BekreftDialog';
import RouteConfig from '../config/routeConfig';
import useLogSøknadInfo from '../hooks/useLogSøknadInfo';
import usePersistSoknad from '../hooks/usePersistSoknad';
import ConfirmationPage from '../pages/confirmation-page/ConfirmationPage';
import VelkommenPage from '../pages/velkommen-page/VelkommenPage';
import { Søker } from '../types';
import { ConfirmationDialog } from '../types/ConfirmationDialog';
import { KvitteringInfo } from '../types/KvitteringInfo';
import { StepID } from '../types/StepID';
import { Søkerdata } from '../types/Søkerdata';
import { SøknadApiData } from '../types/søknad-api-data/SøknadApiData';
import { initialValues, SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { MellomlagringMetadata } from '../types/SøknadTempStorageData';
import { harFraværFraJobb } from '../utils/arbeidUtils';
import { cleanupAndSetFormikValues } from '../utils/cleanupAndSetFormikValues';
import { extractSøknadsdataFromFormValues } from '../utils/formValuesToSøknadsdata/extractSøknadsdataFromFormValues';
import { getSøknadsperiodeFromFormValues } from '../utils/formValuesUtils';
import { getKvitteringInfoFromApiData } from '../utils/kvitteringUtils';
import { relocateToSoknad } from '../utils/navigationUtils';
import { getNextStepRoute, isAvailable } from '../utils/routeUtils';
import { getGyldigRedirectStepForMellomlagretSøknad } from '../utils/stepUtils';
import ArbeidssituasjonStep from './arbeidssituasjon-step/ArbeidssituasjonStep';
import ArbeidstidStep from './arbeidstid-step/ArbeidstidStep';
import { getIngenFraværConfirmationDialog } from './confirmation-dialogs/ingenFraværConfirmation';
import LegeerklæringStep from './legeerklæring-step/LegeerklæringStep';
import MedlemsskapStep from './medlemskap-step/MedlemsskapStep';
import NattevåkOgBeredskapStep from './nattevåk-og-beredskap-step/NattevåkOgBeredskapStep';
import OmsorgstilbudStep from './omsorgstilbud-step/OmsorgstilbudStep';
import OpplysningerOmBarnetStep from './opplysninger-om-barnet-step/OpplysningerOmBarnetStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import { useSøknadsdataContext } from './SøknadsdataContext';
import TidsromStep from './tidsrom-step/TidsromStep';
import { getSøknadStepConfig } from './søknadStepConfig';
import { getDateToday } from '@navikt/sif-common-utils';

interface PleiepengesøknadContentProps {
    /** Sist steg som bruker submittet skjema */
    mellomlagringMetadata?: MellomlagringMetadata;
    søker: Søker;
}

const SøknadContent = ({ mellomlagringMetadata, søker }: PleiepengesøknadContentProps) => {
    const location = useLocation();
    const [søknadHasBeenSent, setSøknadHasBeenSent] = React.useState(false);
    const [kvitteringInfo, setKvitteringInfo] = React.useState<KvitteringInfo | undefined>(undefined);

    const [confirmationDialog, setConfirmationDialog] = useState<ConfirmationDialog | undefined>(undefined);
    const { values, setValues, resetForm } = useFormikContext<SøknadFormValues>();
    const { logHendelse, logSoknadStartet } = useAmplitudeInstance();
    const { setSøknadsdata } = useSøknadsdataContext();
    const { logBekreftIngenFraværFraJobb } = useLogSøknadInfo();
    const { persistSoknad } = usePersistSoknad();
    const { søknadsdata } = useSøknadsdataContext();

    const navigate = useNavigate();

    const sendUserToStep = useCallback(
        async (step: StepID) => {
            await logHendelse(ApplikasjonHendelse.starterMedMellomlagring, { step });
            const stepConfig = getSøknadStepConfig(values);
            navigate(stepConfig[step].route);
        },
        [logHendelse, navigate, values],
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
            if (isOnWelcomPage && nextStepRoute !== undefined && mellomlagringMetadata.lastStepID) {
                sendUserToStep(getGyldigRedirectStepForMellomlagretSøknad(mellomlagringMetadata.lastStepID, values));
            }
            if (isOnWelcomPage && nextStepRoute === undefined && !søknadHasBeenSent) {
                sendUserToStep(StepID.OPPLYSNINGER_OM_BARNET);
            }
        }
    }, [mellomlagringMetadata, isOnWelcomPage, nextStepRoute, sendUserToStep, values, søknadHasBeenSent]);

    const onKvitteringUnmount = () => {
        setTimeout(() => {
            resetForm({ values: initialValues, submitCount: 0 });
            if (!isOnWelcomPage) {
                relocateToSoknad();
            }
        });
    };

    const navigateToNextStepFrom = async (stepId: StepID, formValues: SøknadFormValues) => {
        setTimeout(() => {
            const nextStepRoute = getNextStepRoute(stepId, formValues);
            if (nextStepRoute) {
                persistSoknad({ formValues, stepID: stepId }).then(() => {
                    navigate(nextStepRoute);
                });
            }
        });
    };

    const startSoknad = async () => {
        await logSoknadStartet(PleiepengerSyktBarnApp.navn);
        await purge();

        await persistSoknad({ formValues: undefined, stepID: StepID.OPPLYSNINGER_OM_BARNET });
        setValues({ ...initialValues, harForståttRettigheterOgPlikter: true });

        setTimeout(() => {
            setSøknadsdata(extractSøknadsdataFromFormValues({ ...values, harForståttRettigheterOgPlikter: true }));
            navigate(`${RouteConfig.SØKNAD_ROUTE_PREFIX}/${StepID.OPPLYSNINGER_OM_BARNET}`);
        });
    };

    const søknadsperiode = values ? getSøknadsperiodeFromFormValues(values) : undefined;
    const søknadsdato = getDateToday();

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
                <Route path={'velkommen'} element={<VelkommenPage onValidSubmit={startSoknad} søker={søker} />} />

                {isAvailable(StepID.OPPLYSNINGER_OM_BARNET, values) && (
                    <Route
                        path={StepID.OPPLYSNINGER_OM_BARNET}
                        element={
                            <OpplysningerOmBarnetStep
                                onValidSubmit={() => {
                                    setTimeout(() => {
                                        setSøknadsdata(extractSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.OPPLYSNINGER_OM_BARNET, values);
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
                                onValidSubmit={async () => {
                                    const cleanedValues = await cleanupAndSetFormikValues(
                                        StepID.TIDSROM,
                                        values,
                                        søknadsdata,
                                        setValues,
                                    );
                                    setSøknadsdata(extractSøknadsdataFromFormValues(cleanedValues));
                                    navigateToNextStepFrom(StepID.TIDSROM, cleanedValues);
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
                                onValidSubmit={async () => {
                                    const cleanedValues = await cleanupAndSetFormikValues(
                                        StepID.ARBEIDSSITUASJON,
                                        values,
                                        søknadsdata,
                                        setValues,
                                    );
                                    setSøknadsdata(extractSøknadsdataFromFormValues(cleanedValues));
                                    navigateToNextStepFrom(StepID.ARBEIDSSITUASJON, cleanedValues);
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
                                onValidSubmit={async () => {
                                    const cleanedValues = await cleanupAndSetFormikValues(
                                        StepID.ARBEIDSTID,
                                        values,
                                        søknadsdata,
                                        setValues,
                                    );
                                    const nySøknadsdata = extractSøknadsdataFromFormValues(cleanedValues);
                                    setSøknadsdata(nySøknadsdata);
                                    if (!harFraværFraJobb(nySøknadsdata.arbeidstidIPerioden)) {
                                        setConfirmationDialog(
                                            getIngenFraværConfirmationDialog({
                                                onCancel: () => {
                                                    logBekreftIngenFraværFraJobb(false);
                                                    setConfirmationDialog(undefined);
                                                },
                                                onConfirm: () => {
                                                    logBekreftIngenFraværFraJobb(true);
                                                    setConfirmationDialog(undefined);
                                                    navigateToNextStepFrom(StepID.ARBEIDSTID, cleanedValues);
                                                },
                                            }),
                                        );
                                    } else {
                                        navigateToNextStepFrom(StepID.ARBEIDSTID, cleanedValues);
                                    }
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
                                onValidSubmit={async () => {
                                    const cleanedValues = await cleanupAndSetFormikValues(
                                        StepID.OMSORGSTILBUD,
                                        values,
                                        søknadsdata,
                                        setValues,
                                    );
                                    setSøknadsdata(extractSøknadsdataFromFormValues(cleanedValues));
                                    navigateToNextStepFrom(StepID.OMSORGSTILBUD, cleanedValues);
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
                                onValidSubmit={async () => {
                                    const cleanedValues = await cleanupAndSetFormikValues(
                                        StepID.OMSORGSTILBUD,
                                        values,
                                        søknadsdata,
                                        setValues,
                                    );
                                    setSøknadsdata(extractSøknadsdataFromFormValues(cleanedValues));
                                    navigateToNextStepFrom(StepID.NATTEVÅK_OG_BEREDSKAP, cleanedValues);
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
                                        setSøknadsdata(extractSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.MEDLEMSKAP, values);
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
                                        setSøknadsdata(extractSøknadsdataFromFormValues(values));
                                        navigateToNextStepFrom(StepID.LEGEERKLÆRING, values);
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
                                    navigate(RouteConfig.SØKNAD_SENDT_ROUTE);
                                }}
                            />
                        }
                    />
                )}

                {isAvailable(RouteConfig.SØKNAD_SENDT_ROUTE, values, søknadHasBeenSent) && (
                    <Route
                        path={'soknad-sendt'}
                        element={<ConfirmationPage kvitteringInfo={kvitteringInfo} onUnmount={onKvitteringUnmount} />}
                    />
                )}

                <Route path="*" element={<Navigate to={'/soknad/velkommen'} replace={true} />} />
            </Routes>
        </>
    );
};

export default SøknadContent;
