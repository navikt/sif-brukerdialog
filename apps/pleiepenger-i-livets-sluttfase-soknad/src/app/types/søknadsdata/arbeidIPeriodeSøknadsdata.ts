import { ArbeidIPeriodeType } from '../arbeidIPeriodeType';
import { DateDurationMap } from '@navikt/sif-common-utils';

interface ArbeidISøknadsperiodeJobberIkkeSøknadsdata {
    type: ArbeidIPeriodeType.arbeiderIkke;
    arbeiderIPerioden: false;
}
interface ArbeidISøknadsperiodeJobberVanligSøknadsdata {
    type: ArbeidIPeriodeType.arbeiderVanlig;
    arbeiderIPerioden: true;
    arbeiderRedusert: false;
}

interface ArbeidISøknadsperiodeUlikeUkerTimer {
    type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer;
    arbeiderIPerioden: true;
    arbeiderRedusert: true;
    enkeltdager: DateDurationMap;
}

export type ArbeidIPeriodeSøknadsdata =
    | ArbeidISøknadsperiodeJobberVanligSøknadsdata
    | ArbeidISøknadsperiodeJobberIkkeSøknadsdata
    | ArbeidISøknadsperiodeUlikeUkerTimer;
