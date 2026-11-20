import { ArbeidstidUkerItem } from '@app/modules/arbeidstid-uker/types/ArbeidstidUkerItem';
import {
    ArbeidsgiverMedAnsettelseperioder,
    ArbeidstidApiData,
    ArbeidstidPeriodeApiData,
    ArbeidstidPeriodeApiDataMap,
    LovbestemtFerieApiData,
    Sak,
    TilsynsordningApiData,
    UkjentArbeidsforholdApiData,
} from '@app/types';
import {
    DagMedEndretTilsyn,
    erKortArbeidsuke,
    getLovbestemtFerieOppsummeringInfo,
    getTilsynsordningOppsummeringInfo,
    getTimerPerUkeFraTimerPerDag,
} from '@app/utils';
import {
    dateFormatter,
    getDatesInDateRange,
    ISODateRange,
    ISODateRangeToDateRange,
    ISODurationToDecimalDuration,
    ISODurationToDuration,
} from '@navikt/sif-common-utils';

const harEndringerIArbeidstid = (arbeidstid?: ArbeidstidApiData): boolean => {
    if (!arbeidstid) {
        return false;
    }
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    return (
        (arbeidstakerList !== undefined && arbeidstakerList.length > 0) ||
        frilanserArbeidstidInfo !== undefined ||
        selvstendigNæringsdrivendeArbeidstidInfo !== undefined
    );
};

const harEndringerILovbestemtFerieApiData = (lovbestemtFerie?: LovbestemtFerieApiData): boolean => {
    if (!lovbestemtFerie) {
        return false;
    }
    return Object.keys(lovbestemtFerie.perioder).length > 0;
};

const harEndringerITilsynsordningApiData = (tilsynsordning?: TilsynsordningApiData): boolean => {
    if (!tilsynsordning) {
        return false;
    }
    return Object.keys(tilsynsordning.perioder).length > 0;
};

const getArbeidsukeListItemFromArbeidstidPeriodeApiData = (
    {
        faktiskArbeidTimerPerDag,
        _opprinneligFaktiskPerDag,
        _opprinneligNormaltPerDag,
    }: ArbeidstidPeriodeApiData,
    isoDateRange: ISODateRange,
): ArbeidstidUkerItem => {
    const periode = ISODateRangeToDateRange(isoDateRange);
    const antallDagerMedArbeidstid = getDatesInDateRange(periode).length;

    const arbeidsuke: ArbeidstidUkerItem = {
        id: isoDateRange,
        kanEndres: false,
        kanVelges: false,
        isoDateRange,
        periode,
        antallDagerMedArbeidstid,
        erKortUke: erKortArbeidsuke(periode),
        opprinnelig: {
            normalt: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(_opprinneligNormaltPerDag),
                antallDagerMedArbeidstid,
            ),
            faktisk: _opprinneligFaktiskPerDag
                ? getTimerPerUkeFraTimerPerDag(
                      ISODurationToDuration(_opprinneligFaktiskPerDag),
                      antallDagerMedArbeidstid,
                  )
                : undefined,
        },
        endret: {
            faktisk: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(faktiskArbeidTimerPerDag),
                antallDagerMedArbeidstid,
            ),
        },
    };
    return arbeidsuke;
};

const getArbeidstidUkerItems = (perioder: ArbeidstidPeriodeApiDataMap): ArbeidstidUkerItem[] => {
    const arbeidsuker: ArbeidstidUkerItem[] = [];
    Object.keys(perioder)
        .sort()
        .forEach((isoDateRange) => {
            arbeidsuker.push(getArbeidsukeListItemFromArbeidstidPeriodeApiData(perioder[isoDateRange], isoDateRange));
        });
    return arbeidsuker;
};

const erArbeidstidInfoGyldig = (perioderMap: ArbeidstidPeriodeApiDataMap): boolean => {
    return Object.keys(perioderMap)
        .map((key) => perioderMap[key])
        .some((value) => {
            const duration = ISODurationToDecimalDuration(value.faktiskArbeidTimerPerDag);
            return duration !== undefined && duration <= 24;
        });
};

const erArbeidstidEndringerGyldig = (arbeidstid?: ArbeidstidApiData): boolean => {
    if (arbeidstid === undefined) {
        return true;
    }
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    return [
        ...arbeidstakerList.map((a) => a.arbeidstidInfo),
        frilanserArbeidstidInfo,
        selvstendigNæringsdrivendeArbeidstidInfo,
    ].every((info) => info === undefined || erArbeidstidInfoGyldig(info.perioder));
};

/** Antall arbeidsforhold (arbeidstaker, frilans og selvstendig) med minst én periode med endret arbeidstid */
const getAntallArbeidsforholdMedEndretArbeidstid = (arbeidstid?: ArbeidstidApiData): number => {
    if (!arbeidstid) {
        return 0;
    }
    return [
        ...arbeidstid.arbeidstakerList.map((a) => a.arbeidstidInfo.perioder),
        arbeidstid.frilanserArbeidstidInfo?.perioder,
        arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo?.perioder,
    ].filter((perioder) => perioder && Object.keys(perioder).length > 0).length;
};

const getFerieEndringer = (lovbestemtFerie?: LovbestemtFerieApiData) => {
    if (!lovbestemtFerie) {
        return { harLagtTil: false, harFjernet: false };
    }
    const { perioderLagtTil, perioderFjernet } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return { harLagtTil: perioderLagtTil.length > 0, harFjernet: perioderFjernet.length > 0 };
};

/** Arbeidsforhold i saken pluss nye arbeidsforhold bruker har lagt inn */
const getAntallArbeidsforholdTotalt = (sak: Sak, arbeidstid?: ArbeidstidApiData): number =>
    sak.utledet.aktiviteterSomKanEndres.length +
    (arbeidstid?.arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold).length ?? 0);

export type NyttArbeidsforhold = {
    arbeidsgiver: ArbeidsgiverMedAnsettelseperioder;
    arbeidsforhold: UkjentArbeidsforholdApiData;
};

/** Arbeidsgivere som ikke er i saken, og som bruker har svart på */
const getNyeArbeidsforhold = (
    arbeidsgivereIkkeISak: ArbeidsgiverMedAnsettelseperioder[],
    ukjenteArbeidsforhold: UkjentArbeidsforholdApiData[] = [],
): NyttArbeidsforhold[] =>
    arbeidsgivereIkkeISak.flatMap((arbeidsgiver) => {
        const arbeidsforhold = ukjenteArbeidsforhold.find(
            (u) => u.organisasjonsnummer === arbeidsgiver.organisasjonsnummer,
        );
        return arbeidsforhold ? [{ arbeidsgiver, arbeidsforhold }] : [];
    });

export type OppsummeringEndringer = {
    ferie: boolean;
    arbeidstid: boolean;
    tilsynsordning: boolean;
};

const getEndringer = ({
    lovbestemtFerie,
    arbeidstid,
    tilsynsordning,
}: {
    lovbestemtFerie?: LovbestemtFerieApiData;
    arbeidstid?: ArbeidstidApiData;
    tilsynsordning?: TilsynsordningApiData;
}): OppsummeringEndringer => ({
    ferie: harEndringerILovbestemtFerieApiData(lovbestemtFerie),
    arbeidstid: getAntallArbeidsforholdMedEndretArbeidstid(arbeidstid) > 0,
    tilsynsordning: harEndringerITilsynsordningApiData(tilsynsordning),
});

type MånedMedDagerMedEndretTilsyn = {
    måned: Date;
    dagerMedEndretTilsyn: DagMedEndretTilsyn[];
};
const getMånederMedDagerEndretTilsyn = (
    tilsynsordning: TilsynsordningApiData,
): MånedMedDagerMedEndretTilsyn[] => {
    const dagerMedEndretTilsyn = getTilsynsordningOppsummeringInfo(tilsynsordning);

    const månederMedDager: Record<string, MånedMedDagerMedEndretTilsyn> = {};
    for (const dag of dagerMedEndretTilsyn) {
        const måned = dateFormatter.monthFullYear(dag.dato);
        if (!månederMedDager[måned]) {
            månederMedDager[måned] = { måned: dag.dato, dagerMedEndretTilsyn: [] };
        }
        månederMedDager[måned].dagerMedEndretTilsyn.push(dag);
    }
    return Object.values(månederMedDager);
};

export const oppsummeringStepUtils = {
    getArbeidstidUkerItems,
    harEndringerILovbestemtFerieApiData,
    harEndringerIArbeidstid,
    harEndringerITilsynsordningApiData,
    erArbeidstidEndringerGyldig,
    getAntallArbeidsforholdMedEndretArbeidstid,
    getAntallArbeidsforholdTotalt,
    getEndringer,
    getFerieEndringer,
    getMånederMedDagerEndretTilsyn,
    getNyeArbeidsforhold,
};
