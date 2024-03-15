import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { InnsendtSøknad } from '../types/Søknad';
import { getBrukerprofil } from '../utils/brukerprofilUtils';

export const useLogBrukerprofil = (
    søknader: InnsendtSøknad[],
    saker: PleietrengendeMedSak[],
    saksbehandlingstidUker: number | undefined,
) => {
    const { logInfo } = useAmplitudeInstance();

    useEffectOnce(() => {
        const brukerprofil = getBrukerprofil(søknader, saker, saksbehandlingstidUker);
        logInfo({
            type: 'brukerprofil',
            ...brukerprofil,
        });
    });
};
