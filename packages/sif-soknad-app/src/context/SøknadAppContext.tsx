import { createContext, useContext } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

import { SøknadStore } from '../store/createSøknadAppStore';
import { MellomlagringBlob, StepDefinition } from '../types';

export interface SøknadAppContextValue {
    store: UseBoundStore<StoreApi<SøknadStore>>;
    config: Record<string, StepDefinition>;
    stepOrder: string[];
    versjon: number;
    basePath: string;
    applicationTitle: string;
    resumeLaterUrl: string;
    /** Lagrer søknadsdata til mellomlagring — kall ved submit eller manuelt */
    lagreMellomlagring: (blob: MellomlagringBlob) => Promise<void>;
    slettMellomlagring: () => Promise<void>;
    /** Konverterer RHF-verdier til søknadsdata — brukes av konsistenssjekken */
    formValuesToSøknadsdata?: (
        stepId: string,
        formValues: Record<string, unknown>,
    ) => Record<string, unknown> | undefined;
}

export const SøknadAppContext = createContext<SøknadAppContextValue | null>(null);

export const useSøknadAppContext = (): SøknadAppContextValue => {
    const ctx = useContext(SøknadAppContext);
    if (!ctx) {
        throw new Error('useSøknadAppContext må brukes innenfor SøknadRouter');
    }
    return ctx;
};
