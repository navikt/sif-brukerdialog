import { useEffect } from 'react';
import { useDeltakerContext } from '../../../context/DeltakerContext';
import { useSøknadContext } from '../context/søknadContext';
import { erStegTilgjengelig, getSkjemaStegIndex, getTilgjengeligeSteg, skjemaSteg } from '../utils/stegUtils';
import { Steg } from '../types/Steg';
import { useNavigate } from 'react-router-dom';

export const useErStegTilgjengelig = (steg: Steg) => {
    const { kontonummer } = useDeltakerContext();
    const { svar } = useSøknadContext();
    const navigate = useNavigate();

    useEffect(() => {
        const activeIndex = getSkjemaStegIndex(steg); // This should be dynamically set based on the current step
        if (!erStegTilgjengelig(steg, svar, kontonummer !== undefined)) {
            if (activeIndex === 0) {
                navigate('../');
            } else {
                const sisteTilgjengeligeSteg = getTilgjengeligeSteg(svar, kontonummer !== undefined).pop();

                if (!sisteTilgjengeligeSteg || sisteTilgjengeligeSteg === Steg.VELKOMMEN) {
                    navigate('../');
                } else {
                    navigate('/soknad/' + skjemaSteg[activeIndex - 1]);
                }
            }
        }
    }, []);
};
