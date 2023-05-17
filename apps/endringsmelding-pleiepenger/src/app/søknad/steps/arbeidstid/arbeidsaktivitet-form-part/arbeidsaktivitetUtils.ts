import { durationUtils } from '@navikt/sif-common-utils';
import {
    ArbeidstidEndring,
    ArbeidstidEndringMap,
    Arbeidsuke,
    ArbeidsukeMap,
    LovbestemtFerieSøknadsdata,
    TimerEllerProsent,
} from '@types';
import {
    beregnEndretFaktiskArbeidstidPerDag,
    erKortArbeidsuke,
    getLovbestemtFerieSøknadsdataForPeriode,
    getTimerPerUkeFraTimerPerDag,
} from '@utils';
import dayjs from 'dayjs';
import { uniqBy } from 'lodash';
import { ArbeidstidUkeTabellItem } from '../../../../modules/arbeidstid-uke-tabell/ArbeidstidUkeTabell';

const sorterItemsPåStartdato = (u1: ArbeidstidUkeTabellItem, u2: ArbeidstidUkeTabellItem): number => {
    return dayjs(u1.periode.from).isBefore(u2.periode.from) ? -1 : 1;
};

const sorterListeItems = (items: ArbeidstidUkeTabellItem[]): ArbeidstidUkeTabellItem[] => {
    return items.sort(sorterItemsPåStartdato);
};

const arbeidsukeToArbeidstidUkeTabellItem = (
    arbeidsuke: Arbeidsuke,
    endring: ArbeidstidEndring | undefined,
    dagerMedFerie: Date[] | undefined = [],
    dagerMedFjernetFerie: Date[] | undefined = []
): ArbeidstidUkeTabellItem => {
    const erKortUke = erKortArbeidsuke(arbeidsuke.periode);
    return {
        isoDateRange: arbeidsuke.isoDateRange,
        periode: arbeidsuke.periode,
        kanEndres: durationUtils.durationIsGreatherThanZero(arbeidsuke.normalt.uke),
        kanVelges: !erKortUke && dagerMedFerie.length === 0,
        antallDagerMedArbeidstid: arbeidsuke.antallDagerMedArbeidstid,
        erKortUke,
        harFeriedager: dagerMedFerie && dagerMedFerie.length > 0,
        harFjernetFeriedager: dagerMedFjernetFerie && dagerMedFjernetFerie.length > 0,
        ferie: {
            dagerMedFerie,
            dagerMedFjernetFerie,
        },
        opprinnelig: {
            faktisk: arbeidsuke.faktisk?.uke,
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
            ? getLovbestemtFerieSøknadsdataForPeriode(lovbestemtFerie, arbeidsuke.periode)
            : undefined;

        items.push(
            arbeidsukeToArbeidstidUkeTabellItem(
                arbeidsuke,
                endring,
                ferieIPerioden?.feriedagerMeta.datoerMedFerie,
                ferieIPerioden?.feriedagerMeta.datoerFjernet
            )
        );
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
