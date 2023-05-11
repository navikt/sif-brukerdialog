import {
    DateRange,
    dateRangeToISODateRange,
    durationToISODuration,
    getDateRangesFromDates,
    ISODateToDate,
    sortDateRange,
} from '@navikt/sif-common-utils';
import { Arbeidsgiver, ArbeidsgiverType } from '../../types/Arbeidsgiver';
import { ArbeidstidEndringMap } from '../../types/ArbeidstidEndring';
import {
    ArbeidAktivitet,
    ArbeidAktiviteter,
    ArbeidAktivitetType,
    ArbeidsukeMap,
    PeriodeMedArbeidstid,
} from '../../types/Sak';
import {
    ArbeidstakerApiData,
    ArbeidstidApiData,
    ArbeidstidPeriodeApiDataMap,
} from '../../types/søknadApiData/SøknadApiData';
import { ArbeidssituasjonSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { ArbeidstidSøknadsdata } from '../../types/søknadsdata/ArbeidstidSøknadsdata';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { getDagerFraEnkeltdagMap } from '../arbeidsukeUtils';
import { beregnEndretFaktiskArbeidstidPerDag, beregnSnittTimerPerDag } from '../beregnUtils';
import { getArbeidAktivitetForUkjentArbeidsgiver } from '../ukjentArbeidsgiverUtils';
import { getArbeidsukerIArbeidAktivitet } from '../../søknad/steps/arbeidstid/arbeidstidStepUtils';

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
                _opprinneligFaktiskPerDag: durationToISODuration(arbeidsuke.faktisk.dag),
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
    { arbeidAktivitetEndring }: ArbeidstidSøknadsdata,
    arbeidAktiviteter: ArbeidAktiviteter,
    ukjenteArbeidsgivere: Arbeidsgiver[],
    arbeidssituasjon?: ArbeidssituasjonSøknadsdata
): ArbeidstidApiData => {
    const frilansAktivitetEndring = arbeidAktivitetEndring[ArbeidAktivitetType.frilanser];
    const selvstendigNæringsdrivendeAktivitetEndring =
        arbeidAktivitetEndring[ArbeidAktivitetType.selvstendigNæringsdrivende];
    const arbeidstakerList: ArbeidstakerApiData[] = [];

    /** Eksisterende arbeidsaktiviteter */
    arbeidAktiviteter.arbeidstakerAktiviteter.forEach((aktivitet) => {
        const endring = arbeidAktivitetEndring[aktivitet.id];

        if (endring) {
            const {
                arbeidsgiver: { type, id: organisasjonsnummer },
            } = aktivitet;
            const arbeidstidInfo = getArbeidAktivitetArbeidstidInfo(aktivitet, endring);
            if (arbeidstidInfo) {
                arbeidstakerList.push({
                    organisasjonsnummer,
                    norskIdentitetsnummer: type === ArbeidsgiverType.PRIVATPERSON ? organisasjonsnummer : undefined,
                    arbeidstidInfo,
                    _erUkjentArbeidsaktivitet: false,
                });
            }
        }
    });

    /** Ukjente arbeidsgivere */
    if (arbeidssituasjon) {
        ukjenteArbeidsgivere.forEach((arbeidsgiver) => {
            const { type, id: organisasjonsnummer } = arbeidsgiver;
            const arbeidsforhold = arbeidssituasjon.arbeidsforhold.find(
                (a) => a.arbeidsgiverId === organisasjonsnummer
            );
            if (!arbeidsforhold) {
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

            const endring = arbeidAktivitetEndring[organisasjonsnummer];
            const arbeidsuker = getArbeidsukerIArbeidAktivitet(arbeidAktivitet);
            const arbeidstidInfo: ArbeidstidInfo = {
                perioder: {},
            };
            Object.keys(arbeidsuker).forEach((key) => {
                const arbeidsuke = arbeidsuker[key];
                const ukeEndring = endring ? endring[key] : undefined;

                const faktiskArbeidTimerPerDag = ukeEndring
                    ? beregnEndretFaktiskArbeidstidPerDag(
                          arbeidsuke.normalt.uke,
                          ukeEndring,
                          arbeidsuke.antallDagerMedArbeidstid
                      )
                    : arbeidsuke.faktisk.dag;

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
                        _opprinneligFaktiskPerDag: durationToISODuration(arbeidsuke.faktisk.dag),
                    };
                });
            });

            arbeidstakerList.push({
                _erUkjentArbeidsaktivitet: true,
                arbeidstidInfo,
                organisasjonsnummer,
                norskIdentitetsnummer: type === ArbeidsgiverType.PRIVATPERSON ? organisasjonsnummer : undefined,
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
