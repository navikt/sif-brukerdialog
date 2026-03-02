import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { create } from 'zustand';

import { AppState, StegId } from '../config/stegConfig';
import { Søknadsdata } from '../types/Søknadsdata';

interface AppStore {
    appState: AppState | undefined;
    init: (søker: Søker, barn: RegistrertBarn[], mellomlagretSøknadsdata?: Søknadsdata) => void;
    submitSteg: (data: Partial<Søknadsdata>) => void;
    erStegFullført: (stegId: string) => boolean;
    resetSøknad: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
    appState: undefined,

    init: (søker, barn, mellomlagretSøknadsdata) =>
        set({
            appState: {
                søker,
                barn,
                søknadsdata: mellomlagretSøknadsdata ?? {},
            },
        }),

    submitSteg: (data) =>
        set((state) => {
            if (!state.appState) return state;
            return {
                appState: {
                    ...state.appState,
                    søknadsdata: { ...state.appState.søknadsdata, ...data },
                },
            };
        }),

    erStegFullført: (stegId) => {
        const appState = get().appState;
        return appState?.søknadsdata[stegId as StegId] !== undefined;
    },

    resetSøknad: () =>
        set((state) => {
            if (!state.appState) return state;
            return {
                appState: {
                    ...state.appState,
                    søknadsdata: {},
                },
            };
        }),
}));
