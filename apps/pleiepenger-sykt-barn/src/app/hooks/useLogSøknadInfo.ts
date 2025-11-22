export enum LogSøknadInfoType {
    'bekrefterIngenFraværFraArbeid' = 'bekrefterIngenFraværFraArbeid',
    'avkrefterIngenFraværFraArbeid' = 'avkrefterIngenFraværFraArbeid',
    'senderInnSøknadMedIngenFravær' = 'senderInnSøknadMedIngenFravær',
}

import { useAnalyticsInstance } from '@navikt/sif-common-analytics';

function useLogSøknadInfo() {
    const { logInfo } = useAnalyticsInstance();

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
