import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common/src/hooks';
import { Sak } from '../server/api-models/SakSchema';
import { getSaksprofil } from '../utils/amplitude/getSaksprofil';
import { AmplitudeInfoType } from '../types/AmplitudeInfoType';

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
