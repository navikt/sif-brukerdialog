export enum LogSøknadInfoType {
    'arbeidPeriodeRegistrert' = 'arbeidPeriodeRegistrert',
    'arbeidEnkeltdagRegistrert' = 'arbeidEnkeltdagRegistrert',
    'bekrefterIngenFraværFraArbeid' = 'bekrefterIngenFraværFraArbeid',
    'avkrefterIngenFraværFraArbeid' = 'avkrefterIngenFraværFraArbeid',
}

import { useAnalyticsInstance } from '@navikt/sif-common-analytics';

function useLogSøknadInfo() {
    const { logInfo } = useAnalyticsInstance();

    const logArbeidPeriodeRegistrert = (data: { verdi: 'prosent' | 'ukeplan'; prosent?: string }) => {
        logInfo({
            hendelse: LogSøknadInfoType.arbeidPeriodeRegistrert,
            ...data,
        });
    };

    const logArbeidEnkeltdagRegistrert = (data: { antallDager: number }) => {
        logInfo({
            hendelse: LogSøknadInfoType.arbeidEnkeltdagRegistrert,
            ...data,
        });
    };

    const logBekreftIngenFraværFraJobb = (bekrefterIngenFravær: boolean) => {
        logInfo({
            hendelse: bekrefterIngenFravær
                ? LogSøknadInfoType.bekrefterIngenFraværFraArbeid
                : LogSøknadInfoType.avkrefterIngenFraværFraArbeid,
        });
    };
    return { logArbeidPeriodeRegistrert, logArbeidEnkeltdagRegistrert, logBekreftIngenFraværFraJobb };
}

export default useLogSøknadInfo;
