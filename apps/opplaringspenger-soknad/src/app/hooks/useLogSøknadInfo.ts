export enum LogSøknadInfoType {
    'arbeidPeriodeRegistrert' = 'arbeidPeriodeRegistrert',
    'arbeidEnkeltdagRegistrert' = 'arbeidEnkeltdagRegistrert',
    'bekrefterIngenFraværFraArbeid' = 'bekrefterIngenFraværFraArbeid',
    'avkrefterIngenFraværFraArbeid' = 'avkrefterIngenFraværFraArbeid',
}

import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';

function useLogSøknadInfo() {
    const { logInfo } = useAmplitudeInstance();

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
