import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { create } from 'zustand';

import { StegData, StegId, Søknadsdata } from '../config/stegConfig';

interface SøknadState {
    søknadsdata: Søknadsdata | undefined;
    init: (søker: Søker, barn: RegistrertBarn[], mellomlagretStegData?: StegData) => void;
    submitSteg: (data: Partial<StegData>) => void;
    erStegFullført: (stegId: string) => boolean;
    resetStegData: () => void;
}

export const useSøknadState = create<SøknadState>((set, get) => ({
    søknadsdata: undefined,

    init: (søker, barn, mellomlagretStegData) =>
        set({
            søknadsdata: {
                søker,
                barn,
                stegData: mellomlagretStegData ?? {},
            },
        }),

    submitSteg: (data) =>
        set((state) => {
            if (!state.søknadsdata) return state;
            return {
                søknadsdata: {
                    ...state.søknadsdata,
                    stegData: { ...state.søknadsdata.stegData, ...data },
                },
            };
        }),

    erStegFullført: (stegId) => {
        const søknadsdata = get().søknadsdata;
        return søknadsdata?.stegData[stegId as StegId] !== undefined;
    },

    resetStegData: () =>
        set((state) => {
            if (!state.søknadsdata) return state;
            return {
                søknadsdata: {
                    ...state.søknadsdata,
                    stegData: {},
                },
            };
        }),
}));
