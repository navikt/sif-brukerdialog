import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Sak } from '../server/api-models/SakSchema';
import { AmplitudeInfoType } from '../types/AmplitudeInfoType';
import { getSaksprofil } from '../utils/amplitude/getSaksprofil';

export const useLogSaksprofil = (sak: Sak, antallSaker: number) => {
    const { logInfo } = useAmplitudeInstance();
    useEffectOnce(() => {
        const info = getSaksprofil(sak, antallSaker);
        logInfo({
            type: AmplitudeInfoType.saksprofil,
            ...info,
        });
    });
};
