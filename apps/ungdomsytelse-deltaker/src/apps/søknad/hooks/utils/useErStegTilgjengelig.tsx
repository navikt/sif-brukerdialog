import { useEffect } from 'react';
import { Steg } from '../../types';
import { erStegTilgjengelig, getSkjemaStegIndex, getTilgjengeligeSteg, søknadSteg } from '../../utils/stegUtils';
import { useSøknadContext } from '../context/useSøknadContext';
import { useSøknadNavigation } from './useSøknadNavigation';

export const useErStegTilgjengelig = (steg: Steg) => {
    const { svar, kontonummerInfo: kontonummer } = useSøknadContext();
    const { gotoSteg, gotoVelkommenPage } = useSøknadNavigation();

    useEffect(() => {
        const activeIndex = getSkjemaStegIndex(steg); // This should be dynamically set based on the current step
        if (!erStegTilgjengelig(steg, svar, kontonummer !== undefined)) {
            if (activeIndex === 0) {
                gotoVelkommenPage();
            } else {
                const sisteTilgjengeligeSteg = getTilgjengeligeSteg(svar, kontonummer !== undefined).pop();
                if (!sisteTilgjengeligeSteg) {
                    gotoVelkommenPage();
                } else {
                    gotoSteg(søknadSteg[activeIndex - 1]);
                }
            }
        }
    }, []);
};
