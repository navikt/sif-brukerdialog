import { useCallback, useMemo } from 'react';

import { StegConfig } from '../types';

import { useSøknadState } from './useSøknadState';

interface UseStegOptions<TSøknadsdata> {
    stegId: string;
    stegConfig: StegConfig<TSøknadsdata>;
}

export const useSteg = <TSøknadsdata, TSkjemadata>({ stegId, stegConfig }: UseStegOptions<TSøknadsdata>) => {
    const søknadsdata = useSøknadState((s) => s.søknadsdata) as Partial<TSøknadsdata>;
    const currentStegSkjemadata = useSøknadState((s) => s.currentStegSkjemadata) as TSkjemadata | null;
    const updateSkjemadata = useSøknadState((s) => s.updateSkjemadata);
    const submitSteg = useSøknadState((s) => s.submitSteg);
    const setIsSubmittingSteg = useSøknadState((s) => s.setIsSubmittingSteg);

    const stegDef = stegConfig[stegId];

    const initialData = useMemo(() => {
        if (currentStegSkjemadata !== null) {
            return currentStegSkjemadata;
        }
        return stegDef?.toSkjemadata(søknadsdata) as TSkjemadata;
    }, [currentStegSkjemadata, stegDef, søknadsdata]);

    const onSkjemadataChange = useCallback(
        (data: TSkjemadata) => {
            updateSkjemadata(data);
        },
        [updateSkjemadata],
    );

    const onStegSubmit = useCallback(
        (skjemadata: TSkjemadata) => {
            setIsSubmittingSteg(true);
            const søknadsdataForSteg = stegDef?.toSøknadsdata(skjemadata) ?? {};
            submitSteg(stegId, søknadsdataForSteg);
        },
        [setIsSubmittingSteg, stegDef, submitSteg, stegId],
    );

    return {
        initialData,
        onSkjemadataChange,
        onStegSubmit,
    };
};
