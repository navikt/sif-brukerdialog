import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { validateAll } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds';
import { validateNoCollisions } from '@navikt/sif-common-forms-ds/src/forms/fravær/fraværValidationUtils';

enum FraværErrors {
    ulikeÅrstall = 'ulikeÅrstall',
    perioderEllerDagerOverlapper = 'perioderEllerDagerOverlapper',
}

export const getFraværPerioderValidator =
    ({ fraværDager, årstall }: { fraværDager: FraværDag[]; årstall?: number }) =>
    (fraværPerioder: FraværPeriode[]) => {
        return validateAll<ValidationError>([
            () => getListValidator({ required: true })(fraværPerioder),
            () => (fraværPerioderHarÅrstall(fraværPerioder, årstall) === false ? FraværErrors.ulikeÅrstall : undefined),
            () =>
                validateNoCollisions(fraværDager, fraværPerioder)
                    ? FraværErrors.perioderEllerDagerOverlapper
                    : undefined,
        ]);
    };

export const getFraværDagerValidator =
    ({ fraværPerioder, årstall }: { fraværPerioder: FraværPeriode[]; årstall?: number }) =>
    (fraværDager: FraværDag[]) => {
        return validateAll<ValidationError>([
            () => getListValidator({ required: true })(fraværDager),
            () => (fraværDagerHarÅrstall(fraværDager, årstall) === false ? FraværErrors.ulikeÅrstall : undefined),
            () =>
                validateNoCollisions(fraværDager, fraværPerioder)
                    ? FraværErrors.perioderEllerDagerOverlapper
                    : undefined,
        ]);
    };

const fraværPerioderHarÅrstall = (perioder: FraværPeriode[], årstall?: number): boolean => {
    if (årstall !== undefined) {
        return perioder.find((p) => p.fraOgMed.getFullYear() !== årstall || p.tilOgMed.getFullYear() !== årstall)
            ? false
            : true;
    }
    return true;
};

const fraværDagerHarÅrstall = (dager: FraværDag[], årstall?: number): boolean => {
    if (årstall !== undefined) {
        return dager.find((d) => d.dato.getFullYear() !== årstall) ? false : true;
    }
    return true;
};
