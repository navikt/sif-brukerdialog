import { getCommitShaFromEnv } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import {
    dateRangeToISODateRange,
    dateToISODate,
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
    Sak,
} from '../../types/Sak';
import {
    ArbeidstakerApiData,
    ArbeidstidApiData,
    ArbeidstidPeriodeApiDataMap,
    SøknadApiData,
} from '../../types/søknadApiData/SøknadApiData';
import { AktivitetSøknadsdata, ArbeidstidSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
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
    if (aktivitetEndring && aktivitet) {
        return {
            perioder: getEndretArbeidstid(aktivitetEndring, aktivitet),
        };
    }
    return undefined;
};

const getArbeidstidApiDataFromSøknadsdata = (
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
        const skalEndres = arbeidAktivitet.aktiviteterSomSkalEndres.some((id) => id === aktivitet.id);

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

    const frilanserSkalEndres = arbeidAktivitet.aktiviteterSomSkalEndres.some(
        (id) => id === ArbeidAktivitetType.frilanser
    );
    const snSkalEndres = arbeidAktivitet.aktiviteterSomSkalEndres.some(
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

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata, sak: Sak): SøknadApiData | undefined => {
    const { id, arbeidstid, aktivitet, lovbestemtFerie } = søknadsdata;
    if ((!arbeidstid || !aktivitet) && !lovbestemtFerie) {
        return undefined;
    }
    return {
        id,
        språk: '',
        harForståttRettigheterOgPlikter: søknadsdata.harForståttRettigheterOgPlikter === true ? true : false,
        harBekreftetOpplysninger: søknadsdata.harBekreftetOpplysninger === true ? true : false,
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
            barn: {
                fødselsdato: sak.barn.fødselsdato ? dateToISODate(sak.barn.fødselsdato) : undefined,
                norskIdentitetsnummer: sak.barn.identitetsnummer,
            },
            arbeidstid:
                arbeidstid && aktivitet
                    ? getArbeidstidApiDataFromSøknadsdata(arbeidstid, sak.arbeidAktiviteter, aktivitet)
                    : undefined,
            dataBruktTilUtledning: {
                soknadDialogCommitSha: getCommitShaFromEnv() || '',
            },
        },
    };
};
