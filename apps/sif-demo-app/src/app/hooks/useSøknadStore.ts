import { create } from 'zustand';

import { StegId } from '../config/stegConfig';
import { SøknadStore } from '../types/SøknadStore';

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

    submitSteg: (data) =>
        set((state) => {
            if (!state.søknadState) return state;
            return {
                søknadState: {
                    ...state.søknadState,
                    søknadsdata: { ...state.søknadState.søknadsdata, ...data },
                },
            };
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
