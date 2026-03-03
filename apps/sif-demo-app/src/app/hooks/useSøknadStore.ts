import { create } from 'zustand';

import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { StegId, SøknadState } from '../config/stegConfig';
import { Søknadsdata } from '../types/Søknadsdata';

interface SubmitStegOptions {
    onSuccess?: () => void;
}

interface SøknadStore {
    børMellomlagres?: boolean;
    søknadState: SøknadState | undefined;
    erStegFullført: (stegId: string) => boolean;
    init: (søker: Søker, barn: RegistrertBarn[], mellomlagretSøknadsdata?: Søknadsdata) => void;
    resetSøknad: () => void;
    setBørMellomlagres: (verdi: boolean) => void;
    submitSteg: (data: Partial<Søknadsdata>, options?: SubmitStegOptions) => void;
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

    setBørMellomlagres: (verdi) =>
        set({
            børMellomlagres: verdi,
        }),

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
