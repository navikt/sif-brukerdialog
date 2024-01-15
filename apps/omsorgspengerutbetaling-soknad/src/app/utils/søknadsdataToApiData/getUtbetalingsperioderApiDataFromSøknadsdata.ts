import { FraværDag, FraværPeriode, dateErHelg } from '@navikt/sif-common-forms-ds';
import { Aktivitet, AktivitetFravær, ApiAktivitet } from '../../types/AktivitetFravær';
import { UtbetalingsperiodeApi } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { dateToISODate, decimalTimeToTime, timeToIso8601Duration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { flatten, uniqBy } from 'lodash';
import { DateRange, dateToISOString } from '@navikt/sif-common-formik-ds';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

export const getUtbetalingsperioderApiDataFromSøknadsdata = (søknadsdata: Søknadsdata): UtbetalingsperiodeApi[] => {
    const { fravaer, fravaerFra, arbeidssituasjon } = søknadsdata;

    if (!fravaer) {
        throw Error('fravaerSøknadsdata undefined');
    }
    if (!arbeidssituasjon) {
        throw Error('arbeidssituasjonSøknadsdata undefined');
    }

    const { frilans, selvstendig } = arbeidssituasjon;

    if (!frilans) {
        throw Error('frilansSøknadsdata undefined');
    }

    if (!selvstendig) {
        throw Error('selvstendigSøknadsdata undefined');
    }

    if (frilans.type === 'erIkkeFrilanser' && selvstendig.type === 'erIkkeSN') {
        throw Error('erIkkeFrilanser && erIkkeSN samtidig');
    }
    const erFrilanser = frilans.erFrilanser;
    const erSN = selvstendig.erSelvstendigNæringsdrivende;

    if (erFrilanser && erSN && fravaerFra === undefined) {
        throw Error('fravaerFra er undefined når erFrilanser && erSN');
    }

    const aktivitetFravær = fravaerFra ? fravaerFra.aktivitetFravær : {};

    const apiAktivitet: ApiAktivitet[] = getAktivitetFromAktivitetFravær(aktivitetFravær, erFrilanser, erSN);

    const fraværDager: FraværDag[] =
        fravaer.type === 'harFulltOgDelvisFravær' || fravaer.type === 'harKunDelvisFravær' ? fravaer.fraværDager : [];
    const fraværPerioder: FraværPeriode[] =
        fravaer.type === 'harFulltOgDelvisFravær' || fravaer.type === 'harKunFulltFravær' ? fravaer.fraværPerioder : [];

    if (apiAktivitet.length === 1) {
        return [
            ...fraværDager.map((dag) => mapFraværDagTilUtbetalingsperiodeApi(dag, apiAktivitet)),
            ...fraværPerioder.map((periode) => mapFraværPeriodeTilUtbetalingsperiodeApi(periode, apiAktivitet)),
        ];
    } else if (apiAktivitet.length === 2) {
        return [
            ...fraværDager.map((dag) =>
                mapFraværDagTilUtbetalingsperiodeApi(dag, getApiAktivitetForDag(dag.dato, aktivitetFravær)),
            ),
            ...delFraværPerioderOppIDager(fraværPerioder).map((periodeDag) =>
                mapFraværPeriodeTilUtbetalingsperiodeApi(
                    periodeDag,
                    getApiAktivitetForDag(periodeDag.fraOgMed, aktivitetFravær),
                ),
            ),
        ];
    } else {
        throw new Error('Missing aktivitet');
    }
};

export const getAktivitetFromAktivitetFravær = (
    aktivitetFravær: AktivitetFravær,
    erFrilanser: boolean,
    erSelvstendigNæringsdrivende: boolean,
): ApiAktivitet[] => {
    if (erFrilanser && !erSelvstendigNæringsdrivende) {
        return [ApiAktivitet.FRILANSER];
    }
    if (erSelvstendigNæringsdrivende && !erFrilanser) {
        return [ApiAktivitet.SELVSTENDIG_VIRKSOMHET];
    }
    return [
        ...(harFraværSomFrilanser(aktivitetFravær) ? [ApiAktivitet.FRILANSER] : []),
        ...(harFraværSomSN(aktivitetFravær) ? [ApiAktivitet.SELVSTENDIG_VIRKSOMHET] : []),
    ];
};

const harFraværSomFrilanser = (dager: AktivitetFravær) => {
    return Object.keys(dager).map((aktivitet) => aktivitet === Aktivitet.BEGGE || aktivitet === Aktivitet.FRILANSER);
};

const harFraværSomSN = (fraværFraDag: AktivitetFravær) => {
    return Object.keys(fraværFraDag).map(
        (aktivitet) => aktivitet === Aktivitet.BEGGE || aktivitet === Aktivitet.SELVSTENDIG_VIRKSOMHET,
    );
};

const mapFraværDagTilUtbetalingsperiodeApi = (
    fraværDag: FraværDag,
    aktivitetFravær: ApiAktivitet[],
): UtbetalingsperiodeApi => {
    return {
        fraOgMed: dateToISODate(fraværDag.dato),
        tilOgMed: dateToISODate(fraværDag.dato),
        antallTimerPlanlagt: timeToIso8601Duration(decimalTimeToTime(parseFloat(fraværDag.timerArbeidsdag))),
        antallTimerBorte: timeToIso8601Duration(decimalTimeToTime(parseFloat(fraværDag.timerFravær))),
        aktivitetFravær,
        årsak: 'ORDINÆRT_FRAVÆR',
    };
};

const mapFraværPeriodeTilUtbetalingsperiodeApi = (
    periode: FraværPeriode,
    aktivitetFravær: ApiAktivitet[],
): UtbetalingsperiodeApi => {
    return {
        fraOgMed: dateToISODate(periode.fraOgMed),
        tilOgMed: dateToISODate(periode.tilOgMed),
        antallTimerPlanlagt: null,
        antallTimerBorte: null,
        aktivitetFravær,
        årsak: 'ORDINÆRT_FRAVÆR',
    };
};

const getApiAktivitetFromAktivitet = (aktivitet: Aktivitet): ApiAktivitet[] => {
    switch (aktivitet) {
        case Aktivitet.BEGGE:
            return [ApiAktivitet.SELVSTENDIG_VIRKSOMHET, ApiAktivitet.FRILANSER];
        case Aktivitet.SELVSTENDIG_VIRKSOMHET:
            return [ApiAktivitet.SELVSTENDIG_VIRKSOMHET];
        case Aktivitet.FRILANSER:
            return [ApiAktivitet.FRILANSER];
    }
};

const getApiAktivitetForDag = (dato: Date, fravær: AktivitetFravær): ApiAktivitet[] => {
    const dateString = dateToISOString(dato);
    const aktivitetFravær = fravær[dateString];
    if (!aktivitetFravær) {
        throw new Error('Missing aktivitet for date');
    }
    return getApiAktivitetFromAktivitet(aktivitetFravær.aktivitet);
};

const delFraværPerioderOppIDager = (perioder: FraværPeriode[]): FraværPeriode[] => {
    return flatten(perioder.map((p) => delFraværPeriodeOppIDager(p)));
};

const delFraværPeriodeOppIDager = (periode: FraværPeriode): FraværPeriode[] => {
    const datoer = getUtbetalingsdatoerFraFravær([periode], []);
    return datoer.map((dato) => ({
        ...periode,
        fraOgMed: dato,
        tilOgMed: dato,
    }));
};

const getUtbetalingsdatoerFraFravær = (perioder: FraværPeriode[], dager: FraværDag[]): Date[] => {
    const datoerIPeriode = perioder.map((p) => getDatesWithinDateRange({ from: p.fraOgMed, to: p.tilOgMed }));

    const datoer: Date[] = uniqBy([...flatten(datoerIPeriode), ...dager.map((d) => d.dato)], (d) => {
        return dateToISOString(d);
    });
    datoer;
    return datoer.filter((d) => dateErHelg(d) === false).sort(sortByDate);
};

const sortByDate = (d1: Date, d2: Date): number => (dayjs(d1).isAfter(d2, 'day') ? 1 : -1);

const getDatesWithinDateRange = ({ from, to }: DateRange): Date[] => {
    const dates: Date[] = [];
    let currentDate: Date = from;
    if (dayjs(from).isAfter(to)) {
        throw new Error('From date cannot be after to date');
    }
    while (dayjs(currentDate).isSameOrBefore(to)) {
        dates.push(currentDate);
        currentDate = dayjs(currentDate).add(1, 'day').toDate();
    }
    return dates;
};
