import { DateRange, dateRangeToISODateRange, getNumberOfDaysInDateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import {
    ArbeidstidUkeListeItem,
    PeriodeIkkeSøktForListeItem,
    PeriodeSøktForListeItem,
} from '../../../../components/arbeidstid-uke-liste/ArbeidstidUkeListe';
import { ArbeidstidAktivitetUkeEndringMap, ArbeidstidEndring } from '../../../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke, ArbeidsukeMap } from '../../../../types/K9Sak';
import { TimerEllerProsent } from '../../../../types/TimerEllerProsent';
import { beregnEndretArbeidstid } from '../../../../utils/beregnUtils';

const sorterItemsPåStartdato = (u1: PeriodeSøktForListeItem, u2: PeriodeSøktForListeItem): number => {
    return dayjs(u1.periode.from).isBefore(u2.periode.from) ? -1 : 1;
};

const sorterListeItems = (items: ArbeidstidUkeListeItem[]): ArbeidstidUkeListeItem[] => {
    return items.sort(sorterItemsPåStartdato);
};

const finnPeriodeIkkeSøktFor = (uker: PeriodeSøktForListeItem[]): PeriodeIkkeSøktForListeItem[] => {
    const perioderIkkeSøktFor: PeriodeIkkeSøktForListeItem[] = [];
    uker.sort(sorterItemsPåStartdato).forEach((uke, index) => {
        if (index === 0) {
            return;
        }
        const forrigeUke = uker[index - 1];
        const periode: DateRange = {
            from: dayjs(forrigeUke.periode.to).add(1, 'day').toDate(),
            to: dayjs(uke.periode.from).subtract(1, 'day').toDate(),
        };
        const uttaksdagerIPeriode = getNumberOfDaysInDateRange(periode, true);
        if (uttaksdagerIPeriode > 0) {
            perioderIkkeSøktFor.push({ isoDateRange: dateRangeToISODateRange(periode), periode, søktFor: false });
        }
    });

    return perioderIkkeSøktFor;
};

const arbeidsukeToArbeidstidUkeListItem = (
    arbeidsuke: Arbeidsuke,
    endring?: ArbeidstidEndring
): PeriodeSøktForListeItem => {
    return {
        ...arbeidsuke,
        søktFor: true,
        antallDager: Object.keys(arbeidsuke.dagerMap).length,
        opprinnelig: {
            faktisk: arbeidsuke.faktisk,
            normalt: arbeidsuke.normalt,
        },
        endret: endring
            ? {
                  faktisk: beregnEndretArbeidstid(endring, arbeidsuke.normalt),
                  endretProsent: endring.type === TimerEllerProsent.PROSENT ? endring.prosent : undefined,
              }
            : undefined,
    };
};

const getArbeidstidUkeListItemFromArbeidsuker = (
    arbeidsuker: ArbeidsukeMap,
    endringer: ArbeidstidAktivitetUkeEndringMap = {}
): PeriodeSøktForListeItem[] => {
    const items: PeriodeSøktForListeItem[] = [];

    Object.keys(arbeidsuker).map((key) => {
        const arbeidsuke = arbeidsuker[key];
        const endring = endringer[key];
        items.push(arbeidsukeToArbeidstidUkeListItem(arbeidsuke, endring?.endring));
    });
    return items;
};

export const arbeidsaktivitetUtils = {
    getArbeidstidUkeListItemFromArbeidsuker,
    finnPeriodeIkkeSøktFor,
    sorterListeItems,
};
