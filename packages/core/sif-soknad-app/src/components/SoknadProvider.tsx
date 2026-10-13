import {
    hentYtelseMellomlagring,
    MellomlagringYtelse,
    oppdaterYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '@sif/api/k9-prosessering';
import { createGrunnlagHash } from '@sif/utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { SøknadStepFormProvider } from '../consistency/SøknadStepFormContext';
import { SøknadAppContext, SøknadAppContextValue } from '../context/SøknadAppContext';
import { createSøknadAppStore } from '../store/createSøknadAppStore';
import { MellomlagringBlob, SøknadProviderProps } from '../types';
import { buildStepPath, KVITTERING_PATH } from '../utils/routeUtils';
const isMellomlagringBlob = (value: unknown): value is MellomlagringBlob => {
    if (typeof value !== 'object' || value === null) return false;
    const v = value as Record<string, unknown>;
    return (
        typeof v['versjon'] === 'number' &&
        typeof v['resumeStepId'] === 'string' &&
        typeof v['søknadsdata'] === 'object' &&
        v['søknadsdata'] !== null
    );
};

const DEFAULT_RESUME_LATER_URL = 'https://www.nav.no/minside';

/**
 * Hoved-inngangskomponent for søknadsrammeverket.
 *
 * Setter opp Zustand-store og kontekst for hookene, henter og validerer
 * mellomlagring ved mount, og eier kvitteringsruten.
 *
 * Children (appens <Routes>) vises først når initialiseringen er ferdig, slik at
 * velkomstsiden ikke blinker før en eventuell resume-navigering.
 *
 * Se README for navigasjonsansvar og oppsett i app.
 */
export const SøknadProvider = ({
    config,
    stepOrder,
    ytelse,
    versjon,
    applicationTitle,
    basePath = '/soknad',
    validateMellomlagring,
    mellomlagringGrunnlag,
    resumeLaterUrl = DEFAULT_RESUME_LATER_URL,
    loadingElement,
    kvitteringElement,
    formValuesToSøknadsdata,
    children,
}: SøknadProviderProps) => {
    // Én stabil store-instans per SøknadProvider-mount
    const storeRef = useRef<ReturnType<typeof createSøknadAppStore>>(null);
    if (!storeRef.current) {
        storeRef.current = createSøknadAppStore({ config, stepOrder });
    }
    const store = storeRef.current;
    // Grunnlaget er lastet før mount og endres ikke i økten — hashes én gang
    const grunnlagHashRef = useRef<Promise<string | undefined>>(null);
    if (!grunnlagHashRef.current) {
        grunnlagHashRef.current = mellomlagringGrunnlag
            ? createGrunnlagHash(mellomlagringGrunnlag)
            : Promise.resolve(undefined);
    }
    const søknadSendt = store((s) => s.søknadSendt);
    const isInitialized = store((s) => s.isInitialized);
    const resumeStepId = store((s) => s.resumeStepId);
    const navigate = useNavigate();
    const location = useLocation();

    // Etter mellomlagring-henting ved mount — send bruker til gjenopptakingspunktet.
    useEffect(() => {
        let cancelled = false;

        const initFromMellomlagring = async () => {
            let blob: MellomlagringBlob | null = null;
            try {
                const payload = await hentYtelseMellomlagring(ytelse as MellomlagringYtelse);
                if (payload && Object.keys(payload).length > 0 && isMellomlagringBlob(payload)) {
                    if (payload.versjon !== versjon) {
                        blob = null;
                    } else if (!stepOrder.includes(payload.resumeStepId)) {
                        blob = null;
                    } else if (payload.grunnlagHash !== (await grunnlagHashRef.current)) {
                        blob = null;
                        void slettYtelseMellomlagring(ytelse as MellomlagringYtelse).catch(() => {});
                    } else {
                        blob = validateMellomlagring ? validateMellomlagring(payload) : payload;
                    }
                }
            } catch {
                blob = null;
            }

            if (!cancelled) {
                store.getState().init(blob);
                if (blob !== null) {
                    const route = config[blob.resumeStepId]?.route;
                    if (route) {
                        navigate(buildStepPath(basePath, route), { replace: true });
                    }
                }
            }
        };

        initFromMellomlagring();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isInitialized || !resumeStepId || location.pathname !== '/') {
            return;
        }

        const route = config[resumeStepId]?.route;
        if (route) {
            navigate(buildStepPath(basePath, route), { replace: true });
        }
    }, [isInitialized, resumeStepId, location.pathname, config, basePath, navigate]);

    // Synker URL mot søknadSendt, slik at kallstedet slipper å navigere selv.
    useEffect(() => {
        if (søknadSendt && location.pathname !== KVITTERING_PATH) {
            navigate(KVITTERING_PATH, { replace: true });
        }
    }, [søknadSendt, location.pathname, navigate]);

    const lagreMellomlagring = useCallback(
        async (blobData: MellomlagringBlob): Promise<void> => {
            const grunnlagHash = await grunnlagHashRef.current;
            await oppdaterYtelseMellomlagring(
                ytelse as MellomlagringYtelse,
                {
                    ...blobData,
                    grunnlagHash,
                } as unknown as Record<string, unknown>,
            ).catch(() => {});
        },
        [ytelse],
    );

    const slettMellomlagring = useCallback(async () => {
        await slettYtelseMellomlagring(ytelse as MellomlagringYtelse).catch(() => {});
    }, [ytelse]);

    const contextValue = useMemo<SøknadAppContextValue>(
        () => ({
            store,
            config,
            stepOrder,
            versjon,
            basePath,
            applicationTitle,
            resumeLaterUrl,
            lagreMellomlagring,
            slettMellomlagring,
            formValuesToSøknadsdata,
        }),
        [
            store,
            config,
            stepOrder,
            versjon,
            basePath,
            applicationTitle,
            resumeLaterUrl,
            lagreMellomlagring,
            slettMellomlagring,
            formValuesToSøknadsdata,
        ],
    );

    // URL-en avgjør hva som vises; søknadSendt avgjør kun om kvitteringen er tilgjengelig.
    const renderContent = () => {
        if (!isInitialized) {
            return loadingElement || null;
        }
        if (location.pathname !== KVITTERING_PATH) {
            return children;
        }
        return søknadSendt ? kvitteringElement : <Navigate to="/" replace />;
    };

    return (
        <SøknadStepFormProvider>
            <SøknadAppContext.Provider value={contextValue}>{renderContent()}</SøknadAppContext.Provider>
        </SøknadStepFormProvider>
    );
};
