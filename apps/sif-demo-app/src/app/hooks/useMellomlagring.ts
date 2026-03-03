import { createMellomlagringHook } from '@rammeverk/hooks';

import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../config/appConfig';
import { useSøknadStore } from './useSøknadStore';

export const useMellomlagring = createMellomlagringHook({
    useSøknadState: () => useSøknadStore((s) => s.søknadState),
    useCurrentStepId: () => useSøknadStore((s) => s.currentStepId),
    ytelse: APP_YTELSE,
    getMetadata: (state) => ({
        MELLOMLAGRING_VERSJON,
        søker: state.søker,
        barn: state.barn,
    }),
});
