import { useCallback } from 'react';

import { useSøknadState } from './useSøknadState';

export const useSteg = <TSøknadsdata>() => {
    const søknadsdata = useSøknadState((s) => s.søknadsdata) as Partial<TSøknadsdata>;
    const submitSteg = useSøknadState((s) => s.submitSteg);
    const setIsSubmittingSteg = useSøknadState((s) => s.setIsSubmittingSteg);

    const submitSøknadsdata = useCallback(
        (data: Partial<TSøknadsdata>) => {
            setIsSubmittingSteg(true);
            submitSteg(data);
        },
        [setIsSubmittingSteg, submitSteg],
    );

    return {
        søknadsdata,
        submitSøknadsdata,
    };
};
