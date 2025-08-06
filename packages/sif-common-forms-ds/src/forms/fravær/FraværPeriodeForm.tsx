import { Alert } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ISOStringToDate,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { DateRange, getDateToday } from '@navikt/sif-common-utils';
import { getDateRangeValidator, ValidateDateError, ValidateDateRangeError } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import { handleDateRangeValidationError } from '../../utils';
import { isFraværPeriode, mapFormValuesToFraværPeriode, mapFraværPeriodeToFormValues } from './fraværUtilities';
import {
    FraværFieldValidationErrors,
    validateErSammeÅr,
    validateFraOgMedForCollision,
    validateFraværPeriodeCollision,
    validateNotHelgedag,
    validateTilOgMedForCollision,
} from './fraværValidationUtils';
import { useFraværIntl } from './i18n';
import { FraværPeriode, FraværPeriodeFormValues } from './types';

export interface FraværPeriodeFormLabels {
    tittel: string;
    tidsrom: string;
    fom: string;
    tom: string;
    ok: string;
    avbryt: string;
}

interface Props {
    fraværPeriode?: Partial<FraværPeriode>;
    periodeDescription?: ReactElement;
    minDate: Date;
    maxDate: Date;
    dateRangesToDisable?: DateRange[];
    helgedagerIkkeTillat?: boolean;
    begrensTilSammeÅr?: boolean;
    begrensTilSammeÅrAlertStripeTekst?: string;
    headerContent?: ReactElement;
    onSubmit: (values: FraværPeriode) => void;
    onCancel: () => void;
}

enum FraværPeriodeFormFields {
    fraOgMed = 'fraOgMed',
    tilOgMed = 'tilOgMed',
}

export const FraværPeriodeFormErrors = {
    [FraværPeriodeFormFields.fraOgMed]: {
        [ValidateDateError.dateHasNoValue]: '@forms.fraværPeriodeForm.fraOgMed.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: '@forms.fraværPeriodeForm.fraOgMed.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: '@forms.fraværPeriodeForm.fraOgMed.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.fraværPeriodeForm.fraOgMed.dateHasInvalidFormat',
        [ValidateDateRangeError.fromDateIsAfterToDate]: '@forms.fraværPeriodeForm.fraOgMed.fromDateIsAfterToDate',
        [FraværFieldValidationErrors.er_helg]: '@forms.fraværPeriodeForm.fraOgMed.er_helg',
        [FraværFieldValidationErrors.fra_og_til_er_ulike_år]:
            '@forms.fraværPeriodeForm.fraOgMed.fra_og_til_er_ulike_år',
        [FraværFieldValidationErrors.fra_dato_kolliderer_med_annet_fravær]:
            '@forms.fraværPeriodeForm.fraOgMed.fra_dato_kolliderer_med_annet_fravær',
    },
    [FraværPeriodeFormFields.tilOgMed]: {
        [ValidateDateError.dateHasNoValue]: '@forms.fraværPeriodeForm.tilOgMed.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: '@forms.fraværPeriodeForm.tilOgMed.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: '@forms.fraværPeriodeForm.tilOgMed.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.fraværPeriodeForm.tilOgMed.dateHasInvalidFormat',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: '@forms.fraværPeriodeForm.tilOgMed.toDateIsBeforeFromDate',
        [FraværFieldValidationErrors.er_helg]: '@forms.fraværPeriodeForm.tilOgMed.er_helg',
        [FraværFieldValidationErrors.fra_og_til_er_ulike_år]:
            '@forms.fraværPeriodeForm.tilOgMed.fra_og_til_er_ulike_år',
        [FraværFieldValidationErrors.til_dato_kolliderer_med_annet_fravær]:
            '@forms.fraværPeriodeForm.tilOgMed.til_dato_kolliderer_med_annet_fravær',
    },

    ['fraOgMed_tilOgMed']: {
        [FraværFieldValidationErrors.dager_overlapper_med_andre_dager]:
            '@forms.fraværPeriodeForm.periode.dager_overlapper_med_andre_dager',
    },
};

export const FraværPeriodeFormName = 'fraværPeriodeForm';

const Form = getTypedFormComponents<FraværPeriodeFormFields, FraværPeriodeFormValues, ValidationError>();

const FraværPeriodeForm = ({
    fraværPeriode = {},
    periodeDescription,
    maxDate,
    minDate,
    dateRangesToDisable,
    helgedagerIkkeTillat,
    headerContent,
    begrensTilSammeÅr,
    begrensTilSammeÅrAlertStripeTekst,
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();
    const { text } = useFraværIntl();

    const onFormikSubmit = (formValues: FraværPeriodeFormValues) => {
        const fraværPeriodeToSubmit = mapFormValuesToFraværPeriode(formValues, fraværPeriode.id);
        if (isFraværPeriode(fraværPeriodeToSubmit)) {
            onSubmit(fraværPeriodeToSubmit);
        } else {
            throw new Error('FraværPeriodeForm: Formvalues is not a valid FraværPeriode on submit.');
        }
    };

    const formLabels: FraværPeriodeFormLabels = {
        ok: text('@forms.fravær.form.felles.ok'),
        avbryt: text('@forms.fravær.form.felles.avbryt'),
        tittel: text('@forms.fravær.form.periode.tittel'),
        tidsrom: text('@forms.fravær.form.periode.tidsrom'),
        fom: text('@forms.fravær.form.periode.fom'),
        tom: text('@forms.fravær.form.periode.tom'),
    };

    const disabledDateRanges = dateRangesToDisable
        ? dateRangesToDisable.filter((range) => {
              const { fraOgMed, tilOgMed } = fraværPeriode;
              return !(
                  fraOgMed &&
                  tilOgMed &&
                  dayjs(fraOgMed).isSame(range.from, 'day') &&
                  dayjs(tilOgMed).isSame(range.to, 'day')
              );
          })
        : undefined;
    return (
        <Form.FormikWrapper
            initialValues={mapFraværPeriodeToFormValues(fraværPeriode)}
            onSubmit={onFormikSubmit}
            renderForm={(formik) => {
                const { fraOgMed, tilOgMed } = formik.values;
                const fromDate: Date | undefined = ISOStringToDate(fraOgMed);
                const toDate: Date | undefined = ISOStringToDate(tilOgMed);

                return (
                    <Form.Form
                        onCancel={onCancel}
                        formErrorHandler={getIntlFormErrorHandler(intl, '@forms.fraværPeriodeForm')}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}>
                        {headerContent && <Block margin="l">{headerContent}</Block>}
                        <Form.DateRangePicker
                            legend={formLabels.tidsrom}
                            description={periodeDescription}
                            validate={() => {
                                const err = validateFraværPeriodeCollision(fromDate, toDate, disabledDateRanges);
                                if (err) {
                                    return {
                                        key: FraværPeriodeFormErrors.fraOgMed_tilOgMed.dager_overlapper_med_andre_dager,
                                        keepKeyUnaltered: true,
                                    };
                                }
                            }}
                            minDate={minDate}
                            maxDate={maxDate}
                            disableWeekends={helgedagerIkkeTillat || false}
                            disabledDateRanges={disabledDateRanges}
                            fromInputProps={{
                                label: formLabels.fom,
                                name: FraværPeriodeFormFields.fraOgMed,
                                defaultMonth:
                                    fromDate || toDate || dayjs(getDateToday()).isAfter(maxDate)
                                        ? maxDate
                                        : getDateToday(),
                                validate: getFromDateValidator({
                                    begrensTilSammeÅr,
                                    minDate,
                                    maxDate,
                                    helgedagerIkkeTillat,
                                    disabledDateRanges,
                                    toDate,
                                    tilOgMed,
                                }),
                                onChange: () => {
                                    setTimeout(() => {
                                        formik.validateField(FraværPeriodeFormFields.fraOgMed);
                                        formik.validateField(FraværPeriodeFormFields.tilOgMed);
                                    });
                                },
                            }}
                            toInputProps={{
                                label: formLabels.tom,
                                name: FraværPeriodeFormFields.tilOgMed,
                                defaultMonth:
                                    toDate || fromDate || dayjs(getDateToday()).isAfter(maxDate)
                                        ? maxDate
                                        : getDateToday(),
                                validate: getToDateValidator({
                                    begrensTilSammeÅr,
                                    disabledDateRanges,
                                    fraOgMed,
                                    fromDate,
                                    helgedagerIkkeTillat,
                                    maxDate,
                                    minDate,
                                }),
                                onChange: () => {
                                    setTimeout(() => {
                                        formik.validateField(FraværPeriodeFormFields.fraOgMed);
                                        formik.validateField(FraværPeriodeFormFields.tilOgMed);
                                    });
                                },
                            }}
                        />
                        {begrensTilSammeÅr &&
                            begrensTilSammeÅrAlertStripeTekst &&
                            validateErSammeÅr(fraOgMed, tilOgMed) && (
                                <Alert variant="warning">{begrensTilSammeÅrAlertStripeTekst}</Alert>
                            )}
                    </Form.Form>
                );
            }}
        />
    );
};

const getFromDateValidator =
    ({
        helgedagerIkkeTillat,
        begrensTilSammeÅr,
        tilOgMed,
        toDate,
        disabledDateRanges,
        minDate,
        maxDate,
    }: {
        helgedagerIkkeTillat?: boolean;
        begrensTilSammeÅr?: boolean;
        tilOgMed?: string;
        toDate?: Date;
        disabledDateRanges?: DateRange[];
        minDate?: Date;
        maxDate?: Date;
    }) =>
    (value: any): ValidationError | undefined => {
        if (helgedagerIkkeTillat && validateNotHelgedag(value)) {
            return {
                key: FraværPeriodeFormErrors.fraOgMed.er_helg,
                keepKeyUnaltered: true,
            };
        }
        if (begrensTilSammeÅr && validateErSammeÅr(value, tilOgMed)) {
            return {
                key: FraværPeriodeFormErrors.fraOgMed.fra_og_til_er_ulike_år,
                keepKeyUnaltered: true,
            };
        }
        if (validateFraOgMedForCollision(toDate, disabledDateRanges)) {
            return {
                key: FraværPeriodeFormErrors.fraOgMed.fra_dato_kolliderer_med_annet_fravær,
                keepKeyUnaltered: true,
            };
        }
        const dateError = getDateRangeValidator({
            required: true,
            min: minDate,
            max: maxDate,
            toDate,
        }).validateFromDate(value);

        return handleDateRangeValidationError(dateError, minDate, maxDate);
    };

const getToDateValidator =
    ({
        helgedagerIkkeTillat,
        begrensTilSammeÅr,
        fraOgMed,
        fromDate,
        disabledDateRanges,
        minDate,
        maxDate,
    }: {
        helgedagerIkkeTillat?: boolean;
        begrensTilSammeÅr?: boolean;
        fraOgMed?: string;
        fromDate?: Date;
        disabledDateRanges?: DateRange[];
        minDate?: Date;
        maxDate?: Date;
    }) =>
    (value: any) => {
        if (helgedagerIkkeTillat && validateNotHelgedag(value)) {
            return {
                key: FraværPeriodeFormErrors.tilOgMed.er_helg,
                keepKeyUnaltered: true,
            };
        }
        if (begrensTilSammeÅr && validateErSammeÅr(fraOgMed, value)) {
            return {
                key: FraværPeriodeFormErrors.tilOgMed.fra_og_til_er_ulike_år,
                keepKeyUnaltered: true,
            };
        }
        if (validateTilOgMedForCollision(fromDate, disabledDateRanges)) {
            return {
                key: FraværPeriodeFormErrors.tilOgMed.til_dato_kolliderer_med_annet_fravær,
                keepKeyUnaltered: true,
            };
        }
        const dateError = getDateRangeValidator({
            required: true,
            min: minDate,
            max: maxDate,
            fromDate,
        }).validateToDate(value);
        return handleDateRangeValidationError(dateError, minDate, maxDate);
    };
export default FraværPeriodeForm;
