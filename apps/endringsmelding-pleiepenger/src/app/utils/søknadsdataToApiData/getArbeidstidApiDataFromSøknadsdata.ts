import {
    dateRangeToISODateRange,
    durationToISODuration,
    getDateRangesFromDates,
    ISODateToDate,
    sortDateRange,
} from '@navikt/sif-common-utils/lib';
import { ArbeidsgiverType } from '../../types/Arbeidsgiver';
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
import { AktivitetSøknadsdata } from '../../types/søknadsdata/AktivitetSøknadsdata';
import { ArbeidstidSøknadsdata } from '../../types/søknadsdata/ArbeidstidSøknadsdata';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { getDagerFraEnkeltdagMap } from '../arbeidsukeUtils';
import { beregnEndretFaktiskArbeidstidPerDag, beregnSnittTimerPerDag } from '../beregnUtils';

const getAlleArbeidsukerIPerioder = (perioder: PeriodeMedArbeidstid[]): ArbeidsukeMap => {
    const arbeidsukerMap = {};
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

const getArbeidstidInfo = (
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

export const getArbeidstidApiDataFromSøknadsdata = (
    { arbeidAktivitetEndring }: ArbeidstidSøknadsdata,
    arbeidAktiviteter: ArbeidAktiviteter,
    arbeidAktivitet: AktivitetSøknadsdata
): ArbeidstidApiData => {
    const frilansAktivitetEndring = arbeidAktivitetEndring[ArbeidAktivitetType.frilanser];
    const selvstendigNæringsdrivendeAktivitetEndring =
        arbeidAktivitetEndring[ArbeidAktivitetType.selvstendigNæringsdrivende];
    const arbeidstakerList: ArbeidstakerApiData[] = [];

    arbeidAktiviteter.arbeidstakerArktiviteter.forEach((aktivitet) => {
        const endring = arbeidAktivitetEndring[aktivitet.id];
        const skalEndres = arbeidAktivitet.aktivitetSomSkalEndres.some((id) => id === aktivitet.id);

        if (endring && skalEndres) {
            const {
                arbeidsgiver: { type, organisasjonsnummer: id },
            } = aktivitet;
            const arbeidstidInfo = getArbeidstidInfo(endring, aktivitet);
            if (arbeidstidInfo) {
                arbeidstakerList.push({
                    organisasjonsnummer: id,
                    norskIdentitetsnummer: type === ArbeidsgiverType.PRIVATPERSON ? id : undefined,
                    arbeidstidInfo,
                });
            }
        }
    });

    const frilanserSkalEndres = arbeidAktivitet.aktivitetSomSkalEndres.some(
        (id) => id === ArbeidAktivitetType.frilanser
    );
    const snSkalEndres = arbeidAktivitet.aktivitetSomSkalEndres.some(
        (id) => id === ArbeidAktivitetType.selvstendigNæringsdrivende
    );

    return {
        arbeidstakerList,
        frilanserArbeidstidInfo: frilanserSkalEndres
            ? getArbeidstidInfo(frilansAktivitetEndring, arbeidAktiviteter.frilanser)
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: snSkalEndres
            ? getArbeidstidInfo(
                  selvstendigNæringsdrivendeAktivitetEndring,
                  arbeidAktiviteter.selvstendigNæringsdrivende
              )
            : undefined,
    };
};
