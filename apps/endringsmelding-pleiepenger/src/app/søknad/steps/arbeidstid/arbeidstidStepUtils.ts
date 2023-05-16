import { IntlErrorObject } from '@navikt/sif-common-formik-ds/lib';
import { durationsAreEqual, ISODateRange } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from '../../../types/arbeiderIPeriodenSvar';
import { ArbeidstidEndringMap } from '../../../types/ArbeidstidEndring';
import { ArbeidAktivitet, ArbeidAktivitetArbeidstaker, ArbeidAktiviteter, ArbeidsukeMap } from '../../../types/Sak';
import { ArbeidAktivitetEndringMap, ArbeidstidSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { beregnEndretArbeidstidForUke } from '../../../utils/beregnUtils';
import { ArbeidstidFormValues } from './ArbeidstidStep';

const arbeidstidInitialFormValues: ArbeidstidFormValues = {
    arbeidAktivitet: {},
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
        arbeidAktivitet: søknadsdata.arbeidstid.arbeidAktivitet,
    };
};

export const getArbeidstidSøknadsdataFromFormValues = (values: ArbeidstidFormValues): ArbeidstidSøknadsdata => {
    const arbeidAktivitet: ArbeidAktivitetEndringMap = {};
    Object.keys(values.arbeidAktivitet).forEach((key) => {
        const aktivitet = values.arbeidAktivitet[key];
        if (
            aktivitet.arbeiderIPerioden === undefined ||
            aktivitet.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert
        ) {
            arbeidAktivitet[key] = values.arbeidAktivitet[key];
        } else {
            /** Ukjent arbeidsforhold hvor en ikke kombinerer */
            arbeidAktivitet[key] = {
                endringer: {},
                arbeiderIPerioden: aktivitet.arbeiderIPerioden,
            };
        }
    });
    return { arbeidAktivitet };
};

export const cleanupArbeidAktivitetEndringer = (
    endringer: ArbeidstidEndringMap,
    arbeidAktivitet: ArbeidAktivitet
): ArbeidstidEndringMap => {
    const arbeidsuker = getArbeidsukerIArbeidAktivitet(arbeidAktivitet);
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

export const getArbeidsukerIArbeidAktivitet = (arbeidAktvitet: ArbeidAktivitet): ArbeidsukeMap => {
    const arbeidsukerMap: ArbeidsukeMap = {};
    arbeidAktvitet.perioderMedArbeidstid.forEach(({ arbeidsuker }) => {
        Object.keys(arbeidsuker).forEach((key) => {
            arbeidsukerMap[key] = arbeidsuker[key];
        });
    });
    return arbeidsukerMap;
};

export const getAktiviteterSomSkalEndres = (arbeidAktiviteter: ArbeidAktiviteter): ArbeidAktivitet[] => {
    const { arbeidstakerAktiviteter, frilanser, selvstendigNæringsdrivende } = arbeidAktiviteter;

    const aktiviteter: ArbeidAktivitet[] = [...arbeidstakerAktiviteter];
    if (frilanser !== undefined) {
        aktiviteter.push({ ...frilanser });
    }

    if (selvstendigNæringsdrivende !== undefined) {
        aktiviteter.push({ ...selvstendigNæringsdrivende });
    }
    return aktiviteter;
};

export const validateUkjentArbeidsaktivitetArbeidstid = (
    arbeidAktivitet: ArbeidAktivitetArbeidstaker,
    endringer: ArbeidstidEndringMap = {},
    arbeiderIPeriodenSvar?: ArbeiderIPeriodenSvar
): IntlErrorObject | undefined => {
    const manglendePeriode: ISODateRange[] = [];
    arbeidAktivitet.perioderMedArbeidstid.forEach((periode) => {
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
                  navn: arbeidAktivitet.arbeidsgiver.navn,
              },
          }
        : undefined;
};
