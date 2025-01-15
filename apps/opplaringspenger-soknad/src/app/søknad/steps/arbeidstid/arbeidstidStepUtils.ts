import { DateRange } from '@navikt/sif-common-formik-ds';
import { DateDurationMap, dateToISODate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { ArbeidIPeriodeType } from '../../../types/ArbeidIPeriodeType';
import { ArbeidFrilansSøknadsdata } from '../../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from '../../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';
import { ArbeidsgivereSøknadsdata } from '../../../types/søknadsdata/ArbeidsgivereSøknadsdata';
import { ArbeidstidArbeidsgivereSøknadsdata } from '../../../types/søknadsdata/ArbeidstidArbeidsgivereSøknadsdata';
import {
    ArbeidssituasjonSøknadsdata,
    ArbeidstidSøknadsdata,
    Søknadsdata,
} from '../../../types/søknadsdata/Søknadsdata';
import { AnsattArbeidstid, ArbeidsaktivitetType, ArbeidstidFormValues, FrilansSNArbeidstid } from './ArbeidstidStep';
import { ArbeidIPeriode, JobberIPeriodeSvar } from './ArbeidstidTypes';

dayjs.extend(isoWeek);

export const getAntallArbeidsforhold = (arbeidssituasjon: ArbeidssituasjonSøknadsdata): number => {
    let antall = 0;
    const { arbeidsgivere, frilans, selvstendig } = arbeidssituasjon;
    if (arbeidsgivere) {
        antall += Object.keys(arbeidsgivere)
            .map((key) => arbeidsgivere[key])
            .filter((a) => a.erAnsattISøknadsperiode).length;
    }
    if (frilans.erFrilanser) {
        antall++;
    }
    if (selvstendig.erSelvstendigNæringsdrivende) {
        antall++;
    }
    return antall;
};

export const getArbeidstidStepInitialValues = (
    søknadsdata: Søknadsdata,
    tempFormValues?: ArbeidstidFormValues,
): ArbeidstidFormValues => {
    const arbeidsgivereArbeidstidSøknadsdata = søknadsdata.arbeidstid?.arbeidsgivere;
    const frilansArbeidstidSøknadsdata = søknadsdata.arbeidstid?.frilans;
    const selvstendigArbeidstidSøknadsdata = søknadsdata.arbeidstid?.selvstendig;

    const arbeidsgivereArbeidssituasjonSøknadsdata = søknadsdata.arbeidssituasjon?.arbeidsgivere;
    const frilansArbeidssituasjonSøknadsdata = søknadsdata.arbeidssituasjon?.frilans;
    const selvstendigArbeidssituasjonSøknadsdata = søknadsdata.arbeidssituasjon?.selvstendig;

    const arbeidsgivereDefaultValues = getAnsattArbeidstidFormData(
        arbeidsgivereArbeidssituasjonSøknadsdata,
        arbeidsgivereArbeidstidSøknadsdata,
        tempFormValues,
    );
    const frilansDefaultValues = getArbeidstidFrilansFormData(
        frilansArbeidstidSøknadsdata,
        frilansArbeidssituasjonSøknadsdata,
        tempFormValues,
    );

    const selvstendivDefaultValues = getArbeidstidSelvstendigFormData(
        selvstendigArbeidstidSøknadsdata,
        selvstendigArbeidssituasjonSøknadsdata,
        tempFormValues,
    );

    return {
        ansattArbeidstid: arbeidsgivereDefaultValues,
        frilansArbeidstid: frilansDefaultValues,
        selvstendigArbeidstid: selvstendivDefaultValues,
    };
};

export const getAnsattArbeidstidFormData = (
    arbeidsgivereArbeidssituasjonSøknadsdata?: ArbeidsgivereSøknadsdata,
    arbeidsgivereArbeidstidSøknadsdata?: ArbeidstidArbeidsgivereSøknadsdata,
    tempFormValues?: ArbeidstidFormValues,
): AnsattArbeidstid[] | undefined => {
    if (arbeidsgivereArbeidssituasjonSøknadsdata) {
        const ansattArbeidstid: AnsattArbeidstid[] = [];
        const tempAnsattArbeidstid = tempFormValues?.ansattArbeidstid;

        Object.entries(arbeidsgivereArbeidssituasjonSøknadsdata).map(([key, value]) => {
            if (value.erAnsattISøknadsperiode) {
                const tempArbeidIPeriode = tempAnsattArbeidstid?.find(
                    (an) => an.organisasjonsnummer === key,
                )?.arbeidIPeriode;

                const arbeidIPeriode =
                    arbeidsgivereArbeidstidSøknadsdata &&
                    Object.prototype.hasOwnProperty.call(arbeidsgivereArbeidstidSøknadsdata, key)
                        ? getArbeidIPeriodeFormDataFromSøknadsdata(
                              arbeidsgivereArbeidstidSøknadsdata[key]?.arbeidIPeriode,
                          )
                        : undefined;

                ansattArbeidstid.push({
                    organisasjonsnummer: key,
                    navn: value.arbeidsgiver.navn,
                    jobberNormaltTimer: value.jobberNormaltTimer,
                    arbeidIPeriode: tempArbeidIPeriode ? tempArbeidIPeriode : arbeidIPeriode,
                });
            }
        });
        return ansattArbeidstid;
    }

    return undefined;
};

const getArbeidstidFrilansFormData = (
    frilansArbeidstidSøknadsdata?: ArbeidIPeriodeSøknadsdata,
    frilansArbeidssituasjonSøknadsdata?: ArbeidFrilansSøknadsdata,
    tempFormValues?: ArbeidstidFormValues,
): FrilansSNArbeidstid | undefined => {
    if (!frilansArbeidssituasjonSøknadsdata) {
        return undefined;
    }

    if (
        frilansArbeidssituasjonSøknadsdata.type === 'pågående' ||
        frilansArbeidssituasjonSøknadsdata.type === 'sluttetISøknadsperiode'
    ) {
        const tempArbeidIPeriode = tempFormValues?.frilansArbeidstid?.arbeidIPeriode;
        const arbeidIPeriode = getArbeidIPeriodeFormDataFromSøknadsdata(frilansArbeidstidSøknadsdata);

        return {
            type: ArbeidsaktivitetType.frilanser,
            jobberNormaltTimer: frilansArbeidssituasjonSøknadsdata.jobberNormaltTimer,
            arbeidIPeriode: tempArbeidIPeriode ? tempArbeidIPeriode : arbeidIPeriode,
        };
    }

    return undefined;
};

const getArbeidstidSelvstendigFormData = (
    selvstendigArbeidstidSøknadsdata?: ArbeidIPeriodeSøknadsdata,
    selvstendigArbeidssituasjonSøknadsdata?: ArbeidSelvstendigSøknadsdata,
    tempFormValues?: ArbeidstidFormValues,
): FrilansSNArbeidstid | undefined => {
    if (!selvstendigArbeidssituasjonSøknadsdata) {
        return undefined;
    }

    if (selvstendigArbeidssituasjonSøknadsdata.type === 'erSN') {
        const tempArbeidIPeriode = tempFormValues?.selvstendigArbeidstid?.arbeidIPeriode;
        const arbeidIPeriode = getArbeidIPeriodeFormDataFromSøknadsdata(selvstendigArbeidstidSøknadsdata);

        return {
            type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
            jobberNormaltTimer: selvstendigArbeidssituasjonSøknadsdata.jobberNormaltTimer,
            arbeidIPeriode: tempArbeidIPeriode ? tempArbeidIPeriode : arbeidIPeriode,
        };
    }

    return undefined;
};

const getArbeidIPeriodeFormDataFromSøknadsdata = (
    arbeidIPeriodeSøknadsdata?: ArbeidIPeriodeSøknadsdata,
): ArbeidIPeriode | undefined => {
    if (!arbeidIPeriodeSøknadsdata) {
        return undefined;
    }

    switch (arbeidIPeriodeSøknadsdata.type) {
        case ArbeidIPeriodeType.arbeiderIkke:
            return {
                jobberIPerioden: JobberIPeriodeSvar.heltFravær,
            };
        case ArbeidIPeriodeType.arbeiderVanlig:
            return {
                jobberIPerioden: JobberIPeriodeSvar.somVanlig,
            };
        case ArbeidIPeriodeType.arbeiderUlikeUkerTimer:
            return {
                jobberIPerioden: JobberIPeriodeSvar.redusert,
                enkeltdager: arbeidIPeriodeSøknadsdata.enkeltdager,
            };
    }
};

export const getArbeidstidSøknadsdataFromFormValues = (
    arbeidstidFormValues: ArbeidstidFormValues,
): ArbeidstidSøknadsdata | undefined => {
    const arbeidsgivere = getArbeidstidArbeidsgivereSøknadsdata(arbeidstidFormValues.ansattArbeidstid);
    const frilans = getArbeidIPeriodeSøknadsdata(arbeidstidFormValues.frilansArbeidstid?.arbeidIPeriode);
    const selvstendig = getArbeidIPeriodeSøknadsdata(arbeidstidFormValues.selvstendigArbeidstid?.arbeidIPeriode);

    return {
        arbeidsgivere,
        frilans,
        selvstendig,
    };
};

export const getArbeidstidArbeidsgivereSøknadsdata = (
    ansattArbeidstid?: AnsattArbeidstid[],
): ArbeidstidArbeidsgivereSøknadsdata | undefined => {
    if (ansattArbeidstid) {
        const arbeidsgivereSøknadsdata: ArbeidstidArbeidsgivereSøknadsdata = {};
        ansattArbeidstid.map((arbeidsgiver) => {
            const arbeidIPeriode = getArbeidIPeriodeSøknadsdata(arbeidsgiver.arbeidIPeriode);
            if (arbeidIPeriode) {
                arbeidsgivereSøknadsdata[arbeidsgiver.organisasjonsnummer] = {
                    navn: arbeidsgiver.navn,
                    arbeidIPeriode,
                };
            }
        });
        return arbeidsgivereSøknadsdata;
    }

    return undefined;
};

export const getArbeidIPeriodeSøknadsdata = (
    arbeidIPeriode?: ArbeidIPeriode,
): ArbeidIPeriodeSøknadsdata | undefined => {
    if (!arbeidIPeriode) {
        return undefined;
    }

    if (arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.heltFravær) {
        return {
            type: ArbeidIPeriodeType.arbeiderIkke,
            arbeiderIPerioden: false,
        };
    }

    if (arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.somVanlig) {
        return {
            type: ArbeidIPeriodeType.arbeiderVanlig,
            arbeiderIPerioden: true,
            arbeiderRedusert: false,
        };
    }

    if (arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert && arbeidIPeriode.enkeltdager) {
        return {
            type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer,
            arbeiderIPerioden: true,
            arbeiderRedusert: true,
            enkeltdager: arbeidIPeriode.enkeltdager,
        };
    }

    return undefined;
};

export const syncArbeidstidMedKursperioder = (arbeidstid: ArbeidstidSøknadsdata, valgteDager: Date[] = []) => {
    const { arbeidsgivere } = arbeidstid;
    if (arbeidsgivere) {
        Object.keys(arbeidsgivere).forEach((key) => {
            const a = arbeidsgivere[key];
            if (a && a.arbeidIPeriode?.type === ArbeidIPeriodeType.arbeiderUlikeUkerTimer) {
                a.arbeidIPeriode.enkeltdager = cleanupDateDurationMapWithValidDates(
                    a.arbeidIPeriode.enkeltdager,
                    valgteDager,
                );
            }
        });
    }
    if (arbeidstid.frilans?.type === ArbeidIPeriodeType.arbeiderUlikeUkerTimer) {
        arbeidstid.frilans.enkeltdager = cleanupDateDurationMapWithValidDates(
            arbeidstid.frilans.enkeltdager,
            valgteDager,
        );
    }
    if (arbeidstid.selvstendig?.type === ArbeidIPeriodeType.arbeiderUlikeUkerTimer) {
        arbeidstid.selvstendig.enkeltdager = cleanupDateDurationMapWithValidDates(
            arbeidstid.selvstendig.enkeltdager,
            valgteDager,
        );
    }

    return arbeidstid;
};

export const cleanupDateDurationMapWithValidDates = (enkeltdager: DateDurationMap, dates: Date[]) => {
    const cleanedMap: DateDurationMap = {};
    const isoDates = dates.map(dateToISODate);
    Object.entries(enkeltdager).map(([key, value]) => {
        if (isoDates.includes(key)) {
            cleanedMap[key] = value;
        }
    });
    return cleanedMap;
};

export const begrensPeriodeTilPeriodeEnSkalOppgiTimerFor = (periode: DateRange): DateRange => {
    const fromDate = dayjs(periode.from);

    // Hvis perioden starter på en helgedag, flytt startdato til påfølgende mandag
    if (fromDate.isoWeekday() > 5) {
        return {
            from: dayjs(periode.from).add(1, 'week').startOf('isoWeek').toDate(),
            to: periode.to,
        };
    }
    return periode;
};
