import { durationUtils } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { ArbeidstidEndringMap, ArbeidstidEndring } from '../../types/ArbeidstidEndring';
import { Arbeidsuke, ArbeidsukeMap } from '../../types/Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { erHelArbeidsuke } from '../../utils/arbeidsukeUtils';
import { beregnEndretArbeidstid } from '../../utils/beregnUtils';
import { ArbeidstidUkeTabellItem } from '../arbeidstid-uke-liste/ArbeidstidUkeTabell';

const sorterItemsPåStartdato = (u1: ArbeidstidUkeTabellItem, u2: ArbeidstidUkeTabellItem): number => {
    return dayjs(u1.periode.from).isBefore(u2.periode.from) ? -1 : 1;
};

const sorterListeItems = (items: ArbeidstidUkeTabellItem[]): ArbeidstidUkeTabellItem[] => {
    return items.sort(sorterItemsPåStartdato);
};

const arbeidsukeToArbeidstidUkeTabellItem = (
    arbeidsuke: Arbeidsuke,
    endring?: ArbeidstidEndring
): ArbeidstidUkeTabellItem => {
    return {
        isoDateRange: arbeidsuke.isoDateRange,
        periode: arbeidsuke.periode,
        kanEndres: durationUtils.durationIsGreatherThanZero(arbeidsuke.normalt.uke),
        kanVelges: erHelArbeidsuke(arbeidsuke.periode),
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
    endringer: ArbeidstidEndringMap = {}
): ArbeidstidUkeTabellItem[] => {
    const items: ArbeidstidUkeTabellItem[] = [];
    Object.keys(arbeidsukeMap).map((key) => {
        const arbeidsuke = arbeidsukeMap[key];
        const endring = endringer[key];
        items.push(arbeidsukeToArbeidstidUkeTabellItem(arbeidsuke, endring));
    });
    return items;
};

const getArbeidstidUkeTabellItemFromArbeidsuker = (
    arbeidsuker: ArbeidsukeMap,
    endringer: ArbeidstidEndringMap = {}
): ArbeidstidUkeTabellItem[] => {
    const items: ArbeidstidUkeTabellItem[] = [];
    Object.keys(arbeidsuker).map((key) => {
        const arbeidsuke = arbeidsuker[key];
        const endring = endringer[arbeidsuke.isoDateRange];
        items.push(arbeidsukeToArbeidstidUkeTabellItem(arbeidsuke, endring));
    });
    return items;
};

export const arbeidsaktivitetUtils = {
    getArbeidstidUkeTabellItemFromArbeidsukerMap,
    getArbeidstidUkeTabellItemFromArbeidsuker,
    sorterListeItems,
};
