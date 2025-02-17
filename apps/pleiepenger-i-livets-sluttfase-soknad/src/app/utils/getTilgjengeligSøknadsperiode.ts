import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { appEnv } from './appEnv';

export const getTilgjengeligSøknadsperiode = (): DateRange => {
    const antallMåneder = appEnv.SIF_PUBLIC_FEATURE_SOKE_TRE_AAR_TILBAKE === 'on' ? 12 : 3;
    return {
        from: dayjs().startOf('month').subtract(antallMåneder, 'months').toDate(),
        to: dayjs().add(2, 'weeks').toDate(),
    };
};
