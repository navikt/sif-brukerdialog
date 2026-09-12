import {
    hentYtelseMellomlagring,
    MellomlagringYtelse,
    oppdaterYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '@sif/api/k9-prosessering';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { SøknadStepFormProvider } from '../consistency/SøknadStepFormContext';
import { SøknadAppContext, SøknadAppContextValue } from '../context/SøknadAppContext';
import { createSøknadAppStore } from '../store/createSøknadAppStore';
import { MellomlagringBlob, SøknadRouterProps } from '../types';
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
 * Fungerer som en ren kontekst-provider: setter opp Zustand-store,
 * henter og validerer mellomlagring ved mount, og eksponerer kontekst
 * for useStepData, useAvbryt, useSøknadSendt, useStartSøknad og useStepNavigation.
 *
 * Venter på mellomlagring-henting uten å rendre children (unngår blinking).
 * Dersom gyldig mellomlagring finnes, navigeres bruker automatisk til
 * gjenopptakingspunktet. Uten mellomlagring vises children (velkommensiden).
 *
 * Etter vellykket innsending synkes URL-en til `KVITTERING_PATH`, og routeren viser
 * `kvitteringElement` i stedet for children. Kvitteringsruten eies av rammeverket,
 * ikke av appen, og kan ikke åpnes via direkte URL uten innsendt søknad.
 *
 * ---
 * ## Navigasjonsansvar i rammeverket
 *
 * Navigasjon er fordelt etter hvem som eier beslutningen:
 *
 * | Beslutning                        | Eier                          |
 * |-----------------------------------|-------------------------------|
 * | Resume fra mellomlagring ved mount| SøknadRouter (useEffect nedenfor) |
 * | Start søknad → første steg        | useStartSøknad                |
 * | Neste steg etter submit           | useStepData.commit            |
 * | Forrige steg / hopp til steg      | useStepNavigation             |
 * | Klikk i progress-stepper         | SøknadStep.onStepSelect       |
 * | Avbryt → forsiden                 | SøknadStep.onAbort            |
 * | Fortsett senere                   | SøknadStep.onResumeLater      |
 * | Kvittering etter innsending       | SøknadRouter (useEffect nedenfor) |
 * | URL-guard / redirect              | StepRouteGuard (passive)      |
 *
 * Appen er ansvarlig for <Routes>-oppsett for velkomstside og steg. Bruk
 * <SøknadStepGuard> for å beskytte steg-rutene. Kvitteringsruten settes opp
 * av routeren via kvitteringElement.
 *
 * Bruk i app (eksempel):
 * ```tsx
 * // Soknad.tsx:
 * <SøknadRouter
 *   config={...} stepOrder={...} ytelse="aktivitetspenger" versjon={1}
 *   applicationTitle="..."
 *   kvitteringElement={<KvitteringPage />}>
 *   <Routes>
 *     <Route path="/" element={<VelkommenPage />} />
 *     <Route path="/soknad" element={<SøknadStepGuard />}>
 *       <Route path="startdato" element={<StartdatoForm />} />
 *     </Route>
 *   </Routes>
 * </SøknadRouter>
 * ```
 */
export const SøknadRouter = ({
    config,
    stepOrder,
    ytelse,
    versjon,
    applicationTitle,
    basePath = '/soknad',
    validateMellomlagring,
    resumeLaterUrl = DEFAULT_RESUME_LATER_URL,
    loadingElement,
    kvitteringElement,
    formValuesToSøknadsdata,
    children,
}: SøknadRouterProps) => {
    // Én stabil store-instans per SøknadRouter-mount
    const storeRef = useRef<ReturnType<typeof createSøknadAppStore>>(null);
    if (!storeRef.current) {
        storeRef.current = createSøknadAppStore({ config, stepOrder });
    }
    const store = storeRef.current;
    const søknadSendt = store((s) => s.søknadSendt);
    const isInitialized = store((s) => s.isInitialized);
    const resumeStepId = store((s) => s.resumeStepId);
    const navigate = useNavigate();
    const location = useLocation();

    // Navigasjon: etter mellomlagring-henting ved mount — send bruker til gjenopptakingspunktet.
    // Alle andre navigasjonsbeslutninger er dokumentert i JSDoc-tabellen over.
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

    // Navigasjon: når søknaden er sendt — synk URL til kvitteringsruten.
    // Effekten kjører etter commit, så søknadSendt er garantert true når
    // renderContent nedenfor evaluerer kvitteringsruten. Dermed er rekkefølgen
    // mellom state-oppdatering og navigering ikke lenger noe kallstedet må tenke på.
    useEffect(() => {
        if (søknadSendt && location.pathname !== KVITTERING_PATH) {
            navigate(KVITTERING_PATH, { replace: true });
        }
    }, [søknadSendt, location.pathname, navigate]);

    const lagreMellomlagring = useCallback(
        async (blobData: MellomlagringBlob): Promise<void> => {
            await oppdaterYtelseMellomlagring(
                ytelse as MellomlagringYtelse,
                blobData as unknown as Record<string, unknown>,
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

    // Kvitteringsruten eies av rammeverket: URL-en er kilden til sannhet for hva
    // som vises, og søknadSendt avgjør kun om ruten er tilgjengelig. Dermed kan
    // kvitteringen ikke åpnes via direkte URL uten innsendt søknad.
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
