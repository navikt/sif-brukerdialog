import { durationUtils } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { ArbeidstidAktivitetEndringMap, ArbeidstidEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke, ArbeidsukeMap } from '../../types/K9Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { beregnEndretArbeidstid } from '../../utils/beregnUtils';
import {
    ArbeidstidUkeTabellItem,
    ArbeidstidUkeTabellItem as PeriodeSøktForTabellItem,
} from '../arbeidstid-uke-liste/ArbeidstidUkeTabell';

const sorterItemsPåStartdato = (u1: PeriodeSøktForTabellItem, u2: PeriodeSøktForTabellItem): number => {
    return dayjs(u1.periode.from).isBefore(u2.periode.from) ? -1 : 1;
};

const sorterListeItems = (items: ArbeidstidUkeTabellItem[]): ArbeidstidUkeTabellItem[] => {
    return items.sort(sorterItemsPåStartdato);
};

const arbeidsukeToArbeidstidUkeTabellItem = (
    arbeidsuke: Arbeidsuke,
    endring?: ArbeidstidEndring
): PeriodeSøktForTabellItem => {
    return {
        isoDateRange: arbeidsuke.isoDateRange,
        periode: arbeidsuke.periode,
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
    sorterListeItems,
};
