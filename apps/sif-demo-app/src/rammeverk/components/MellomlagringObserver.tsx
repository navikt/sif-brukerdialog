import { useEffect, useRef } from 'react';

import { useSøknadFlyt } from '../state';

export interface MellomlagringCallbacks<Data = unknown> {
    getData: () => Data;
    lagre: (data: Data) => Promise<void>;
}

interface Props<Data = unknown> {
    callbacks: MellomlagringCallbacks<Data>;
}

/**
 * Observer som lytter på børMellomlagres-flagget og trigger lagring.
 * Rammeverket er "dumt" - kjenner ikke til datastruktur, kun kaller callbacks.
 */
export const MellomlagringObserver = <Data,>({ callbacks }: Props<Data>) => {
    const børMellomlagres = useSøknadFlyt((s) => s.børMellomlagres);
    const setBørMellomlagres = useSøknadFlyt((s) => s.setBørMellomlagres);
    const isLagring = useRef(false);

    useEffect(() => {
        if (børMellomlagres && !isLagring.current) {
            isLagring.current = true;
            const data = callbacks.getData();

            callbacks
                .lagre(data)
                .catch(() => {
                    // Silent fail - mellomlagringsfeil blokkerer ikke bruker
                })
                .finally(() => {
                    setBørMellomlagres(false);
                    isLagring.current = false;
                });
        }
    }, [børMellomlagres, callbacks, setBørMellomlagres]);

    return null;
};
