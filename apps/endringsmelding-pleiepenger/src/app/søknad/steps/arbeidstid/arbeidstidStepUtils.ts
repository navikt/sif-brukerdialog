import { durationsAreEqual } from '@navikt/sif-common-utils/lib';
import { ArbeidstidEndringMap } from '../../../types/ArbeidstidEndring';
import { ArbeidAktivitet } from '../../../types/Sak';
import { ArbeidstidSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { getArbeidsukerIArbeidAktivitet } from '../../../utils/arbeidAktivitetUtils';
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
    endringer: ArbeidstidEndringMap,
    arbeidAktivitet: ArbeidAktivitet
): ArbeidstidEndringMap => {
    const arbeidsuker = getArbeidsukerIArbeidAktivitet(arbeidAktivitet);
    const cleanedEndringer: ArbeidstidEndringMap = {};
    Object.keys(endringer).forEach((key) => {
        const endring = endringer[key];
        const opprinnelig = arbeidsuker[key];
        const endretArbeidstid = beregnEndretArbeidstid(endring, opprinnelig.normalt.uke);
        if (!durationsAreEqual(endretArbeidstid, opprinnelig.faktisk.uke)) {
            cleanedEndringer[key] = endring;
        }
    });
    return cleanedEndringer;
};
