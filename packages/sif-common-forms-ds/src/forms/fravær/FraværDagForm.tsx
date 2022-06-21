import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { DateRange, dateToday } from '@navikt/sif-common-core/lib/utils/dateUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { FormikDatepickerProps } from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/FormikDatepicker';
import {
    getDateValidator,
    getRequiredFieldValidator,
    getYesOrNoValidator,
    ValidateDateError,
    ValidateNumberError,
    ValidateRequiredFieldError,
    ValidateYesOrNoError,
} from '@navikt/sif-common-formik-ds/lib/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import dayjs from 'dayjs';
import FormattedHtmlMessage from '../../components/formatted-html-message/FormattedHtmlMessage';
import FraværTimerSelect from './FraværTimerSelect';
import { isFraværDag, mapFormValuesToFraværDag, mapFraværDagToFormValues, toMaybeNumber } from './fraværUtilities';
import {
    FraværFieldValidationErrors,
    validateFraværDagCollision,
    validateLessOrEqualTo,
    validateNotHelgedag,
} from './fraværValidationUtils';
import { getFraværÅrsakRadios } from './fraværÅrsakRadios';
import { FraværDag, FraværDagFormValues } from './types';
import ÅrsakInfo from './ÅrsakInfo';

export interface FraværDagFormLabels {
    tittel: string;
    dato: string;
    antallArbeidstimer: string;
    timerFravær: string;
    hjemmePgaKorona: string;
    årsak: string;
    ok: string;
    avbryt: string;
}

interface Props {
    fraværDag?: Partial<FraværDag>;
    dagDescription?: JSX.Element;
    minDate: Date;
    maxDate: Date;
    dateRangesToDisable?: DateRange[];
    helgedagerIkkeTillatt?: boolean;
    headerContent?: JSX.Element;
    maksArbeidstidPerDag?: number;
    onSubmit: (values: FraværDag) => void;
    onCancel: () => void;
}

export enum FraværDagFormFields {
    dato = 'dato',
    timerArbeidsdag = 'timerArbeidsdag',
    timerFravær = 'timerFravær',
    hjemmePgaKorona = 'hjemmePgaKorona',
    årsak = 'årsak',
}

export const FraværDagFormErrors = {
    [FraværDagFormFields.dato]: {
        [ValidateDateError.dateHasNoValue]: 'fraværDagForm.dato.dateHasNoValue',
        [ValidateDateError.dateHasInvalidFormat]: 'fraværDagForm.dato.dateHasInvalidFormat',
        [ValidateDateError.dateIsAfterMax]: 'fraværDagForm.dato.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: 'fraværDagForm.dato.dateIsBeforeMin',
        [FraværFieldValidationErrors.er_helg]: 'fraværDagForm.dato.er_helg',
        [FraværFieldValidationErrors.dato_kolliderer_med_annet_fravær]:
            'fraværDagForm.dato.dato_kolliderer_med_annet_fravær',
    },
    [FraværDagFormFields.timerArbeidsdag]: {
        [ValidateNumberError.numberHasNoValue]: 'fraværDagForm.timerArbeidsdag.numberHasNoValue',
    },
    [FraværDagFormFields.timerFravær]: {
        [ValidateNumberError.numberHasNoValue]: 'fraværDagForm.timerFravær.numbverHasNoValue',
        [FraværFieldValidationErrors.fravær_timer_mer_enn_arbeidstimer]:
            'fraværDagForm.timerFravær.fravær_timer_mer_enn_arbeidstimer',
    },
    [FraværDagFormFields.hjemmePgaKorona]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: 'fraværDagForm.hjemmePgaKorona.yesOrNoIsUnanswered',
    },
    [FraværDagFormFields.årsak]: { [ValidateRequiredFieldError.noValue]: 'fraværDagForm.årsak.noValue' },
};

export const FraværDagFormName = 'fraværDagForm';

export const FraværDagForm = getTypedFormComponents<FraværDagFormFields, FraværDagFormValues, ValidationError>();

const FraværDagFormView = ({
    fraværDag = {
        dato: undefined,
        timerArbeidsdag: undefined,
        timerFravær: undefined,
        årsak: undefined,
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
    const onFormikSubmit = (formValues: FraværDagFormValues) => {
        const fraværDagToSubmit = mapFormValuesToFraværDag(formValues, fraværDag.id);
        if (isFraværDag(fraværDagToSubmit)) {
            onSubmit(fraværDagToSubmit);
        } else {
            throw new Error('FraværDagFOrm: Formvalues is not a valid FraværDag on submit.');
        }
    };

    const formLabels: FraværDagFormLabels = {
        ok: intlHelper(intl, 'fravær.form.felles.ok'),
        avbryt: intlHelper(intl, 'fravær.form.felles.avbryt'),
        årsak: intlHelper(intl, 'fravær.form.felles.årsak'),
        tittel: intlHelper(intl, 'fravær.form.dag.tittel'),
        dato: intlHelper(intl, 'fravær.form.dag.dato'),
        antallArbeidstimer: intlHelper(intl, 'fravær.form.dag.antallArbeidstimer'),
        timerFravær: intlHelper(intl, 'fravær.form.dag.timerFravær'),
        hjemmePgaKorona: intlHelper(intl, 'fravær.form.felles.hjemmePgaKorona'),
    };
    const fraværÅrsakRadios = getFraværÅrsakRadios(intl);
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
                        fullscreenOverlay: true,
                        dayPickerProps: {
                            initialMonth: dayjs(dateToday).isAfter(maxDate) ? maxDate : dateToday,
                        },
                        minDate,
                        maxDate,
                        disableWeekend: helgedagerIkkeTillatt || false,
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
                            onCancel={onCancel}
                            formErrorHandler={getFormErrorHandler(intl, 'fraværDagForm')}>
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
                            <FormBlock>
                                <FraværDagForm.YesOrNoQuestion
                                    legend={formLabels.hjemmePgaKorona}
                                    name={FraværDagFormFields.hjemmePgaKorona}
                                    validate={getYesOrNoValidator()}
                                    description={
                                        <ExpandableInfo title={intlHelper(intl, 'info.smittevern.tittel')}>
                                            <FormattedHtmlMessage id="info.smittevern.info.html" />
                                        </ExpandableInfo>
                                    }
                                />
                            </FormBlock>
                            {values.hjemmePgaKorona === YesOrNo.YES && (
                                <FormBlock>
                                    <FraværDagForm.RadioGroup
                                        legend={formLabels.årsak}
                                        name={FraværDagFormFields.årsak}
                                        validate={getRequiredFieldValidator()}
                                        radios={fraværÅrsakRadios}
                                        description={<ÅrsakInfo />}
                                    />
                                </FormBlock>
                            )}
                        </FraværDagForm.Form>
                    );
                }}
            />
        </>
    );
};

export default FraværDagFormView;
