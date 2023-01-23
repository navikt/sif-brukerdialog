import { Button } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { useMellomlagring } from '../hooks/useMellomlagring';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
import KvitteringPage from '../pages/kvittering/KvitteringPage';
import VelgSakPage from '../pages/velg-sak/VelgSakPage';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { StepId } from './config/StepId';
import { SøknadRoutes, SøknadStepRoute } from './config/SøknadRoutes';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import AktivitetStep from './steps/aktivitet/AktivitetStep';
import ArbeidstidStep from './steps/arbeidstid/ArbeidstidStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { endringsmeldingSendt, søknadsdata, søknadRoute, k9saker, sak },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);
    const [shouldResetSøknad, setShouldResetSøknad] = useState(false);
    const { slettMellomlagring } = useMellomlagring();

    usePersistSøknadState();

    useEffect(() => {
        if (søknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(søknadRoute);
        }
        if (pathname === SøknadRoutes.VELKOMMEN && søknadRoute) {
            navigateTo(søknadRoute); // Send til side dersom bruker kommer til velkommen via annen navigasjon
        }
    }, [navigateTo, pathname, søknadRoute, isFirstTimeLoadingApp]);

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            setShouldResetSøknad(false);
            navigateTo(SøknadRoutes.VELKOMMEN);
        }
    }, [shouldResetSøknad, navigateTo, dispatch]);

    if (endringsmeldingSendt && pathname !== SøknadRoutes.SØKNAD_SENDT && !shouldResetSøknad) {
        setShouldResetSøknad(true);
    }

    if (!sak && k9saker.length > 1) {
        return <VelgSakPage />;
    }

    if (søknadsdata.harForståttRettigheterOgPlikter === false) {
        return (
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path="*" element={<Navigate to={StepId.VELKOMMEN} replace={true} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route index element={<VelkommenPage />} />
            <Route path={SøknadStepRoute[StepId.VELKOMMEN]} element={<VelkommenPage />} />
            <Route path={SøknadStepRoute[StepId.AKTIVITET]} element={<AktivitetStep />} />
            <Route path={SøknadStepRoute[StepId.ARBEIDSTID]} element={<ArbeidstidStep />} />
            <Route path={SøknadStepRoute[StepId.OPPSUMMERING]} element={<OppsummeringStep />} />
            <Route path={SøknadStepRoute[StepId.MELDING_SENDT]} element={<KvitteringPage />} />
            <Route
                path="*"
                element={
                    <>
                        Ukjent steg: {pathname}.
                        <FormBlock>
                            <Button
                                type="button"
                                onClick={() => {
                                    slettMellomlagring().then(() => {
                                        dispatch(actionsCreator.resetSøknad());
                                        navigateTo(SøknadRoutes.VELKOMMEN);
                                    });
                                }}>
                                Reset søknad
                            </Button>
                        </FormBlock>
                    </>
                }
            />
        </Routes>
    );
};

export default SøknadRouter;
