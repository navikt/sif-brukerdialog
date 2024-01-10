export enum LogSøknadInfoType {
    'bekrefterIngenFraværFraArbeid' = 'bekrefterIngenFraværFraArbeid',
    'avkrefterIngenFraværFraArbeid' = 'avkrefterIngenFraværFraArbeid',
    'senderInnSøknadMedIngenFravær' = 'senderInnSøknadMedIngenFravær',
}

import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';

function useLogSøknadInfo() {
    const { logInfo } = useAmplitudeInstance();

    const logBekreftIngenFraværFraJobb = (bekrefterIngenFravær: boolean) => {
        logInfo({
            hendelse: bekrefterIngenFravær
                ? LogSøknadInfoType.bekrefterIngenFraværFraArbeid
                : LogSøknadInfoType.avkrefterIngenFraværFraArbeid,
        });
    };
    const logSenderInnSøknadMedIngenFravær = () => {
        logInfo({
            hendelse: LogSøknadInfoType.senderInnSøknadMedIngenFravær,
        });
    };

    return {
        logBekreftIngenFraværFraJobb,
        logSenderInnSøknadMedIngenFravær,
    };
}

export default useLogSøknadInfo;
