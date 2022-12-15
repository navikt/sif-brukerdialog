import {
    dateToISODate,
    decimalDurationToISODuration,
    durationToDecimalDuration,
    durationToISODuration,
} from '@navikt/sif-common-utils/lib';
import { ArbeidsgiverType } from '../../types/Arbeidsgiver';
import { ArbeidstidAktivitetUkeEndringMap } from '../../types/ArbeidstidAktivitetEndring';
import { ArbeidAktivitet, ArbeidAktiviteter, ArbeidAktivitetType, Sak } from '../../types/Sak';
import {
    ArbeidstakerApiData,
    ArbeidstidApiData,
    ArbeidstidPeriodeApiDataMap,
    SøknadApiData,
} from '../../types/søknadApiData/SøknadApiData';
import { ArbeidstidSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { beregnEndretArbeidstid } from '../beregnUtils';

export const getArbeidstidEndringUtFraNormaltid = (
    endringUkeMap: ArbeidstidAktivitetUkeEndringMap,
    arbeidAktivitet: ArbeidAktivitet
): ArbeidstidPeriodeApiDataMap => {
    const arbeidsdagerMedEndretTid: ArbeidstidPeriodeApiDataMap = {};

    Object.keys(endringUkeMap).forEach((isoDateRange) => {
        const { endring } = endringUkeMap[isoDateRange];
        const arbeidsuke = arbeidAktivitet.arbeidsuker[isoDateRange];
        const dager = Object.keys(arbeidsuke.dagerMap);
        const antallDagerMedArbeid = dager.length;

        /** Returner hele perioden */
        if (endring.type === TimerEllerProsent.TIMER) {
            const normaltTimerPerDag =
                Math.round((durationToDecimalDuration(arbeidsuke.normalt) / antallDagerMedArbeid) * 100) / 100;
            const faktiskTimerPerDag = Math.round((endring.timer / antallDagerMedArbeid) * 100) / 100;
            arbeidsdagerMedEndretTid[isoDateRange] = {
                jobberNormaltTimerPerDag: decimalDurationToISODuration(normaltTimerPerDag),
                faktiskArbeidTimerPerDag: decimalDurationToISODuration(faktiskTimerPerDag),
            };
        }
        if (endring.type === TimerEllerProsent.PROSENT) {
            dager.forEach((key) => {
                const normaltid = arbeidsuke.dagerMap[key].normalt;
                arbeidsdagerMedEndretTid[key] = {
                    faktiskArbeidTimerPerDag: durationToISODuration(beregnEndretArbeidstid(endring, normaltid)),
                    jobberNormaltTimerPerDag: durationToISODuration(normaltid),
                };
            });
        }
    });
    return arbeidsdagerMedEndretTid;
};

export const getArbeidstidInfo = (
    aktivitetEndring?: ArbeidstidAktivitetUkeEndringMap,
    aktivitet?: ArbeidAktivitet
): { perioder: ArbeidstidPeriodeApiDataMap } | undefined => {
    if (aktivitetEndring && aktivitet) {
        return {
            perioder: getArbeidstidEndringUtFraNormaltid(aktivitetEndring, aktivitet),
        };
    }
    return undefined;
};

export const getArbeidstidApiDataFromSøknadsdata = (
    { arbeidAktivitetEndring }: ArbeidstidSøknadsdata,
    arbeidAktiviteter: ArbeidAktiviteter
): ArbeidstidApiData => {
    const frilansAktivitetEndring = arbeidAktivitetEndring[ArbeidAktivitetType.frilanser];
    const selvstendigNæringsdrivendeAktivitetEndring =
        arbeidAktivitetEndring[ArbeidAktivitetType.selvstendigNæringsdrivende];
    const arbeidstakerList: ArbeidstakerApiData[] = [];

    arbeidAktiviteter.arbeidstakerArr.forEach((aktivitet) => {
        const endring = arbeidAktivitetEndring[aktivitet.id];

        if (endring) {
            const {
                arbeidsgiver: { type, id },
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
    return {
        arbeidstakerList,
        frilanserArbeidstidInfo: getArbeidstidInfo(frilansAktivitetEndring, arbeidAktiviteter.frilanser),
        selvstendigNæringsdrivendeArbeidstidInfo: getArbeidstidInfo(
            selvstendigNæringsdrivendeAktivitetEndring,
            arbeidAktiviteter.selvstendigNæringsdrivende
        ),
    };
};

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata, sak: Sak): SøknadApiData | undefined => {
    const { id, arbeidstid } = søknadsdata;
    if (!arbeidstid) {
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
            arbeidstid: getArbeidstidApiDataFromSøknadsdata(arbeidstid, sak.arbeidAktiviteter),
        },
    };
};
