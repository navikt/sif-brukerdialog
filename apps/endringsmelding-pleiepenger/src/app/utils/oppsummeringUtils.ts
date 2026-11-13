import {
    ArbeidstidApiData,
    LovbestemtFerieApiData,
    LovbestemtFeriePeriode,
    Sak,
    SøknadApiData,
    Søknadsdata,
    TilsynsordningApiData,
    ValgteEndringer,
} from '@app/types';
import {
    DateDurationMap,
    dateToISODate,
    Duration,
    durationToISODuration,
    getDatesInDateRange,
    ISODate,
    ISODateRangeMap,
    ISODateRangeToDateRange,
    ISODurationToDuration,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

import { oppsummeringStepUtils } from '../søknad/steps/oppsummering/oppsummeringStepUtils';

interface UkjentArbeidsforholdMetadata {
    antallUkjentArbeidsforhold: number;
    antallUkjentAnsatt?: number;
    antallUkjentIkkeAnsatt?: number;
}
interface ArbeidstidMetadata {
    endretArbeidstid?: boolean;
    harEndretFrilans?: boolean;
    harOmsorgsstønad?: boolean;
    /** Antall dager mellom dagens dato og første dag endret */
    dagerBakoverArb?: number;
    /** Antall dager mellom dagens dato og siste dag endret */
    dagerFremoverArb?: number;
}

interface ArbeidsgiverIkkeIAaregMetadata {
    antallArbeidsgivereIkkeIAareg: number;
}

interface LovbestemtFerieMetadata {
    endretFerie?: boolean;
    lagtTilFerie?: boolean;
    fjernetFerie?: boolean;
}

interface OmsorgstilbudMetadata {
    omsAntallEndredeDager?: number;
    omsAntallDagerMedTid?: number;
    omsAntallDagerUtenTid?: number;
    endretOmsorgstilbud?: boolean;
    /** Antall dager mellom dagens dato og første dag endret */
    dagerBakoverOms?: number;
    /** Antall dager mellom dagens dato og siste dag endret */
    dagerFremoverOms?: number;
}

export type SøknadApiDataMetadata = {
    antallAktiviteterSomKanEndres: number;
    dagerBakover: number;
    dagerFremover: number;
} & LovbestemtFerieMetadata &
    ArbeidstidMetadata &
    OmsorgstilbudMetadata &
    UkjentArbeidsforholdMetadata &
    ArbeidsgiverIkkeIAaregMetadata & {
        valgtEndreArbeidstid: boolean;
        valgtEndreFerie: boolean;
        valgtEndreOmsorgstilbud: boolean;
        laTilArbeidstidFraOppsummering: boolean;
        gjordeEndringIArbeidstidEtterTillegg: boolean;
        laTilFerieFraOppsummering: boolean;
        gjordeEndringIFerieEtterTillegg: boolean;
        laTilOmsorgstilbudFraOppsummering: boolean;
        gjordeEndringIOmsorgstilbudEtterTillegg: boolean;
    };

const getFørsteDagEndret = (map: ISODateRangeMap<unknown>): ISODate | undefined => {
    return Object.keys(map)
        .map((periode) => periode.split('/')[0])
        .sort()[0];
};
const getSisteDagEndret = (map: ISODateRangeMap<any>): ISODate => {
    const keys = Object.keys(map);
    return keys.map((periode) => periode.split('/')[0]).sort()[keys.length - 1];
};
const getDagerBakover = (map: ISODateRangeMap<any>): number => {
    return Math.abs(dayjs().diff(dayjs(getFørsteDagEndret(map)), 'day'));
};
const getDagerFremover = (map: ISODateRangeMap<any>): number => {
    return Math.abs(dayjs(getSisteDagEndret(map)).diff(dayjs(), 'day'));
};

const getOmsorgstilbudMetadata = (tilsynsordning?: TilsynsordningApiData): OmsorgstilbudMetadata => {
    if (!tilsynsordning) {
        return {
            omsAntallEndredeDager: 0,
        };
    }
    const antallEndredeDager = Object.keys(tilsynsordning.perioder).length;
    const ingenTid = durationToISODuration({ hours: '0', minutes: '0' });
    return {
        omsAntallEndredeDager: antallEndredeDager,
        omsAntallDagerMedTid: Object.values(tilsynsordning.perioder).filter(
            (p) => p.etablertTilsynTimerPerDag !== ingenTid,
        ).length,
        omsAntallDagerUtenTid: Object.values(tilsynsordning.perioder).filter(
            (p) => p.etablertTilsynTimerPerDag === ingenTid,
        ).length,
        endretOmsorgstilbud: antallEndredeDager > 0,
        dagerBakoverOms: getDagerBakover(tilsynsordning.perioder),
        dagerFremoverOms: getDagerFremover(tilsynsordning.perioder),
    };
};

export const getArbeidstidMetadata = (arbeidstid?: ArbeidstidApiData): ArbeidstidMetadata | undefined => {
    const perioder: ISODateRangeMap<any> = {
        ...Object.keys(arbeidstid?.frilanserArbeidstidInfo?.perioder || {}),
    };
    arbeidstid?.arbeidstakerList
        .map((a) => a.arbeidstidInfo.perioder)
        .forEach((p) => {
            Object.keys(p).forEach((d) => {
                perioder[d] = p[d];
            });
        });

    return arbeidstid
        ? {
              endretArbeidstid: oppsummeringStepUtils.harEndringerIArbeidstid(arbeidstid),
              dagerBakoverArb: getDagerBakover(perioder),
              dagerFremoverArb: getDagerFremover(perioder),
          }
        : {
              endretArbeidstid: false,
              dagerBakoverArb: 0,
              dagerFremoverArb: 0,
          };
};

const getUkjentArbeidsforholdMetadata = (søknadsdata: Søknadsdata): UkjentArbeidsforholdMetadata => {
    const ukjentArbeidsforhold = søknadsdata.ukjentArbeidsforhold?.arbeidsforhold || [];
    return {
        antallUkjentArbeidsforhold: ukjentArbeidsforhold.length,
        antallUkjentAnsatt: ukjentArbeidsforhold.filter((a) => a.erAnsatt).length,
        antallUkjentIkkeAnsatt: ukjentArbeidsforhold.filter((a) => a.erAnsatt === false).length,
    };
};

const getFerieMetadata = (lovbestemtFerie?: LovbestemtFerieApiData): LovbestemtFerieMetadata | undefined => {
    if (!lovbestemtFerie) {
        return {
            endretFerie: false,
            lagtTilFerie: false,
            fjernetFerie: false,
        };
    }
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return {
        endretFerie: oppsummeringStepUtils.harEndringerILovbestemtFerieApiData(lovbestemtFerie),
        lagtTilFerie: perioderLagtTil.length > 0,
        fjernetFerie: perioderFjernet.length > 0,
    };
};

const getArbeidsgiverIkkeIAaregMetadata = (sak: Sak): ArbeidsgiverIkkeIAaregMetadata => {
    return {
        antallArbeidsgivereIkkeIAareg: sak.arbeidsaktivitetMedUkjentArbeidsgiver.length,
    };
};

export const getSøknadApiDataMetadata = (
    apiData: SøknadApiData,
    søknadsdata: Søknadsdata,
    valgteEndringer: ValgteEndringer,
    valgteEndringerInitielt: ValgteEndringer,
    sak: Sak,
): SøknadApiDataMetadata => {
    const { arbeidstid, lovbestemtFerie, tilsynsordning } = apiData.ytelse;
    const arbeidstidMetadata = getArbeidstidMetadata(arbeidstid);
    const ferieMetadata = getFerieMetadata(lovbestemtFerie);
    const omsorgstilbudMetadata = getOmsorgstilbudMetadata(tilsynsordning);
    const laTilArbeidstidFraOppsummering =
        valgteEndringerInitielt?.arbeidstid === false && valgteEndringer?.arbeidstid === true;
    const laTilFerieFraOppsummering =
        valgteEndringerInitielt?.lovbestemtFerie === false && valgteEndringer?.lovbestemtFerie === true;
    const laTilOmsorgstilbudFraOppsummering =
        valgteEndringerInitielt?.tilsynsordning === false && valgteEndringer?.tilsynsordning === true;

    const dagerBakover = Math.max(
        arbeidstidMetadata?.dagerBakoverArb ?? 0,
        omsorgstilbudMetadata?.dagerBakoverOms ?? 0,
    );
    const dagerFremover = Math.max(
        arbeidstidMetadata?.dagerFremoverArb ?? 0,
        omsorgstilbudMetadata?.dagerFremoverOms ?? 0,
    );

    return {
        valgtEndreOmsorgstilbud: valgteEndringer?.tilsynsordning || false,
        valgtEndreArbeidstid: valgteEndringer?.arbeidstid || false,
        valgtEndreFerie: valgteEndringer?.lovbestemtFerie || false,
        laTilArbeidstidFraOppsummering,
        gjordeEndringIArbeidstidEtterTillegg:
            laTilArbeidstidFraOppsummering && arbeidstidMetadata?.endretArbeidstid === true,
        laTilFerieFraOppsummering,
        gjordeEndringIFerieEtterTillegg: laTilFerieFraOppsummering && ferieMetadata?.endretFerie === true,
        laTilOmsorgstilbudFraOppsummering,
        gjordeEndringIOmsorgstilbudEtterTillegg:
            laTilOmsorgstilbudFraOppsummering && omsorgstilbudMetadata.endretOmsorgstilbud === true,
        antallAktiviteterSomKanEndres: sak.utledet.aktiviteterSomKanEndres.length,
        ...getUkjentArbeidsforholdMetadata(søknadsdata),
        ...ferieMetadata,
        ...arbeidstidMetadata,
        ...getArbeidsgiverIkkeIAaregMetadata(sak),
        ...omsorgstilbudMetadata,
        dagerBakover,
        dagerFremover,
    };
};

export const getLovbestemtFerieOppsummeringInfo = (lovbestemtFerie: LovbestemtFerieApiData) => {
    const perioder: LovbestemtFeriePeriode[] = Object.keys(lovbestemtFerie.perioder).map(
        (isoDateRange): LovbestemtFeriePeriode => {
            return {
                ...ISODateRangeToDateRange(isoDateRange),
                skalHaFerie: lovbestemtFerie.perioder[isoDateRange].skalHaFerie,
            };
        },
    );
    const perioderLagtTil = perioder.filter((p) => p.skalHaFerie === true);
    const perioderFjernet = perioder.filter((p) => p.skalHaFerie === false);
    return {
        perioderLagtTil,
        perioderFjernet,
    };
};

export type DagMedEndretTilsyn = {
    dato: Date;
    tid: Duration;
    tidOpprinnelig?: Duration;
};

export const getTilsynsordningOppsummeringInfo = (
    tilsynsordning: TilsynsordningApiData,
    tidOpprinnelig?: DateDurationMap,
): DagMedEndretTilsyn[] => {
    const dagerMedEndretTilsyn: DagMedEndretTilsyn[] = [];
    const dagerMedTilsyn: DateDurationMap = {};
    /** Hent ut igjen alle dager som er endret ut fra periodene som sendes inn  */
    Object.keys(tilsynsordning.perioder).forEach((isoDateRange) => {
        const duration = ISODurationToDuration(tilsynsordning.perioder[isoDateRange].etablertTilsynTimerPerDag);
        const dateRange = ISODateRangeToDateRange(isoDateRange);
        getDatesInDateRange(dateRange, true).forEach((dato) => {
            const isoDateKey = dateToISODate(dato);
            dagerMedTilsyn[isoDateKey] = duration;
            const tidDagOpprinnelig = tidOpprinnelig ? tidOpprinnelig[isoDateKey] : undefined;
            const dagMedEndretTilsyn: DagMedEndretTilsyn = {
                dato,
                tid: duration,
                tidOpprinnelig: tidDagOpprinnelig,
            };
            dagerMedEndretTilsyn.push(dagMedEndretTilsyn);
        });
    });
    return dagerMedEndretTilsyn;
};

/** Bug etter lansering av endring i omsorgstilbud
 *  Feilen oppstår når bruker kun velger omsorgstilbud, men har ukjent arbeidsforhold. Da ble ikke
 * steget for arbeidstid vist.
 */

export const harUkjentArbeidsforholdMenHarIkkeBesvartArbeidstid = (sak: Sak, apiData: SøknadApiData): boolean => {
    if (sak.harArbeidsgivereIkkeISak === false) {
        return false;
    }
    if (apiData.ytelse.dataBruktTilUtledning) {
        if (Object.keys(apiData.ytelse.dataBruktTilUtledning).length === 0) {
            return true;
        }
    }
    return false;
};
