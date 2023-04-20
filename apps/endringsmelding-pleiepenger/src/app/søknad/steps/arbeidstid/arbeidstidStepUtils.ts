import { durationsAreEqual } from '@navikt/sif-common-utils';
import { ArbeidstidEndringMap } from '../../../types/ArbeidstidEndring';
import { ArbeidAktivitet, ArbeidAktiviteter, ArbeidsukeMap } from '../../../types/Sak';
import { ArbeidstidSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { beregnEndretArbeidstidForUke } from '../../../utils/beregnUtils';
import { ArbeidstidFormValues } from './ArbeidstidStep';

const arbeidstidInitialFormValues: ArbeidstidFormValues = {
    arbeidAktivitetEndring: {},
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
        arbeidAktivitetEndring: søknadsdata.arbeidstid.arbeidAktivitetEndring,
    };
};

export const getArbeidstidSøknadsdataFromFormValues = (values: ArbeidstidFormValues): ArbeidstidSøknadsdata => {
    return { arbeidAktivitetEndring: values.arbeidAktivitetEndring };
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
        if (!durationsAreEqual(endretArbeidstid, opprinnelig.faktisk.uke)) {
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
    const { arbeidstakerAktiviteter: arbeidstaker, frilanser, selvstendigNæringsdrivende } = arbeidAktiviteter;

    const aktiviteter: ArbeidAktivitet[] = [...arbeidstaker];
    if (frilanser !== undefined) {
        aktiviteter.push({ ...frilanser });
    }

    if (selvstendigNæringsdrivende !== undefined) {
        aktiviteter.push({ ...selvstendigNæringsdrivende });
    }
    return aktiviteter;
};
