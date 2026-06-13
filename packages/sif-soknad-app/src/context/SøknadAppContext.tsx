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
    /** Debounset mellomlagring-PUT (500 ms) */
    lagreMellomlagring: (blob: MellomlagringBlob) => void;
    /** Umiddelbar mellomlagring-PUT — brukes f.eks. ved "fortsett senere" */
    lagreMellomlagringNow: (blob: MellomlagringBlob) => Promise<void>;
    slettMellomlagring: () => Promise<void>;
}

export const SøknadAppContext = createContext<SøknadAppContextValue | null>(null);

export const useSøknadAppContext = (): SøknadAppContextValue => {
    const ctx = useContext(SøknadAppContext);
    if (!ctx) {
        throw new Error('useSøknadAppContext må brukes innenfor SøknadRouter');
    }
    return ctx;
};
