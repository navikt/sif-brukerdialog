import {
    dateToISODate,
    decimalDurationToISODuration,
    durationToDecimalDuration,
    durationToISODuration,
} from '@navikt/sif-common-utils/lib';
import { TimerEllerProsent } from '../../søknad/steps/arbeidstid/arbeid-i-periode-form/ArbeidIPeriodeFormValues';
import { ArbeidsgiverType } from '../../types/Arbeidsgiver';
import { ArbeidstidAktivitetEndringUkeMap } from '../../types/ArbeidstidAktivitetEndring';
import { ArbeidAktivitet, ArbeidAktiviteter, ArbeidAktivitetType, Sak } from '../../types/Sak';
import {
    ArbeidstakerApiData,
    ArbeidstidApiData,
    ArbeidstidPeriodeApiDataMap,
    SøknadApiData,
} from '../../types/søknadApiData/SøknadApiData';
import { ArbeidstidSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { beregnEndretArbeidstidEnkeltdag } from '../arbeidAktivitetUtils';

export const getArbeidstidEndringUtFraNormaltid = (
    endringUkeMap: ArbeidstidAktivitetEndringUkeMap,
    arbeidAktivitet: ArbeidAktivitet
): ArbeidstidPeriodeApiDataMap => {
    const arbeidsdagerMedEndretTid: ArbeidstidPeriodeApiDataMap = {};

    Object.keys(endringUkeMap).forEach((isoDateRange) => {
        const { endring } = endringUkeMap[isoDateRange];
        const arbeidsuke = arbeidAktivitet.perioder.arbeidsuker[isoDateRange];
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
                    faktiskArbeidTimerPerDag: durationToISODuration(
                        beregnEndretArbeidstidEnkeltdag(endring, normaltid)
                    ),
                    jobberNormaltTimerPerDag: durationToISODuration(normaltid),
                };
            });
        }
    });
    return arbeidsdagerMedEndretTid;
};

export const getArbeidstidInfo = (
    aktivitetEndring?: ArbeidstidAktivitetEndringUkeMap,
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
            arbeidstid: arbeidstid ? getArbeidstidApiDataFromSøknadsdata(arbeidstid, sak.arbeidAktiviteter) : undefined,
        },
    };
};
