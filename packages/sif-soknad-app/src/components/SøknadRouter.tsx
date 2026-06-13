/* eslint-disable no-console */
import {
    hentYtelseMellomlagring,
    MellomlagringYtelse,
    oppdaterYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '@sif/api/k9-prosessering';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { SøknadAppContext, SøknadAppContextValue } from '../context/SøknadAppContext';
import { createSøknadAppStore } from '../store/createSøknadAppStore';
import { MellomlagringBlob, SøknadRouterProps } from '../types';

const isMellomlagringBlob = (value: unknown): value is MellomlagringBlob => {
    if (typeof value !== 'object' || value === null) return false;
    const v = value as Record<string, unknown>;
    return (
        typeof v['versjon'] === 'number' &&
        typeof v['currentStepId'] === 'string' &&
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
 * Etter vellykket innsending vises `kvitteringElement` og URL settes til `kvitteringPath`
 * (default '/kvittering'). Ved reload resetter state og bruker sendes til '/'.
 *
 * Appen er ansvarlig for <Routes>-oppsett. Bruk <SøknadStepGuard> for å
 * beskytte steg-rutene.
 *
 * Bruk i app (eksempel):
 * ```tsx
 * // Soknad.tsx:
 * <SøknadRouter
 *   config={...} stepOrder={...} ytelse="aktivitetspenger" versjon={1}
 *   applicationTitle="..." kvitteringElement={<KvitteringPage />}>
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
    kvitteringElement,
    kvitteringPath = '/kvittering',
    children,
}: SøknadRouterProps) => {
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

    // Én stabil store-instans per SøknadRouter-mount
    const storeRef = useRef<ReturnType<typeof createSøknadAppStore>>(null);
    if (!storeRef.current) {
        storeRef.current = createSøknadAppStore({ config, stepOrder });
    }
    const store = storeRef.current;
    const søknadSendt = store((s) => s.søknadSendt);
    const navigate = useNavigate();

    // Naviger til kvitteringssti når søknad er sendt
    useEffect(() => {
        if (søknadSendt && kvitteringPath) {
            navigate(kvitteringPath, { replace: true });
        }
    }, [søknadSendt, navigate, kvitteringPath]);

    // Hent og initialiser fra mellomlagring ved mount
    useEffect(() => {
        let cancelled = false;

        const initFromMellomlagring = async () => {
            let blob: MellomlagringBlob | null = null;
            try {
                const payload = await hentYtelseMellomlagring(ytelse as MellomlagringYtelse);
                if (payload && Object.keys(payload).length > 0 && isMellomlagringBlob(payload)) {
                    if (payload.versjon !== versjon) {
                        blob = null;
                    } else if (!stepOrder.includes(payload.currentStepId)) {
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
            }
        };

        initFromMellomlagring();

        return () => {
            cancelled = true;
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const lagreMellomlagring = useCallback(
        (blobData: MellomlagringBlob) => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            debounceTimerRef.current = setTimeout(() => {
                oppdaterYtelseMellomlagring(
                    ytelse as MellomlagringYtelse,
                    blobData as unknown as Record<string, unknown>,
                ).catch(() => {});
            }, 500);
        },
        [ytelse],
    );

    const lagreMellomlagringNow = useCallback(
        async (blobData: MellomlagringBlob) => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            await oppdaterYtelseMellomlagring(
                ytelse as MellomlagringYtelse,
                blobData as unknown as Record<string, unknown>,
            ).catch(() => {});
        },
        [ytelse],
    );

    const slettMellomlagring = useCallback(async () => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
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
            lagreMellomlagringNow,
            slettMellomlagring,
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
            lagreMellomlagringNow,
            slettMellomlagring,
        ],
    );

    return (
        <SøknadAppContext.Provider value={contextValue}>
            {søknadSendt && kvitteringElement ? kvitteringElement : children}
        </SøknadAppContext.Provider>
    );
};
