import {
    DateRange,
    dateRangeToISODateRange,
    durationUtils,
    getNumberOfDaysInDateRange,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { ArbeidstidAktivitetEndringMap, ArbeidstidEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke, ArbeidsukeMap } from '../../types/K9Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { beregnEndretArbeidstid } from '../../utils/beregnUtils';
import {
    ArbeidstidUkeTabellItem,
    PeriodeIkkeSøktForListeItem,
    PeriodeSøktForListeItem as PeriodeSøktForTabellItem,
} from '../arbeidstid-uke-liste/ArbeidstidUkeTabell';

const sorterItemsPåStartdato = (u1: PeriodeSøktForTabellItem, u2: PeriodeSøktForTabellItem): number => {
    return dayjs(u1.periode.from).isBefore(u2.periode.from) ? -1 : 1;
};

const sorterListeItems = (items: ArbeidstidUkeTabellItem[]): ArbeidstidUkeTabellItem[] => {
    return items.sort(sorterItemsPåStartdato);
};

const finnPeriodeIkkeSøktFor = (uker: PeriodeSøktForTabellItem[]): PeriodeIkkeSøktForListeItem[] => {
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
        if (periode.from.getTime() > periode.to.getTime()) {
            return;
        }
        const uttaksdagerIPeriode = getNumberOfDaysInDateRange(periode, true);
        if (uttaksdagerIPeriode > 0) {
            perioderIkkeSøktFor.push({ isoDateRange: dateRangeToISODateRange(periode), periode, søktFor: false });
        }
    });

    return perioderIkkeSøktFor;
};

const arbeidsukeToArbeidstidUkeTabellItem = (
    arbeidsuke: Arbeidsuke,
    endring?: ArbeidstidEndring
): PeriodeSøktForTabellItem => {
    return {
        isoDateRange: arbeidsuke.isoDateRange,
        periode: arbeidsuke.periode,
        søktFor: true,
        kanEndres: durationUtils.durationIsGreatherThanZero(arbeidsuke.normalt.uke),
        antallDagerMedArbeidstid: arbeidsuke.antallDagerMedArbeidstid,
        opprinnelig: {
            faktisk: arbeidsuke.faktisk.uke,
            normalt: arbeidsuke.normalt.uke,
        },
        endret: endring
            ? {
                  faktisk: beregnEndretArbeidstid(endring, arbeidsuke.normalt.uke),
                  endretProsent: endring.type === TimerEllerProsent.PROSENT ? endring.prosent : undefined,
              }
            : undefined,
    };
};

const getArbeidstidUkeTabellItemFromArbeidsukerMap = (
    arbeidsukeMap: ArbeidsukeMap,
    endringer: ArbeidstidAktivitetEndringMap = {}
): PeriodeSøktForTabellItem[] => {
    const items: PeriodeSøktForTabellItem[] = [];
    Object.keys(arbeidsukeMap).map((key) => {
        const arbeidsuke = arbeidsukeMap[key];
        const endring = endringer[key];
        items.push(arbeidsukeToArbeidstidUkeTabellItem(arbeidsuke, endring?.endring));
    });
    return items;
};

const getArbeidstidUkeTabellItemFromArbeidsuker = (
    arbeidsuker: ArbeidsukeMap,
    endringer: ArbeidstidAktivitetEndringMap = {}
): PeriodeSøktForTabellItem[] => {
    const items: PeriodeSøktForTabellItem[] = [];
    Object.keys(arbeidsuker).map((key) => {
        const arbeidsuke = arbeidsuker[key];
        const endring = endringer[arbeidsuke.isoDateRange];
        items.push(arbeidsukeToArbeidstidUkeTabellItem(arbeidsuke, endring?.endring));
    });
    return items;
};

export const arbeidsaktivitetUtils = {
    getArbeidstidUkeTabellItemFromArbeidsukerMap,
    getArbeidstidUkeTabellItemFromArbeidsuker,
    finnPeriodeIkkeSøktFor,
    sorterListeItems,
};
