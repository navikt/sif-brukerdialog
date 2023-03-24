import { durationUtils } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { uniqBy } from 'lodash';
import { ArbeidstidEndring, ArbeidstidEndringMap } from '../../types/ArbeidstidEndring';
import { Arbeidsuke, ArbeidsukeMap } from '../../types/Sak';
import { LovbestemtFerieSøknadsdata } from '../../types/søknadsdata/LovbestemtFerieSøknadsdata';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { erHelArbeidsuke } from '../../utils/arbeidsukeUtils';
import { beregnEndretFaktiskArbeidstidPerDag, getTimerPerUkeFraTimerPerDag } from '../../utils/beregnUtils';
import { getFeriedagerIUke } from '../../utils/ferieUtils';
import { getLovbestemtFerieForPeriode } from '../../utils/lovbestemtFerieUtils';
import { ArbeidstidUkeTabellItem } from '../arbeidstid-uke-liste/ArbeidstidUkeTabell';

const sorterItemsPåStartdato = (u1: ArbeidstidUkeTabellItem, u2: ArbeidstidUkeTabellItem): number => {
    return dayjs(u1.periode.from).isBefore(u2.periode.from) ? -1 : 1;
};

const sorterListeItems = (items: ArbeidstidUkeTabellItem[]): ArbeidstidUkeTabellItem[] => {
    return items.sort(sorterItemsPåStartdato);
};

const arbeidsukeToArbeidstidUkeTabellItem = (
    arbeidsuke: Arbeidsuke,
    endring: ArbeidstidEndring | undefined,
    lovbestemtFerie: LovbestemtFerieSøknadsdata | undefined
): ArbeidstidUkeTabellItem => {
    const dagerMedFerie = lovbestemtFerie
        ? getFeriedagerIUke(lovbestemtFerie.perioderMedFerie, arbeidsuke.periode, true)
        : [];
    const dagerMedFjernetFerie = lovbestemtFerie
        ? getFeriedagerIUke(lovbestemtFerie.perioderFjernet, arbeidsuke.periode, true)
        : [];

    return {
        isoDateRange: arbeidsuke.isoDateRange,
        periode: arbeidsuke.periode,
        kanEndres: durationUtils.durationIsGreatherThanZero(arbeidsuke.normalt.uke),
        kanVelges: erHelArbeidsuke(arbeidsuke.periode) && dagerMedFerie.length === 0,
        antallDagerMedArbeidstid: arbeidsuke.antallDagerMedArbeidstid,
        ferie: {
            dagerMedFerie,
            dagerMedFjernetFerie,
        },
        opprinnelig: {
            faktisk: arbeidsuke.faktisk.uke,
            normalt: arbeidsuke.normalt.uke,
        },
        endret: endring
            ? {
                  faktisk: getTimerPerUkeFraTimerPerDag(
                      beregnEndretFaktiskArbeidstidPerDag(
                          arbeidsuke.normalt.uke,
                          endring,
                          arbeidsuke.antallDagerMedArbeidstid
                      ),
                      arbeidsuke.antallDagerMedArbeidstid
                  ),
                  endretProsent: endring.type === TimerEllerProsent.PROSENT ? endring.prosent : undefined,
              }
            : undefined,
    };
};

const getArbeidstidUkeTabellItemFromArbeidsuker = (
    arbeidsuker: ArbeidsukeMap,
    endringer: ArbeidstidEndringMap = {},
    lovbestemtFerie?: LovbestemtFerieSøknadsdata
): ArbeidstidUkeTabellItem[] => {
    const items: ArbeidstidUkeTabellItem[] = [];
    Object.keys(arbeidsuker).map((key) => {
        const arbeidsuke = arbeidsuker[key];
        const endring = endringer[arbeidsuke.isoDateRange];
        const ferieIPerioden = lovbestemtFerie
            ? getLovbestemtFerieForPeriode(lovbestemtFerie, arbeidsuke.periode)
            : undefined;

        items.push(arbeidsukeToArbeidstidUkeTabellItem(arbeidsuke, endring, ferieIPerioden));
    });
    return items;
};

export const getEndringerForArbeidsukeForm = (
    arbeidsukerForEndring: Arbeidsuke[],
    endringerMap: ArbeidstidEndringMap
): ArbeidstidEndring | undefined => {
    const endringer = uniqBy(
        arbeidsukerForEndring.map((uke) => endringerMap[uke.isoDateRange]),
        (e) => JSON.stringify(e)
    );
    return endringer.length === 1 ? endringer[0] : undefined;
};

export const arbeidsaktivitetUtils = {
    getArbeidstidUkeTabellItemFromArbeidsuker,
    sorterListeItems,
};
