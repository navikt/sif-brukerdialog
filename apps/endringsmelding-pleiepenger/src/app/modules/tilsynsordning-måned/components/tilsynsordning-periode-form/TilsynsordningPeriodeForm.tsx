import { useAppIntl } from '@app/i18n';
import { Box } from '@navikt/ds-react';
import {
    datepickerUtils,
    DateRange,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateToISODate, DurationWeekdays } from '@navikt/sif-common-utils';
import { getDateRangeValidator, ValidateDateError, ValidateDateRangeError } from '@navikt/sif-validation';

import TidFasteUkedagerInput from '../../../../local-sif-common-pleiepenger/components/tid-faste-ukedager-input/TidFasteUkedagerInput';
import { TilsynsordningPeriodeData } from '../../../../søknad/steps/tilsynsordning-forenklet/types';
import { getTilsynsordningFastDagValidator, validateTilsynsordningFasteDager } from './tilsynsordningFormValidation';

export interface TilsynsordningPeriodeFormProps {
    id?: string;
    periode: DateRange;
    endretPeriode?: TilsynsordningPeriodeData;
    endringerISøknadsperiode: TilsynsordningPeriodeData[];
    onSubmit: (data: TilsynsordningPeriodeData) => void;
    onCancel: () => void;
}

enum FormFields {
    'fom' = 'fom',
    'tom' = 'tom',
    'tidFasteDager' = 'tidFasteDager',
    'tidFasteDager.gruppe' = 'tidFasteDager.gruppe',
}

interface FormValues {
    [FormFields.fom]: string;
    [FormFields.tom]: string;
    [FormFields.tidFasteDager]: DurationWeekdays;
}

const FormComponents = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const getInitialFormValues = (endretPeriode: TilsynsordningPeriodeData | undefined): Partial<FormValues> => {
    if (endretPeriode) {
        return {
            fom: dateToISODate(endretPeriode.periode.from),
            tom: dateToISODate(endretPeriode.periode.to),
            tidFasteDager: endretPeriode.tidFasteDager,
        };
    }

    return {};
};

const TilsynsordningPeriodeForm = ({
    periode,
    endretPeriode,
    endringerISøknadsperiode,
    onSubmit,
    onCancel,
}: TilsynsordningPeriodeFormProps) => {
    const { intl, text } = useAppIntl();

    const onValidSubmit = (values: Partial<FormValues>) => {
        const fom = datepickerUtils.getDateFromDateString(values.fom);
        const tom = datepickerUtils.getDateFromDateString(values.tom);

        if (!fom || !tom || !values.tidFasteDager) {
            throw new Error('TilsynsordningPeriodeForm. Ugyldig fom/tom eller tidFasteDager ');
        }

        onSubmit({
            id: endretPeriode?.id,
            periode: {
                from: fom,
                to: tom,
            },
            tidFasteDager: values.tidFasteDager,
        });
    };

    const disabledDateRanges = endringerISøknadsperiode.filter((e) => e.id !== endretPeriode?.id).map((e) => e.periode);

    return (
        <FormComponents.FormikWrapper
            initialValues={getInitialFormValues(endretPeriode)}
            onSubmit={onValidSubmit}
            renderForm={({ values: { fom, tom, tidFasteDager } }) => {
                const from = datepickerUtils.getDateFromDateString(fom);
                const to = datepickerUtils.getDateFromDateString(tom);

                return (
                    <FormComponents.Form
                        onCancel={onCancel}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'tilsynsordningPeriodeForm.validation')}
                        includeValidationSummary={true}
                        showButtonArrows={false}
                        submitButtonLabel={text('tilsynsordningPeriodeForm.submitButtonLabel')}
                        cancelButtonLabel={text('tilsynsordningPeriodeForm.cancelButtonLabel')}>
                        <FormLayout.Questions>
                            <div style={{ maxWidth: '24rem' }}>
                                <FormComponents.DateRangePicker
                                    legend={text('tilsynsordningPeriodeForm.periode.legend')}
                                    disableWeekends={true}
                                    minDate={periode.from}
                                    maxDate={periode.to}
                                    disabledDateRanges={disabledDateRanges}
                                    fromInputProps={{
                                        label: text('tilsynsordningPeriodeForm.fraOgMed.label'),
                                        name: FormFields.fom,
                                        defaultMonth: periode.from,
                                        validate: getDateRangeValidator({
                                            required: true,
                                            onlyWeekdays: true,
                                            toDate: to,
                                            fromDate: from,
                                            min: periode.from,
                                            max: to || periode.to,
                                        }).validateFromDate,
                                    }}
                                    toInputProps={{
                                        label: text('tilsynsordningPeriodeForm.tilOgMed.label'),
                                        name: FormFields.tom,
                                        defaultMonth: from || periode.from,
                                        validate: getDateRangeValidator({
                                            required: true,
                                            onlyWeekdays: true,
                                            toDate: to,
                                            fromDate: from,
                                            min: from || periode.from,
                                            max: periode.to,
                                        }).validateToDate,
                                    }}
                                />
                            </div>

                            <FormComponents.InputGroup
                                legend={text('tilsynsordningPeriodeForm.tidFasteDager.label')}
                                validate={() => {
                                    const error = validateTilsynsordningFasteDager(tidFasteDager);
                                    return error
                                        ? {
                                              key: `${error}`,
                                          }
                                        : undefined;
                                }}
                                name={FormFields['tidFasteDager.gruppe']}>
                                <Box paddingBlock="space-8 space-0">
                                    <TidFasteUkedagerInput
                                        name={FormFields.tidFasteDager}
                                        validateDag={(dag, value) => {
                                            const error = getTilsynsordningFastDagValidator()(value);
                                            return error
                                                ? {
                                                      key: `tilsynsordningPeriodeForm.validation.tidFasteDager.tid.${error}`,
                                                      keepKeyUnaltered: true,
                                                      values: { dag },
                                                  }
                                                : undefined;
                                        }}
                                    />
                                </Box>
                            </FormComponents.InputGroup>
                        </FormLayout.Questions>
                    </FormComponents.Form>
                );
            }}
        />
    );
};

export const OmsorgstilbudPeriodeFormErrors = {
    [FormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: 'tilsynsordningPeriodeForm.validation.fom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: 'tilsynsordningPeriodeForm.validation.fom.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: 'tilsynsordningPeriodeForm.validation.fom.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]: 'tilsynsordningPeriodeForm.validation.fom.dateHasInvalidFormat',
        [ValidateDateRangeError.fromDateIsAfterToDate]:
            'tilsynsordningPeriodeForm.validation.fom.fromDateIsAfterToDate',
    },
    [FormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: 'tilsynsordningPeriodeForm.validation.tom.dateHasNoValue',
        [ValidateDateError.dateIsAfterMax]: 'tilsynsordningPeriodeForm.validation.tom.dateIsAfterMax',
        [ValidateDateError.dateIsBeforeMin]: 'tilsynsordningPeriodeForm.validation.tom.dateIsBeforeMin',
        [ValidateDateError.dateHasInvalidFormat]: 'tilsynsordningPeriodeForm.validation.tom.dateHasInvalidFormat',
        [ValidateDateRangeError.toDateIsBeforeFromDate]:
            'tilsynsordningPeriodeForm.validation.tom.toDateIsBeforeFromDate',
    },
    [FormFields['tidFasteDager.gruppe']]: {
        ['ingenTidRegistrert']: 'tilsynsordningPeriodeForm.validation.tidFasteDager.gruppe.ingenTidRegistrert',
        ['forMangeTimer']: 'tilsynsordningPeriodeForm.validation.tidFasteDager.gruppe.forMangeTimer',
    },
};

export default TilsynsordningPeriodeForm;
