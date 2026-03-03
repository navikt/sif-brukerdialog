import { useEffect, useRef } from 'react';

interface Props {
    børMellomlagres: boolean;
    setBørMellomlagres: (verdi: boolean) => void;
    lagreMellomlagring: () => Promise<void>;
}

/**
 * Observer som lytter på børMellomlagres-flagget og trigger lagring.
 */
export const MellomlagringObserver = ({ børMellomlagres, setBørMellomlagres, lagreMellomlagring }: Props) => {
    const isLagrer = useRef(false);

    useEffect(() => {
        if (børMellomlagres && !isLagrer.current) {
            isLagrer.current = true;

            lagreMellomlagring()
                .catch(() => {
                    // Silent fail - mellomlagringsfeil blokkerer ikke bruker
                })
                .finally(() => {
                    setBørMellomlagres(false);
                    isLagrer.current = false;
                });
        }
    }, [børMellomlagres, lagreMellomlagring, setBørMellomlagres]);

    return null;
};
