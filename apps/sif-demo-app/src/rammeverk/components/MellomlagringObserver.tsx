import { useEffect, useRef } from 'react';

import { useSøknadFlyt } from '../state/useSøknadState';

export interface MellomlagringCallbacks<Data = unknown> {
    hentMellomlagring: () => Data;
    lagreMellomlagring: (data: Data) => Promise<void>;
}

interface Props<Data = unknown> {
    callbacks: MellomlagringCallbacks<Data>;
}

/**
 * Observer som lytter på børMellomlagres-flagget og trigger lagring.
 */
export const MellomlagringObserver = <Data,>({ callbacks }: Props<Data>) => {
    const børMellomlagres = useSøknadFlyt((s) => s.børMellomlagres);
    const setBørMellomlagres = useSøknadFlyt((s) => s.setBørMellomlagres);
    const isLagrer = useRef(false);

    useEffect(() => {
        if (børMellomlagres && !isLagrer.current) {
            isLagrer.current = true;
            const data = callbacks.hentMellomlagring();

            callbacks
                .lagreMellomlagring(data)
                .catch(() => {
                    // Silent fail - mellomlagringsfeil blokkerer ikke bruker
                })
                .finally(() => {
                    setBørMellomlagres(false);
                    isLagrer.current = false;
                });
        }
    }, [børMellomlagres, callbacks, setBørMellomlagres]);

    return null;
};
