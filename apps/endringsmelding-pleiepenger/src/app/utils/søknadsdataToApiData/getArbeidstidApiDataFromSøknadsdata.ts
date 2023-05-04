import {
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
import { ArbeidstidSøknadsdata } from '../../types/søknadsdata/ArbeidstidSøknadsdata';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { getDagerFraEnkeltdagMap } from '../arbeidsukeUtils';
import { beregnEndretFaktiskArbeidstidPerDag, beregnSnittTimerPerDag } from '../beregnUtils';

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
    aktivitetEndring?: ArbeidstidEndringMap,
    aktivitet?: ArbeidAktivitet
): { perioder: ArbeidstidPeriodeApiDataMap } | undefined => {
    if (aktivitetEndring && aktivitet && Object.keys(aktivitetEndring).length > 0) {
        return {
            perioder: getEndretArbeidstid(aktivitetEndring, aktivitet),
        };
    }
    return undefined;
};

const getNyArbeidsgiverArbeidstidInfo = (
    endring: ArbeidstidEndringMap,
    arbeidsgiver: Arbeidsgiver
): { perioder: ArbeidstidPeriodeApiDataMap } | undefined => {
    // eslint-disable-next-line no-console
    console.log(endring, arbeidsgiver);

    return undefined;
};

export const getArbeidstidApiDataFromSøknadsdata = (
    { arbeidAktivitetEndring }: ArbeidstidSøknadsdata,
    arbeidAktiviteter: ArbeidAktiviteter,
    nyeArbeidsgivere: Arbeidsgiver[]
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
                arbeidsgiver: { type, organisasjonsnummer },
            } = aktivitet;
            const arbeidstidInfo = getArbeidAktivitetArbeidstidInfo(endring, aktivitet);
            if (arbeidstidInfo) {
                arbeidstakerList.push({
                    organisasjonsnummer,
                    norskIdentitetsnummer: type === ArbeidsgiverType.PRIVATPERSON ? organisasjonsnummer : undefined,
                    arbeidstidInfo,
                    _erNyArbeidsaktivitet: false,
                });
            }
        }
    });

    /** Nye arbeidsgivere */
    nyeArbeidsgivere.forEach((arbeidsgiver) => {
        const { type, organisasjonsnummer } = arbeidsgiver;
        const endring = arbeidAktivitetEndring[organisasjonsnummer];
        if (endring) {
            const arbeidstidInfo = getNyArbeidsgiverArbeidstidInfo(endring, arbeidsgiver);
            if (arbeidstidInfo) {
                arbeidstakerList.push({
                    organisasjonsnummer,
                    norskIdentitetsnummer: type === ArbeidsgiverType.PRIVATPERSON ? organisasjonsnummer : undefined,
                    arbeidstidInfo,
                    _erNyArbeidsaktivitet: false,
                });
            } else {
                throw 'Ny arbeidsgiver mangler informasjon om arbeidstid';
            }
        }
    });

    return {
        arbeidstakerList,
        frilanserArbeidstidInfo: arbeidAktiviteter.frilanser
            ? getArbeidAktivitetArbeidstidInfo(frilansAktivitetEndring, arbeidAktiviteter.frilanser)
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: arbeidAktiviteter.selvstendigNæringsdrivende
            ? getArbeidAktivitetArbeidstidInfo(
                  selvstendigNæringsdrivendeAktivitetEndring,
                  arbeidAktiviteter.selvstendigNæringsdrivende
              )
            : undefined,
    };
};
