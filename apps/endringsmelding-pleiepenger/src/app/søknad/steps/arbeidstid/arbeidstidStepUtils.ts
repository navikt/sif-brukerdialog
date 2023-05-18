import { IntlErrorObject } from '@navikt/sif-common-formik-ds/lib';
import { durationsAreEqual, ISODateRange } from '@navikt/sif-common-utils';
import {
    Arbeidsaktivitet,
    ArbeidsaktivitetArbeidstaker,
    ArbeidsaktivitetEndringMap,
    Arbeidsaktiviteter,
    ArbeiderIPeriodenSvar,
    ArbeidstidEndringMap,
    ArbeidstidSøknadsdata,
    ArbeidsukeMap,
    Søknadsdata,
} from '@types';
import { beregnEndretArbeidstidForUke } from '@utils';
import { ArbeidstidFormValues } from './ArbeidstidForm';

const arbeidstidInitialFormValues: ArbeidstidFormValues = {
    arbeidsaktivitet: {},
};

export const getArbeidstidStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: ArbeidstidFormValues
): ArbeidstidFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.arbeidstid === undefined) {
        return arbeidstidInitialFormValues;
    }
    return {
        arbeidsaktivitet: søknadsdata.arbeidstid.arbeidsaktivitet,
    };
};

export const getArbeidstidSøknadsdataFromFormValues = (values: ArbeidstidFormValues): ArbeidstidSøknadsdata => {
    const arbeidsaktivitet: ArbeidsaktivitetEndringMap = {};
    Object.keys(values.arbeidsaktivitet).forEach((key) => {
        const aktivitet = values.arbeidsaktivitet[key];
        if (
            aktivitet.arbeiderIPerioden === undefined ||
            aktivitet.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert
        ) {
            arbeidsaktivitet[key] = values.arbeidsaktivitet[key];
        } else {
            /** Ukjent arbeidsforhold hvor en ikke kombinerer */
            arbeidsaktivitet[key] = {
                endringer: {},
                arbeiderIPerioden: aktivitet.arbeiderIPerioden,
            };
        }
    });
    return { arbeidsaktivitet };
};

export const cleanupArbeidsaktivitetEndringer = (
    endringer: ArbeidstidEndringMap,
    arbeidsaktivitet: Arbeidsaktivitet
): ArbeidstidEndringMap => {
    const arbeidsuker = getArbeidsukerIArbeidsaktivitet(arbeidsaktivitet);
    const cleanedEndringer: ArbeidstidEndringMap = {};
    Object.keys(endringer).forEach((key) => {
        const endring = endringer[key];
        const opprinnelig = arbeidsuker[key];
        const endretArbeidstid = beregnEndretArbeidstidForUke(
            endring,
            opprinnelig.normalt.uke,
            opprinnelig.antallDagerMedArbeidstid
        );
        if (!durationsAreEqual(endretArbeidstid, opprinnelig.faktisk?.uke)) {
            cleanedEndringer[key] = endring;
        }
    });
    return cleanedEndringer;
};

export const getArbeidsukerIArbeidsaktivitet = (arbeidAktvitet: Arbeidsaktivitet): ArbeidsukeMap => {
    const arbeidsukerMap: ArbeidsukeMap = {};
    arbeidAktvitet.perioderMedArbeidstid.forEach(({ arbeidsuker }) => {
        Object.keys(arbeidsuker).forEach((key) => {
            arbeidsukerMap[key] = arbeidsuker[key];
        });
    });
    return arbeidsukerMap;
};

export const getAktiviteterSomSkalEndres = (arbeidsaktiviteter: Arbeidsaktiviteter): Arbeidsaktivitet[] => {
    const { arbeidstakerAktiviteter, frilanser, selvstendigNæringsdrivende } = arbeidsaktiviteter;
    const aktiviteter: Arbeidsaktivitet[] = [...arbeidstakerAktiviteter];
    if (frilanser !== undefined) {
        aktiviteter.push({ ...frilanser });
    }
    if (selvstendigNæringsdrivende !== undefined) {
        aktiviteter.push({ ...selvstendigNæringsdrivende });
    }
    return aktiviteter;
};

export const validateUkjentArbeidsaktivitetArbeidstid = (
    arbeidsaktivitet: ArbeidsaktivitetArbeidstaker,
    endringer: ArbeidstidEndringMap = {},
    arbeiderIPeriodenSvar?: ArbeiderIPeriodenSvar
): IntlErrorObject | undefined => {
    const manglendePeriode: ISODateRange[] = [];
    arbeidsaktivitet.perioderMedArbeidstid.forEach((periode) => {
        Object.keys(periode.arbeidsuker).forEach((key) => {
            const endring = endringer[key];
            if (!endring && arbeiderIPeriodenSvar === ArbeiderIPeriodenSvar.redusert) {
                manglendePeriode.push(key);
            }
        });
    });
    return manglendePeriode.length > 0
        ? {
              key: 'arbeidstid.faktisk.mangler',
              keepKeyUnaltered: true,
              values: {
                  navn: arbeidsaktivitet.arbeidsgiver.navn,
              },
          }
        : undefined;
};
