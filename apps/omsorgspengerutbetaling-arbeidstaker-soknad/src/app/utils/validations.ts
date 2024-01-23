import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { validateAll } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds/src/forms/fravær/types';
import { validateNoCollisions } from '@navikt/sif-common-forms-ds/src/forms/fravær/fraværValidationUtils';

export enum AppFieldValidationErrors {
    'arbeidsforhold_fraværPerioder_listIsEmpty' = 'validation.arbeidsforhold.fraværPerioder.listIsEmpty',
    'arbeidsforhold_harPerioderMedFravær_yesOrNoIsUnanswered' = 'validation.arbeidsforhold.harPerioderMedFravær.yesOrNoIsUnanswered',
    'arbeidsforhold_harDagerMedDelvisFravær_yesOrNoIsUnanswered' = 'validation.arbeidsforhold.harDagerMedDelvisFravær.yesOrNoIsUnanswered',
    'arbeidsforhold_fraværDager_listIsEmpty' = 'validation.arbeidsforhold.fraværDager.listIsEmpty',
    'arbeidsforhold_hvorLengeJobbet_noValue' = 'validation.arbeidsforhold.hvorLengeJobbet.noValue',
    'arbeidsforhold_ansettelseslengde_begrunnelse_noValue' = 'validation.arbeidsforhold.ansettelseslengde.begrunnelse.noValue',
    'periode_ingenDagerEllerPerioder' = 'validation.periode_ingenDagerEllerPerioder',
    'harHattFraværHosArbeidsgiver_yesOrNoIsUnanswered' = 'validation.harHattFraværHosArbeidsgiver.yesOrNoIsUnanswered',
    'arbeidsgiverHarUtbetaltLønn_yesOrNoIsUnanswered' = 'validation.arbeidsgiverHarUtbetaltLønn.yesOrNoIsUnanswered',
    'for_mange_dokumenter' = 'validation.for_mange_dokumenter',
    'samlet_storrelse_for_hoy' = 'validation.samlet_storrelse_for_hoy',
    'ingen_dokumenter' = 'validation.ingen_dokumenter',
    'fraværDagIkkeSammeÅrstall' = 'validation.fraværDagIkkeSammeÅrstall',
    'fraværPeriodeIkkeSammeÅrstall' = 'validation.fraværPeriodeIkkeSammeÅrstall',
    'perioderEllerDagerOverlapper' = 'validation.perioderEllerDagerOverlapper',
    'arbeidsforhold_utbetalings_årsak_no_Value' = 'validation.situasjon.arbeidsforhold.utbetalingsårsak.noValue',
    'arbeidsforhold_årsak_mindre_4uker_no_Value' = 'validation.situasjon.arbeidsforhold.ÅrsakMindre4Uker.noValue',
}

export const getFraværPerioderValidator =
    ({
        fraværDager,
        arbeidsgiverNavn,
        årstall,
    }: {
        fraværDager: FraværDag[];
        arbeidsgiverNavn: string;
        årstall?: number;
    }) =>
    (fraværPerioder: FraværPeriode[]) => {
        return validateAll<ValidationError>([
            () =>
                getListValidator({ required: true })(fraværPerioder)
                    ? {
                          key: AppFieldValidationErrors.arbeidsforhold_fraværPerioder_listIsEmpty,
                          keepKeyUnaltered: true,
                          values: { arbeidsgivernavn: arbeidsgiverNavn },
                      }
                    : undefined,
            () =>
                fraværPerioderHarÅrstall(fraværPerioder, årstall) === false
                    ? AppFieldValidationErrors.fraværPeriodeIkkeSammeÅrstall
                    : undefined,
            () =>
                validateNoCollisions(fraværDager, fraværPerioder)
                    ? AppFieldValidationErrors.perioderEllerDagerOverlapper
                    : undefined,
        ]);
    };

export const getFraværDagerValidator =
    ({
        fraværPerioder,
        arbeidsgiverNavn,
        årstall,
    }: {
        fraværPerioder: FraværPeriode[];
        arbeidsgiverNavn: string;
        årstall?: number;
    }) =>
    (fraværDager: FraværDag[]) => {
        return validateAll<ValidationError>([
            () =>
                getListValidator({ required: true })(fraværDager)
                    ? {
                          key: AppFieldValidationErrors.arbeidsforhold_fraværDager_listIsEmpty,
                          keepKeyUnaltered: true,
                          values: { arbeidsgivernavn: arbeidsgiverNavn },
                      }
                    : undefined,

            () =>
                fraværDagerHarÅrstall(fraværDager, årstall) === false
                    ? AppFieldValidationErrors.fraværDagIkkeSammeÅrstall
                    : undefined,
            () =>
                validateNoCollisions(fraværDager, fraværPerioder)
                    ? AppFieldValidationErrors.perioderEllerDagerOverlapper
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
