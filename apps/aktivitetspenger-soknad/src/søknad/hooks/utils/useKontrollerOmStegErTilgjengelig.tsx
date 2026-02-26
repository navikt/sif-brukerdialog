import { useEffect } from 'react';

import { Steg } from '../../types';
import { erStegTilgjengelig, getSkjemaStegIndex, getTilgjengeligeSteg, søknadSteg } from '../../utils/stegUtils';
import { useSøknadContext } from '../context/useSøknadContext';
import { useSøknadNavigation } from './useSøknadNavigation';

export const useKontrollerOmStegErTilgjengelig = (steg: Steg) => {
    const {
        søknadsdata: { svar },
        kontonummerInfo,
    } = useSøknadContext();
    const { gotoSteg, gotoVelkommenPage } = useSøknadNavigation();

    useEffect(() => {
        const activeIndex = getSkjemaStegIndex(steg);
        if (!erStegTilgjengelig(steg, svar, kontonummerInfo)) {
            if (activeIndex === 0) {
                gotoVelkommenPage();
            } else {
                const sisteTilgjengeligeSteg = getTilgjengeligeSteg(svar, kontonummerInfo).pop();
                if (sisteTilgjengeligeSteg) {
                    gotoSteg(søknadSteg[activeIndex - 1]);
                } else {
                    gotoVelkommenPage();
                }
            }
        }
    }, []);
};
