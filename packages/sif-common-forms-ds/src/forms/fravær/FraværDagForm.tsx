import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import {
    datepickerUtils,
    FormikDatepickerProps,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { DateRange, getDateToday } from '@navikt/sif-common-utils';
import {
    getDateValidator,
    getRequiredFieldValidator,
    ValidateDateError,
    ValidateNumberError,
} from '@navikt/sif-validation';
import dayjs from 'dayjs';
import { useFraværIntl } from './fraværMessages';
import FraværTimerSelect from './FraværTimerSelect';
import { isFraværDag, mapFormValuesToFraværDag, mapFraværDagToFormValues, toMaybeNumber } from './fraværUtilities';
import {
    FraværFieldValidationErrors,
    validateFraværDagCollision,
    validateLessOrEqualTo,
    validateNotHelgedag,
} from './fraværValidationUtils';
import { FraværDag, FraværDagFormValues } from './types';

export interface FraværDagFormLabels {
    tittel: string;
    dato: string;
    antallArbeidstimer: string;
    timerFravær: string;
    ok: string;
    avbryt: string;
}

interface Props {
    fraværDag?: Partial<FraværDag>;
    dagDescription?: ReactElement;
    minDate: Date;
    maxDate: Date;
    dateRangesToDisable?: DateRange[];
    helgedagerIkkeTillatt?: boolean;
    headerContent?: ReactElement;
    maksArbeidstidPerDag?: number;
    onSubmit: (values: FraværDag) => void;
    onCancel: () => void;
}

export enum FraværDagFormFields {
    dato = 'dato',
    timerArbeidsdag = 'timerArbeidsdag',
    timerFravær = 'timerFravær',
}

export const FraværDagFormErrors = {
    [FraværDagFormFields.dato]: {
        [ValidateDateError.dateHasNoValue]: '@forms.fraværDagForm.dato.dateHasNoValue',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.fraværDagForm.dato.dateHasInvalidFormat',
        [ValidateDateError.dateIsAfterMax]: '@forms.fraværDagForm.dato.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: '@forms.fraværDagForm.dato.dateIsBeforeMin',
        [FraværFieldValidationErrors.er_helg]: '@forms.fraværDagForm.dato.er_helg',
        [FraværFieldValidationErrors.dato_kolliderer_med_annet_fravær]:
            '@forms.fraværDagForm.dato.dato_kolliderer_med_annet_fravær',
    },
    [FraværDagFormFields.timerArbeidsdag]: {
        [ValidateNumberError.numberHasNoValue]: '@forms.fraværDagForm.timerArbeidsdag.numberHasNoValue',
    },
    [FraværDagFormFields.timerFravær]: {
        [ValidateNumberError.numberHasNoValue]: '@forms.fraværDagForm.timerFravær.numberHasNoValue',
        [FraværFieldValidationErrors.fravær_timer_mer_enn_arbeidstimer]:
            '@forms.fraværDagForm.timerFravær.fravær_timer_mer_enn_arbeidstimer',
    },
};

export const FraværDagFormName = 'fraværDagForm';

export const FraværDagForm = getTypedFormComponents<FraværDagFormFields, FraværDagFormValues, ValidationError>();

const FraværDagFormView = ({
    fraværDag = {
        dato: undefined,
        timerArbeidsdag: undefined,
        timerFravær: undefined,
    },
    dagDescription,
    maxDate,
    minDate,
    dateRangesToDisable,
    helgedagerIkkeTillatt,
    maksArbeidstidPerDag,
    headerContent,
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();
    const { text } = useFraværIntl();
    const onFormikSubmit = (formValues: FraværDagFormValues) => {
        const fraværDagToSubmit = mapFormValuesToFraværDag(formValues, fraværDag.id);
        if (isFraværDag(fraværDagToSubmit)) {
            onSubmit(fraværDagToSubmit);
        } else {
            throw new Error('FraværDagForm: Formvalues is not a valid FraværDag on submit.');
        }
    };

    const formLabels: FraværDagFormLabels = {
        ok: text('@forms.fravær.form.felles.ok'),
        avbryt: text('@forms.fravær.form.felles.avbryt'),
        tittel: text('@forms.fravær.form.dag.tittel'),
        dato: text('@forms.fravær.form.dag.dato'),
        antallArbeidstimer: text('@forms.fravær.form.dag.antallArbeidstimer'),
        timerFravær: text('@forms.fravær.form.dag.timerFravær'),
    };

    const disabledDateRanges = dateRangesToDisable
        ? dateRangesToDisable.filter((range) => {
              const { dato } = fraværDag;
              return !(dato && dayjs(dato).isSame(range.from, 'day') && dayjs(dato).isSame(range.to, 'day'));
          })
        : undefined;

    return (
        <>
            <FraværDagForm.FormikWrapper
                initialValues={mapFraværDagToFormValues(fraværDag)}
                onSubmit={onFormikSubmit}
                renderForm={(formik) => {
                    const { values } = formik;
                    const valgtDato = datepickerUtils.getDateFromDateString(values.dato);
                    const datepickerProps: FormikDatepickerProps<FraværDagFormFields, ValidationError> = {
                        label: formLabels.dato,
                        name: FraværDagFormFields.dato,
                        defaultMonth: dayjs(getDateToday()).isAfter(maxDate) ? maxDate : getDateToday(),
                        minDate,
                        maxDate,
                        disableWeekends: helgedagerIkkeTillatt || false,
                        disabledDateRanges,
                        validate: (value): ValidationError | undefined => {
                            if (helgedagerIkkeTillatt && validateNotHelgedag(value)) {
                                return {
                                    key: FraværDagFormErrors.dato.er_helg,
                                    keepKeyUnaltered: true,
                                };
                            }
                            if (validateFraværDagCollision(valgtDato, disabledDateRanges)) {
                                return {
                                    key: FraværDagFormErrors.dato.dato_kolliderer_med_annet_fravær,
                                    keepKeyUnaltered: true,
                                };
                            }
                            return getDateValidator({ required: true, min: minDate, max: maxDate })(value);
                        },
                        onChange: () => {
                            setTimeout(() => {
                                formik.validateField(FraværDagFormFields.dato);
                            });
                        },
                    };

                    return (
                        <FraværDagForm.Form
                            submitButtonLabel="Ok"
                            showButtonArrows={false}
                            onCancel={onCancel}
                            formErrorHandler={getIntlFormErrorHandler(intl, '@forms.fraværDagForm')}>
                            {headerContent && <Block>{headerContent}</Block>}

                            <FraværDagForm.DatePicker {...datepickerProps} description={dagDescription} />

                            <FormBlock>
                                <FraværTimerSelect
                                    name={FraværDagFormFields.timerArbeidsdag}
                                    validate={getRequiredFieldValidator()}
                                    label={formLabels.antallArbeidstimer}
                                    maksTid={maksArbeidstidPerDag}
                                />
                            </FormBlock>
                            <FormBlock>
                                <FraværTimerSelect
                                    name={FraværDagFormFields.timerFravær}
                                    validate={(value) => {
                                        if (validateLessOrEqualTo(toMaybeNumber(values.timerArbeidsdag))(value)) {
                                            return {
                                                key: FraværDagFormErrors.timerFravær.fravær_timer_mer_enn_arbeidstimer,
                                                keepKeyUnaltered: true,
                                            };
                                        }
                                        return getRequiredFieldValidator()(value);
                                    }}
                                    label={formLabels.timerFravær}
                                    maksTid={maksArbeidstidPerDag}
                                />
                            </FormBlock>
                        </FraværDagForm.Form>
                    );
                }}
            />
        </>
    );
};

export default FraværDagFormView;
