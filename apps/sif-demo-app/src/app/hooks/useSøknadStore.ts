import { create } from 'zustand';

import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { StegId, SøknadState } from '../config/stegConfig';
import { Søknadsdata } from '../types/Søknadsdata';

interface SubmitStegOptions {
    onSuccess?: () => void;
}

interface SøknadStore {
    søknadState: SøknadState | undefined;
    init: (søker: Søker, barn: RegistrertBarn[], mellomlagretSøknadsdata?: Søknadsdata) => void;
    submitSteg: (data: Partial<Søknadsdata>, options?: SubmitStegOptions) => void;
    erStegFullført: (stegId: string) => boolean;
    resetSøknad: () => void;
}

export const useSøknadStore = create<SøknadStore>((set, get) => ({
    søknadState: undefined,

    init: (søker, barn, mellomlagretSøknadsdata) =>
        set({
            søknadState: {
                søker,
                barn,
                søknadsdata: mellomlagretSøknadsdata ?? {},
            },
        }),

    submitSteg: (data, options) => {
        set((state) => {
            if (!state.søknadState) return state;
            return {
                søknadState: {
                    ...state.søknadState,
                    søknadsdata: { ...state.søknadState.søknadsdata, ...data },
                },
            };
        });
        options?.onSuccess?.();
    },

    erStegFullført: (stegId) => {
        const appState = get().søknadState;
        return appState?.søknadsdata[stegId as StegId] !== undefined;
    },

    resetSøknad: () =>
        set((state) => {
            if (!state.søknadState) return state;
            return {
                søknadState: {
                    ...state.søknadState,
                    søknadsdata: {},
                },
            };
        }),
}));
