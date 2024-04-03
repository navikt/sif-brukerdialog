import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { InnsendtSøknad } from '../types/Søknad';
import { getBrukerStatistikk } from '../utils/brukerStatistikkUtils';

export const useLogBrukerstatistikk = (
    søknader: InnsendtSøknad[],
    saker: PleietrengendeMedSak[],
    saksbehandlingstidUker: number | undefined,
) => {
    const { logInfo } = useAmplitudeInstance();

    useEffectOnce(() => {
        const statistikk = getBrukerStatistikk(søknader, saker, saksbehandlingstidUker);
        logInfo({
            type: 'brukerprofil',
            ...statistikk,
        });
    });
};
