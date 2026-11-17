import { K9Format, K9FormatArbeidstaker, K9FormatArbeidstidInfo, SøknadApiData } from '@app/types';
import dayjs from 'dayjs';

type PeriodeMap<T> = Record<string, T>;

const ISO_DATE = 'YYYY-MM-DD';

const erHelg = (dato: dayjs.Dayjs) => dato.day() === 0 || dato.day() === 6;

/** Dager i en ISODateRange. Arbeidstid gjelder kun hverdager, ferie gjelder alle dager. */
const getDager = (isoDateRange: string, kunHverdager: boolean): string[] => {
    const [fra, til] = isoDateRange.split('/');
    const dager: string[] = [];
    for (let dato = dayjs(fra); !dato.isAfter(dayjs(til), 'day'); dato = dato.add(1, 'day')) {
        if (!kunHverdager || !erHelg(dato)) {
            dager.push(dato.format(ISO_DATE));
        }
    }
    return dager;
};

const tilDagMap = <T>(perioder: PeriodeMap<T>, kunHverdager: boolean): PeriodeMap<T> =>
    Object.fromEntries(
        Object.entries(perioder).flatMap(([periode, verdi]) =>
            getDager(periode, kunHverdager).map((dag) => [dag, verdi]),
        ),
    );

/** Slår sammen påfølgende dager med lik verdi til perioder. For hverdager hoppes helgen over. */
const tilPeriodeMap = <T>(dagMap: PeriodeMap<T>, kunHverdager: boolean): PeriodeMap<T> => {
    const perioder: PeriodeMap<T> = {};
    let fra: string | undefined;
    let til: string | undefined;

    const lukkPeriode = () => {
        if (fra && til) {
            perioder[`${fra}/${til}`] = dagMap[fra];
        }
    };

    Object.keys(dagMap)
        .sort()
        .forEach((dag) => {
            const nesteDagEtterTil = til ? dayjs(til).add(1, 'day') : undefined;
            const forventetNesteDag =
                kunHverdager && nesteDagEtterTil?.day() === 6 ? nesteDagEtterTil.add(2, 'day') : nesteDagEtterTil;
            const henger = forventetNesteDag?.format(ISO_DATE) === dag;
            const likVerdi = fra !== undefined && JSON.stringify(dagMap[fra]) === JSON.stringify(dagMap[dag]);

            if (henger && likVerdi) {
                til = dag;
            } else {
                lukkPeriode();
                fra = dag;
                til = dag;
            }
        });
    lukkPeriode();
    return perioder;
};

/** Innsendte perioder overskriver eksisterende perioder dag for dag. */
const flettPerioder = <T>(
    eksisterende: PeriodeMap<T> = {},
    endringer: PeriodeMap<T> = {},
    kunHverdager: boolean,
    behold: (verdi: T) => boolean = () => true,
): PeriodeMap<T> => {
    const dager = { ...tilDagMap(eksisterende, kunHverdager), ...tilDagMap(endringer, kunHverdager) };
    const beholdteDager = Object.fromEntries(Object.entries(dager).filter(([, verdi]) => behold(verdi)));
    return tilPeriodeMap(beholdteDager, kunHverdager);
};

/** Fjerner hjelpefelt (prefikset med _) som kun finnes i innsendingen. */
const tilK9ArbeidstidPerioder = (perioder: PeriodeMap<any> = {}) =>
    Object.fromEntries(
        Object.entries(perioder).map(([periode, { jobberNormaltTimerPerDag, faktiskArbeidTimerPerDag }]) => [
            periode,
            { jobberNormaltTimerPerDag, faktiskArbeidTimerPerDag },
        ]),
    );

const flettArbeidstidInfo = (
    eksisterende: K9FormatArbeidstidInfo | null | undefined,
    endring: { perioder: PeriodeMap<any> } | undefined,
): K9FormatArbeidstidInfo | null | undefined => {
    if (!endring) {
        return eksisterende;
    }
    return {
        perioder: flettPerioder(eksisterende?.perioder, tilK9ArbeidstidPerioder(endring.perioder), true),
    };
};

const flettArbeidstakere = (
    eksisterende: K9FormatArbeidstaker[],
    endringer: SøknadApiData['ytelse']['arbeidstid'],
): K9FormatArbeidstaker[] => {
    const arbeidstakere = [...eksisterende];
    endringer?.arbeidstakerList.forEach((endring) => {
        const index = arbeidstakere.findIndex((a) => a.organisasjonsnummer === endring.organisasjonsnummer);
        if (index >= 0) {
            arbeidstakere[index] = {
                ...arbeidstakere[index],
                arbeidstidInfo: flettArbeidstidInfo(arbeidstakere[index].arbeidstidInfo, endring.arbeidstidInfo)!,
            };
        } else {
            arbeidstakere.push({
                norskIdentitetsnummer: null,
                organisasjonsnummer: endring.organisasjonsnummer,
                arbeidstidInfo: { perioder: tilK9ArbeidstidPerioder(endring.arbeidstidInfo.perioder) },
            });
        }
    });
    return arbeidstakere;
};

/**
 * Brukes kun av mock (lokalt og gh-pages): oppdaterer saken slik backend ville gjort etter innsending,
 * slik at endringene ligger i saken neste gang bruker åpner dialogen.
 */
export const oppdaterSakMedEndringsmelding = (sak: K9Format, endringsmelding: SøknadApiData): K9Format => {
    const { ytelse } = sak.søknad;
    const { arbeidstid, lovbestemtFerie, tilsynsordning } = endringsmelding.ytelse;

    return {
        ...sak,
        søknad: {
            ...sak.søknad,
            mottattDato: new Date().toISOString(),
            ytelse: {
                ...ytelse,
                arbeidstid: arbeidstid
                    ? {
                          arbeidstakerList: flettArbeidstakere(ytelse.arbeidstid.arbeidstakerList, arbeidstid),
                          frilanserArbeidstidInfo:
                              flettArbeidstidInfo(
                                  ytelse.arbeidstid.frilanserArbeidstidInfo,
                                  arbeidstid.frilanserArbeidstidInfo,
                              ) ?? null,
                          selvstendigNæringsdrivendeArbeidstidInfo:
                              flettArbeidstidInfo(
                                  ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo,
                                  arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo,
                              ) ?? null,
                      }
                    : ytelse.arbeidstid,
                lovbestemtFerie: lovbestemtFerie
                    ? {
                          perioder: flettPerioder(
                              ytelse.lovbestemtFerie.perioder,
                              lovbestemtFerie.perioder,
                              false,
                              ({ skalHaFerie }) => skalHaFerie,
                          ),
                      }
                    : ytelse.lovbestemtFerie,
                tilsynsordning: tilsynsordning
                    ? { perioder: flettPerioder(ytelse.tilsynsordning.perioder, tilsynsordning.perioder, false) }
                    : ytelse.tilsynsordning,
            },
        },
    };
};

/** Oppdaterer saken som gjelder barnet i endringsmeldingen. Øvrige saker beholdes uendret. */
export const oppdaterSakerMedEndringsmelding = (saker: K9Format[], endringsmelding: SøknadApiData): K9Format[] =>
    saker.map((sak) =>
        sak.barn.identitetsnummer === endringsmelding.ytelse.barn.norskIdentitetsnummer
            ? oppdaterSakMedEndringsmelding(sak, endringsmelding)
            : sak,
    );
