import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { AmplitudeInfoType } from '../types/AmplitudeInfoType';
import { InnsendtSøknad } from '../types/Søknad';
import { getBrukerprofil } from '../utils/amplitude/getBrukerprofil';

export const useLogBrukerprofil = (
    søknader: InnsendtSøknad[],
    saker: PleietrengendeMedSak[],
    saksbehandlingstidUker: number | undefined,
) => {
    const { logInfo } = useAmplitudeInstance();

    useEffectOnce(() => {
        const statistikk = getBrukerprofil(søknader, saker, saksbehandlingstidUker);
        logInfo({
            type: AmplitudeInfoType.brukerprofil,
            ...statistikk,
        });
    });
};
