import { useLocation, useNavigate } from 'react-router-dom';
import { getStegFraPath } from '../utils/stegUtils';
import { useState } from 'react';
import { SkjemaSteg, Steg } from '../types/Steg';

export const useSøknadNavigation = (søknadSendt?: boolean) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const stegIPath = getStegFraPath(pathname);
    const [aktivtSteg, setAktivtSteg] = useState<Steg | SkjemaSteg>(stegIPath || Steg.VELKOMMEN);

    if (søknadSendt && getStegFraPath(pathname) !== Steg.KVITTERING) {
        navigate('soknad/kvittering');
    }

    const gotoSteg = (steg: Steg | SkjemaSteg) => {
        setAktivtSteg(steg);
        if (steg === Steg.VELKOMMEN) {
            navigate('../');
        } else {
            navigate(`/soknad/${steg}`);
        }
    };

    return {
        aktivtSteg,
        gotoSteg,
    };
};
