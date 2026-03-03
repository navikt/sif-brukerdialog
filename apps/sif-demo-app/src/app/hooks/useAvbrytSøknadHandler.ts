import { createAvbrytHandler } from '@rammeverk/hooks';

import { useMellomlagring } from './useMellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknadHandler = createAvbrytHandler({
    useResetSøknad: () => useSøknadStore((s) => s.resetSøknad),
    useSlettMellomlagring: () => useMellomlagring().slettMellomlagring,
});
