import {
    DateRange,
    dateRangeToISODateRange,
    Duration,
    durationToISODuration,
    getDateRangesFromDates,
    ISODateToDate,
    sortDateRange,
} from '@navikt/sif-common-utils';
import { getArbeidsukerIArbeidAktivitet } from '../../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { ArbeiderIPeriodenSvar } from '../../types/arbeiderIPeriodenSvar';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import { ArbeidstidEndring, ArbeidstidEndringMap } from '../../types/ArbeidstidEndring';
import {
    ArbeidAktivitet,
    ArbeidAktiviteter,
    ArbeidAktivitetType,
    Arbeidsuke,
    ArbeidsukeMap,
    PeriodeMedArbeidstid,
} from '../../types/Sak';
import {
    ArbeidstakerApiData,
    ArbeidstidApiData,
    ArbeidstidPeriodeApiDataMap,
} from '../../types/søknadApiData/SøknadApiData';
import { ArbeidssituasjonSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { ArbeidAktivitetEndringMap } from '../../types/søknadsdata/ArbeidstidSøknadsdata';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { getDagerFraEnkeltdagMap } from '../arbeidsukeUtils';
import { beregnEndretFaktiskArbeidstidPerDag, beregnSnittTimerPerDag } from '../beregnUtils';
import { getArbeidAktivitetForUkjentArbeidsgiver } from '../ukjentArbeidsgiverUtils';

type ArbeidstidInfo = { perioder: ArbeidstidPeriodeApiDataMap };

const getAlleArbeidsukerIPerioder = (perioder: PeriodeMedArbeidstid[]): ArbeidsukeMap => {
    const arbeidsukerMap: ArbeidsukeMap = {};
    perioder.forEach(({ arbeidsuker }) => {
        Object.keys(arbeidsuker).forEach((key) => {
            arbeidsukerMap[key] = arbeidsuker[key];
        });
    });
    return arbeidsukerMap;
};

const getEndretArbeidstid = (
    endringUkeMap: ArbeidstidEndringMap,
    arbeidAktivitet: ArbeidAktivitet
): ArbeidstidPeriodeApiDataMap => {
    const perioderMedEndretArbeidstid: ArbeidstidPeriodeApiDataMap = {};

    const endringKeys = Object.keys(endringUkeMap).sort();

    endringKeys.forEach((isoDateRange) => {
        const endring = endringUkeMap[isoDateRange];
        const arbeidsuker = getAlleArbeidsukerIPerioder(arbeidAktivitet.perioderMedArbeidstid);
        const arbeidsuke = arbeidsuker[isoDateRange];
        const dagerSøktFor = getDagerFraEnkeltdagMap(arbeidsuke.arbeidstidEnkeltdager);
        const { antallDagerMedArbeidstid } = arbeidsuke;

        const jobberNormaltTimerPerDag = beregnSnittTimerPerDag(arbeidsuke.normalt.uke, antallDagerMedArbeidstid);
        const faktiskArbeidTimerPerDag = beregnEndretFaktiskArbeidstidPerDag(
            arbeidsuke.normalt.uke,
            endring,
            antallDagerMedArbeidstid
        );

        /** Splitt opp dersom det er enkeltdager i uken */
        const perioder = getDateRangesFromDates(dagerSøktFor.map(ISODateToDate));
        perioder.sort(sortDateRange).forEach((periode) => {
            perioderMedEndretArbeidstid[dateRangeToISODateRange(periode)] = {
                jobberNormaltTimerPerDag: durationToISODuration(jobberNormaltTimerPerDag),
                faktiskArbeidTimerPerDag: durationToISODuration(faktiskArbeidTimerPerDag),
                _endretProsent: endring.type === TimerEllerProsent.PROSENT ? endring.prosent : undefined,
                _opprinneligNormaltPerDag: durationToISODuration(arbeidsuke.normalt.dag),
                _opprinneligFaktiskPerDag: arbeidsuke.faktisk
                    ? durationToISODuration(arbeidsuke.faktisk.dag)
                    : undefined,
            };
        });
    });

    return perioderMedEndretArbeidstid;
};

const getArbeidAktivitetArbeidstidInfo = (
    aktivitet: ArbeidAktivitet,
    aktivitetEndring?: ArbeidstidEndringMap
): ArbeidstidInfo | undefined => {
    if (aktivitetEndring && aktivitet && Object.keys(aktivitetEndring).length > 0) {
        return {
            perioder: getEndretArbeidstid(aktivitetEndring, aktivitet),
        };
    }
    return undefined;
};

export const getArbeidstidApiDataFromSøknadsdata = (
    søknadsperioder: DateRange[],
    arbeidAktivitetEndring: ArbeidAktivitetEndringMap,
    arbeidAktiviteter: ArbeidAktiviteter,
    ukjenteArbeidsgivere: Arbeidsgiver[],
    arbeidssituasjon?: ArbeidssituasjonSøknadsdata
): ArbeidstidApiData => {
    const frilansAktivitetEndring = arbeidAktivitetEndring[ArbeidAktivitetType.frilanser]?.endringer;
    const selvstendigNæringsdrivendeAktivitetEndring =
        arbeidAktivitetEndring[ArbeidAktivitetType.selvstendigNæringsdrivende]?.endringer;
    const arbeidstakerList: ArbeidstakerApiData[] = [];

    /** Eksisterende arbeidsaktiviteter */
    arbeidAktiviteter.arbeidstakerAktiviteter.forEach((aktivitet) => {
        const endringer = arbeidAktivitetEndring[aktivitet.key]?.endringer;

        if (endringer) {
            const {
                arbeidsgiver: { organisasjonsnummer },
            } = aktivitet;
            const arbeidstidInfo = getArbeidAktivitetArbeidstidInfo(aktivitet, endringer);
            if (arbeidstidInfo) {
                arbeidstakerList.push({
                    organisasjonsnummer,
                    arbeidstidInfo,
                    _erUkjentArbeidsaktivitet: false,
                });
            }
        }
    });

    /** Ukjente arbeidsgivere */
    if (arbeidssituasjon) {
        ukjenteArbeidsgivere.forEach((arbeidsgiver) => {
            const endring = arbeidAktivitetEndring[arbeidsgiver.key];
            if (!endring) {
                return;
            }
            const { arbeiderIPerioden } = endring;
            const arbeidsforhold = arbeidssituasjon.arbeidsforhold.find((a) => a.arbeidsgiverKey === arbeidsgiver.key);
            if (!arbeidsforhold || !arbeiderIPerioden) {
                throw 'Ukjent arbeidsgiver mangler informasjon om arbeidstid';
            }
            if (arbeidsforhold.erAnsatt === false) {
                return;
            }

            const arbeidAktivitet = getArbeidAktivitetForUkjentArbeidsgiver(
                søknadsperioder,
                arbeidsgiver,
                arbeidsforhold
            );

            const arbeidsuker = getArbeidsukerIArbeidAktivitet(arbeidAktivitet);
            const arbeidstidInfo: ArbeidstidInfo = {
                perioder: {},
            };
            Object.keys(arbeidsuker).forEach((key) => {
                const arbeidsuke = arbeidsuker[key];
                const ukeEndring = endring.endringer[key];

                const faktiskArbeidTimerPerDag = getFaktiskArbeidTimerPerDagForUkjentArbeidsgiver(
                    arbeiderIPerioden,
                    arbeidsuke,
                    ukeEndring
                );

                const jobberNormaltTimerPerDag = beregnSnittTimerPerDag(
                    arbeidsuke.normalt.uke,
                    arbeidsuke.antallDagerMedArbeidstid
                );

                /** Splitt opp dersom det er enkeltdager i uken */
                const dagerSøktFor = getDagerFraEnkeltdagMap(arbeidsuke.arbeidstidEnkeltdager);
                const perioder = getDateRangesFromDates(dagerSøktFor.map(ISODateToDate));
                perioder.sort(sortDateRange).forEach((periode) => {
                    arbeidstidInfo.perioder[dateRangeToISODateRange(periode)] = {
                        jobberNormaltTimerPerDag: durationToISODuration(jobberNormaltTimerPerDag),
                        faktiskArbeidTimerPerDag: durationToISODuration(faktiskArbeidTimerPerDag),
                        _endretProsent:
                            ukeEndring !== undefined && ukeEndring.type === TimerEllerProsent.PROSENT
                                ? ukeEndring.prosent
                                : undefined,
                        _opprinneligNormaltPerDag: durationToISODuration(arbeidsuke.normalt.dag),
                        _opprinneligFaktiskPerDag: arbeidsuke.faktisk
                            ? durationToISODuration(arbeidsuke.faktisk.dag)
                            : undefined,
                    };
                });
            });

            arbeidstakerList.push({
                _erUkjentArbeidsaktivitet: true,
                _arbeiderIPerioden: arbeiderIPerioden,
                arbeidstidInfo,
                organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
            });
        });
    }

    return {
        arbeidstakerList,
        frilanserArbeidstidInfo: arbeidAktiviteter.frilanser
            ? getArbeidAktivitetArbeidstidInfo(arbeidAktiviteter.frilanser, frilansAktivitetEndring)
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: arbeidAktiviteter.selvstendigNæringsdrivende
            ? getArbeidAktivitetArbeidstidInfo(
                  arbeidAktiviteter.selvstendigNæringsdrivende,
                  selvstendigNæringsdrivendeAktivitetEndring
              )
            : undefined,
    };
};

export const getFaktiskArbeidTimerPerDagForUkjentArbeidsgiver = (
    arbeiderIPerioden: ArbeiderIPeriodenSvar,
    arbeidsuke: Pick<Arbeidsuke, 'normalt' | 'antallDagerMedArbeidstid'>,
    endring?: ArbeidstidEndring
): Duration => {
    if (!endring && arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert) {
        throw 'Faktisk arbeidstid mangler for redusert arbeidsforhold';
    }
    if (endring) {
        return beregnEndretFaktiskArbeidstidPerDag(
            arbeidsuke.normalt.uke,
            endring,
            arbeidsuke.antallDagerMedArbeidstid
        );
    }
    return arbeiderIPerioden === ArbeiderIPeriodenSvar.heltFravær
        ? {
              hours: '0',
              minutes: '0',
          }
        : arbeidsuke.normalt.dag;
};
