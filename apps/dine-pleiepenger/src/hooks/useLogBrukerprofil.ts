import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Sak } from '../server/api-models/SakSchema';
import { Søknad } from '../types/Søknad';
import { getBrukerprofil } from '../utils/brukerprofilUtils';

export const useLogBrukerprofil = (søknader: Søknad[], saker: Sak[], saksbehandlingstidUker: number | undefined) => {
    const { logInfo } = useAmplitudeInstance();

    useEffectOnce(() => {
        const brukerprofil = getBrukerprofil(søknader, saker, saksbehandlingstidUker);
        logInfo({
            type: 'brukerprofil',
            ...brukerprofil,
        });
    });
};
