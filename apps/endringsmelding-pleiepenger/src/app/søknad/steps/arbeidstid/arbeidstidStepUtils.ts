import { durationUtils } from '@navikt/sif-common-utils/lib';
import { ArbeidstidAktivitetEndringMap } from '../../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke, ArbeidsukeMap } from '../../../types/Sak';
import { Søknadsdata, ArbeidstidSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { beregnEndretArbeidstid } from '../../../utils/beregnUtils';
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
    arbeidstidAktivitetEndringer: ArbeidstidAktivitetEndringMap,
    arbeidsuker: Arbeidsuke[]
): ArbeidstidAktivitetEndringMap => {
    const cleanedEndringer: ArbeidstidAktivitetEndringMap = {};

    const arbeidsukerMap: ArbeidsukeMap = {};
    arbeidsuker.forEach((uke) => (arbeidsukerMap[uke.isoDateRange] = uke));

    Object.keys(arbeidstidAktivitetEndringer).forEach((key) => {
        const opprinnelig = arbeidsukerMap[key];
        if (!opprinnelig) {
            return;
        }
        const arbeidAktivitetEndring = arbeidstidAktivitetEndringer[key];
        const endretTimer = beregnEndretArbeidstid(arbeidAktivitetEndring.endring, opprinnelig.normalt.uke);
        if (endretTimer && !durationUtils.durationsAreEqual(endretTimer, opprinnelig.faktisk.uke)) {
            cleanedEndringer[key] = arbeidAktivitetEndring;
        }
    });
    return cleanedEndringer;
};
