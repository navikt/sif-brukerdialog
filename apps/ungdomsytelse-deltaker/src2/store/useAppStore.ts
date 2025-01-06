import { Søker } from '@navikt/sif-common-api';
import { create } from 'zustand';
import { Deltakelse, Deltakelser } from '../../src/api/types';

interface AppState {
    søker?: Søker;
    deltakelser: Deltakelse[];
    site?: 'ikke-tilgang' | 'søknad' | 'innsyn';
    deltakelse?: Deltakelse;
    setInitialData: (data: { søker: Søker; deltakelser: Deltakelser; deltakelse?: Deltakelse }) => void;
}

export const useAppStore = create<AppState>((set) => ({
    søker: undefined,
    deltakelser: [],
    deltakelse: undefined,
    site: undefined,
    setInitialData: (data) => {
        console.log(data);
        return set({
            søker: data.søker,
            deltakelser: data.deltakelser,
            deltakelse: data.deltakelse,
        });
    },
}));
