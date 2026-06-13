/* eslint-disable no-console */
import {
    hentYtelseMellomlagring,
    MellomlagringYtelse,
    oppdaterYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '@sif/api/k9-prosessering';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { SøknadAppContext, SøknadAppContextValue } from '../context/SøknadAppContext';
import { createSøknadAppStore } from '../store/createSøknadAppStore';
import { MellomlagringBlob, SøknadRouterProps } from '../types';
import { StepRouteGuard } from './StepRouteGuard';

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
 * Setter opp Zustand-store, henter og validerer mellomlagring ved mount,
 * og eksponerer kontekst for useStepData, useAvbryt og useSøknadSendt.
 *
 * Bruk i app (eksempel):
 * ```tsx
 * // App.tsx routing:
 * <Route path="/soknad/*" element={<Soknad />} />
 *
 * // Soknad.tsx:
 * <SøknadRouter config={...} stepOrder={...} ytelse="aktivitetspenger" versjon={1} applicationTitle="...">
 *   <Route path="startdato" element={<StartdatoForm />} />
 *   <Route path="oppsummering" element={<OppsummeringForm />} />
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
    children,
}: SøknadRouterProps) => {
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

    // Én stabil store-instans per SøknadRouter-mount
    const storeRef = useRef<ReturnType<typeof createSøknadAppStore>>(null);
    if (!storeRef.current) {
        storeRef.current = createSøknadAppStore({ config, stepOrder });
    }
    const store = storeRef.current;

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

    const isInitialized = store((s) => s.isInitialized);
    const currentStepId = store((s) => s.currentStepId);
    const includedSteps = store((s) => s.includedSteps);

    return (
        <SøknadAppContext.Provider value={contextValue}>
            <Routes>
                <Route
                    element={
                        <StepRouteGuard
                            steps={includedSteps}
                            currentStepId={currentStepId}
                            isInitialized={isInitialized}
                            basePath={basePath}
                        />
                    }>
                    {children}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </SøknadAppContext.Provider>
    );
};
