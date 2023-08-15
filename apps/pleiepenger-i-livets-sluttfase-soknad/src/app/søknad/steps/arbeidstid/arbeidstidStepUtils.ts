import { ArbeidIPeriodeType } from '../../../types/arbeidIPeriodeType';
import { ArbeidFrilansSøknadsdata } from '../../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from '../../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';
import { ArbeidsgivereSøknadsdata } from '../../../types/søknadsdata/ArbeidsgivereSøknadsdata';
import { ArbeidstidArbeidsgivereSøknadsdata } from '../../../types/søknadsdata/ArbeidstidArbeidsgivereSøknadsdata';
import { ArbeidstidSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { AnsattArbeidstid, ArbeidsaktivitetType, ArbeidstidFormValues, FrilansSNArbeidstid } from './ArbeidstidStep';
import { ArbeidIPeriode, JobberIPeriodeSvar } from './ArbeidstidTypes';

export const getArbeidstidStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: ArbeidstidFormValues
): ArbeidstidFormValues => {
    if (formValues) {
        return formValues;
    }

    const arbeidsgivereArbeidstidSøknadsdata = søknadsdata.arbeidstid?.arbeidsgivere;
    const frilansArbeidstidSøknadsdata = søknadsdata.arbeidstid?.frilans;
    const selvstendigArbeidstidSøknadsdata = søknadsdata.arbeidstid?.selvstendig;

    const arbeidsgivereArbeidssituasjonSøknadsdata = søknadsdata.arbeidssituasjon?.arbeidsgivere;
    const frilansArbeidssituasjonSøknadsdata = søknadsdata.arbeidssituasjon?.frilans;
    const selvstendigArbeidssituasjonSøknadsdata = søknadsdata.arbeidssituasjon?.selvstendig;

    const arbeidsgivereDefaultValues = getAnsattArbeidstidFormData(
        arbeidsgivereArbeidssituasjonSøknadsdata,
        arbeidsgivereArbeidstidSøknadsdata
    );
    const frilansDefaultValues = getArbeidstidFrilansFormData(
        frilansArbeidstidSøknadsdata,
        frilansArbeidssituasjonSøknadsdata
    );

    const selvstendivDefaultValues = getArbeidstidSelvstendigFormData(
        selvstendigArbeidstidSøknadsdata,
        selvstendigArbeidssituasjonSøknadsdata
    );

    return {
        ansattArbeidstid: arbeidsgivereDefaultValues,
        frilansArbeidstid: frilansDefaultValues,
        selvstendigArbeidstid: selvstendivDefaultValues,
    };
};

export const getAnsattArbeidstidFormData = (
    arbeidsgivereArbeidssituasjonSøknadsdata?: ArbeidsgivereSøknadsdata,
    arbeidsgivereArbeidstidSøknadsdata?: ArbeidstidArbeidsgivereSøknadsdata
): AnsattArbeidstid[] | undefined => {
    if (arbeidsgivereArbeidssituasjonSøknadsdata) {
        const ansattArbeidstid: AnsattArbeidstid[] = [];
        arbeidsgivereArbeidssituasjonSøknadsdata.forEach((value, key) => {
            if (value.erAnsattISøknadsperiode) {
                const arbeidIPeriode =
                    arbeidsgivereArbeidstidSøknadsdata && arbeidsgivereArbeidstidSøknadsdata?.has(key)
                        ? getArbeidIPeriodeFormDataFromSøknadsdata(
                              arbeidsgivereArbeidstidSøknadsdata.get(key)?.arbeidIPeriode
                          )
                        : undefined;

                ansattArbeidstid.push({
                    organisasjonsnummer: key,
                    navn: value.arbeidsgiver.navn,
                    jobberNormaltTimer: value.jobberNormaltTimer,
                    arbeidIPeriode,
                });
            }
        });
    }

    return undefined;
};

const getArbeidstidFrilansFormData = (
    frilansArbeidstidSøknadsdata?: ArbeidIPeriodeSøknadsdata,
    frilansArbeidssituasjonSøknadsdata?: ArbeidFrilansSøknadsdata
): FrilansSNArbeidstid | undefined => {
    if (!frilansArbeidssituasjonSøknadsdata) {
        return undefined;
    }

    if (
        frilansArbeidssituasjonSøknadsdata.type === 'pågående' ||
        frilansArbeidssituasjonSøknadsdata.type === 'sluttetISøknadsperiode'
    ) {
        const arbeidIPeriode = getArbeidIPeriodeFormDataFromSøknadsdata(frilansArbeidstidSøknadsdata);

        return {
            type: ArbeidsaktivitetType.frilanser,
            jobberNormaltTimer: frilansArbeidssituasjonSøknadsdata.jobberNormaltTimer,
            arbeidIPeriode,
        };
    }

    return undefined;
};

const getArbeidstidSelvstendigFormData = (
    selvstendigArbeidstidSøknadsdata?: ArbeidIPeriodeSøknadsdata,
    selvstendigArbeidssituasjonSøknadsdata?: ArbeidSelvstendigSøknadsdata
): FrilansSNArbeidstid | undefined => {
    if (!selvstendigArbeidssituasjonSøknadsdata) {
        return undefined;
    }

    if (selvstendigArbeidssituasjonSøknadsdata.type === 'erSN') {
        const arbeidIPeriode = getArbeidIPeriodeFormDataFromSøknadsdata(selvstendigArbeidstidSøknadsdata);

        return {
            type: ArbeidsaktivitetType.selvstendigNæringsdrivende,
            jobberNormaltTimer: selvstendigArbeidssituasjonSøknadsdata.jobberNormaltTimer,
            arbeidIPeriode,
        };
    }

    return undefined;
};

const getArbeidIPeriodeFormDataFromSøknadsdata = (
    arbeidIPeriodeSøknadsdata?: ArbeidIPeriodeSøknadsdata
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
    arbeidstidFormValues: ArbeidstidFormValues
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
    ansattArbeidstid?: AnsattArbeidstid[]
): ArbeidstidArbeidsgivereSøknadsdata | undefined => {
    if (ansattArbeidstid) {
        const arbeidsgivereSøknadsdata: ArbeidstidArbeidsgivereSøknadsdata = new Map();
        ansattArbeidstid.map((arbeidsgiver) => {
            const arbeidIPeriode = getArbeidIPeriodeSøknadsdata(arbeidsgiver.arbeidIPeriode);
            if (arbeidIPeriode) {
                arbeidsgivereSøknadsdata.set(arbeidsgiver.organisasjonsnummer, {
                    navn: arbeidsgiver.navn,
                    arbeidIPeriode,
                });
            }
        });
    }

    return undefined;
};

export const getArbeidIPeriodeSøknadsdata = (
    arbeidIPeriode?: ArbeidIPeriode
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
