import { dateToISODate, durationToISODuration } from '@navikt/sif-common-utils/lib';
import { ArbeidsgiverType } from '../../types/Arbeidsgiver';
import { ArbeidstidAktivitetEndringMap } from '../../types/ArbeidstidAktivitetEndring';
import { ArbeidAktivitet, ArbeidAktiviteter, ArbeidAktivitetType, Sak } from '../../types/Sak';
import {
    ArbeidstakerApiData,
    ArbeidstidApiData,
    ArbeidstidPeriodeApiDataMap,
    SøknadApiData,
} from '../../types/søknadApiData/SøknadApiData';
import { AktivitetSøknadsdata, ArbeidstidSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { beregnEndretFaktiskArbeidstidPerDag, beregnSnittTimerPerDag } from '../beregnUtils';

export const getEndretArbeidstid = (
    endringUkeMap: ArbeidstidAktivitetEndringMap,
    arbeidAktivitet: ArbeidAktivitet
): ArbeidstidPeriodeApiDataMap => {
    const arbeidsdagerMedEndretTid: ArbeidstidPeriodeApiDataMap = {};

    Object.keys(endringUkeMap).forEach((isoDateRange) => {
        const { endring } = endringUkeMap[isoDateRange];
        const arbeidsuke = arbeidAktivitet.arbeidsuker[isoDateRange];
        const { antallDagerMedArbeidstid } = arbeidsuke.meta;

        const jobberNormaltTimerPerDag = beregnSnittTimerPerDag(arbeidsuke.normalt.uke, antallDagerMedArbeidstid);
        const faktiskArbeidTimerPerDag = beregnEndretFaktiskArbeidstidPerDag(
            arbeidsuke.normalt.uke,
            endring,
            antallDagerMedArbeidstid
        );

        arbeidsdagerMedEndretTid[isoDateRange] = {
            jobberNormaltTimerPerDag: durationToISODuration(jobberNormaltTimerPerDag),
            faktiskArbeidTimerPerDag: durationToISODuration(faktiskArbeidTimerPerDag),
            _endretProsent: endring.type === TimerEllerProsent.PROSENT ? endring.prosent : undefined,
            _opprinneligNormaltPerDag: durationToISODuration(arbeidsuke.normalt.dag),
            _opprinneligFaktiskPerDag: durationToISODuration(arbeidsuke.faktisk.dag),
        };
    });

    return arbeidsdagerMedEndretTid;
};

export const getArbeidstidInfo = (
    aktivitetEndring?: ArbeidstidAktivitetEndringMap,
    aktivitet?: ArbeidAktivitet
): { perioder: ArbeidstidPeriodeApiDataMap } | undefined => {
    if (aktivitetEndring && aktivitet) {
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

    arbeidAktiviteter.arbeidstakerArr.forEach((aktivitet) => {
        const endring = arbeidAktivitetEndring[aktivitet.id];
        const skalEndres = arbeidAktivitet.aktiviteterSomSkalEndres.some((id) => id === aktivitet.id);

        if (endring && skalEndres) {
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
    const { id, arbeidstid, arbeidAktivitet } = søknadsdata;
    if (!arbeidstid || !arbeidAktivitet) {
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
            arbeidstid: getArbeidstidApiDataFromSøknadsdata(arbeidstid, sak.arbeidAktiviteter, arbeidAktivitet),
        },
    };
};
