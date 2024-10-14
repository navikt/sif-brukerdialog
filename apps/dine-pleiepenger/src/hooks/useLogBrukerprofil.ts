import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common/src/hooks';
import { AmplitudeInfoType } from '../types/AmplitudeInfoType';
import { Brukerprofil } from '../types/Brukerprofil';

export const useLogBrukerprofil = (brukerprofil: Brukerprofil) => {
    const { logInfo } = useAmplitudeInstance();

    useEffectOnce(() => {
        logInfo({
            type: AmplitudeInfoType.brukerprofil,
            ...brukerprofil,
        });
    });
};
