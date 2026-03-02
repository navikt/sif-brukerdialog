import { create } from 'zustand';

import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { useSøknadFlyt } from '../../rammeverk';
import { StegId, SøknadState } from '../config/stegConfig';
import { Søknadsdata } from '../types/Søknadsdata';

interface SøknadStore {
    søknadState: SøknadState | undefined;
    init: (søker: Søker, barn: RegistrertBarn[], mellomlagretSøknadsdata?: Søknadsdata) => void;
    submitSteg: (data: Partial<Søknadsdata>) => void;
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

    submitSteg: (data) => {
        set((state) => {
            if (!state.søknadState) return state;
            return {
                søknadState: {
                    ...state.søknadState,
                    søknadsdata: { ...state.søknadState.søknadsdata, ...data },
                },
            };
        });
        useSøknadFlyt.getState().setBørMellomlagres(true);
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
