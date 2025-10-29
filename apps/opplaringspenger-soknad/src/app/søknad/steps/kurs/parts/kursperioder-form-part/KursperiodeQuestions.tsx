import { Box, Button, VStack } from '@navikt/ds-react';
import { getTypedFormComponents, ISOStringToDate, ValidationError } from '@navikt/sif-common-formik-ds';
import { handleDateRangeValidationError } from '@navikt/sif-common-forms-ds/src/utils';
import { DateRange, ISODate } from '@navikt/sif-common-utils';
import { getDateRangeValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../../../../i18n';
import kursperiodeOgDagUtils from '../../utils/kursperiodeOgDagUtils';
import { KursFormFields } from '../../KursStep';
import { startOgSluttErSammeHelg } from '../../utils/kursStepUtils';
import { TrashIcon } from '@navikt/aksel-icons';

export enum KursperiodeFormFields {
    tom = 'tom',
    fom = 'fom',
}

export interface KursperiodeFormValues {
    [KursperiodeFormFields.fom]: ISODate;
    [KursperiodeFormFields.tom]: ISODate;
}
const Form = getTypedFormComponents<KursperiodeFormFields, KursperiodeFormValues, ValidationError>();

interface Props {
    values: Partial<KursperiodeFormValues>;
    index: number;
    harFlerePerioder?: boolean;
    allePerioder: Array<Partial<KursperiodeFormValues>>;
    gyldigSøknadsperiode: DateRange;
    onRemove?: () => void;
}

const getValidationErrorKey = (field: KursperiodeFormFields, error: string) => {
    return `kursperiode.form.${field}.validation.${error}`;
};
const KursperiodeQuestions = ({
    values,
    index,
    harFlerePerioder,
    allePerioder,
    gyldigSøknadsperiode,
    onRemove,
}: Props) => {
    const { text } = useAppIntl();
    const { validateField } = useFormikContext<KursperiodeFormValues>();
    const minDate = gyldigSøknadsperiode.from;
    const maxDate = gyldigSøknadsperiode.to;

    const getFieldName = (field: KursperiodeFormFields) =>
        `${KursFormFields.kursperioder}.${index}.${field}` as KursperiodeFormFields;

    const disabledDateRanges = allePerioder
        .filter((p) => p !== values)
        .map(kursperiodeOgDagUtils.getPeriodeFromKursperiodeFormValue)
        .filter((p) => p !== undefined);
    const startdato = ISOStringToDate(values[KursperiodeFormFields.fom]);
    const sluttdato = ISOStringToDate(values[KursperiodeFormFields.tom]);
    const periodeNr = index + 1;

    return (
        <VStack gap="4">
            <Form.DateRangePicker
                legend={text('kursperiode.form.periode.label', { periodeNr })}
                hideLegend={true}
                minDate={minDate}
                validate={() => {
                    const error = startOgSluttErSammeHelg(startdato, sluttdato);
                    if (error) {
                        return {
                            key: `kursperiode.form.validation.startOgSluttErSammeHelg.${harFlerePerioder ? 'flerePerioder' : 'enPeriode'}`,
                            values: { periodeNr },
                            keepKeyUnaltered: true,
                        };
                    }

                    return undefined;
                }}
                maxDate={maxDate}
                fieldFromDate={startdato}
                fieldToDate={sluttdato}
                disabledDateRanges={disabledDateRanges}
                fromInputProps={{
                    label: text('kursperiode.form.fom.label'),
                    name: getFieldName(KursperiodeFormFields.fom),
                    validate: (value) => {
                        const error = getDateRangeValidator({
                            required: true,
                            min: minDate,
                            max: maxDate,
                            toDate: ISOStringToDate(values.tom),
                        }).validateFromDate(value);
                        const dateRangeError = handleDateRangeValidationError(error, minDate, maxDate);
                        if (dateRangeError) {
                            return typeof dateRangeError === 'string'
                                ? {
                                      key: getValidationErrorKey(KursperiodeFormFields.fom, dateRangeError),
                                      keepKeyUnaltered: true,
                                      values: { periodeNr, harFlerePerioder },
                                  }
                                : {
                                      key: getValidationErrorKey(KursperiodeFormFields.fom, dateRangeError.key),
                                      keepKeyUnaltered: true,
                                      values: { periodeNr, harFlerePerioder, ...dateRangeError.values },
                                  };
                        }
                    },
                    onChange: () => {
                        setTimeout(() => {
                            validateField(KursperiodeFormFields.tom);
                        });
                    },
                }}
                toInputProps={{
                    label: text('kursperiode.form.tom.label'),
                    name: getFieldName(KursperiodeFormFields.tom),
                    defaultMonth: startdato,
                    validate: (value) => {
                        const error = getDateRangeValidator({
                            required: true,
                            min: minDate,
                            max: maxDate,
                            fromDate: ISOStringToDate(values.fom),
                        }).validateToDate(value);
                        const dateRangeError = handleDateRangeValidationError(error, minDate, maxDate);
                        if (dateRangeError) {
                            return typeof dateRangeError === 'string'
                                ? {
                                      key: getValidationErrorKey(KursperiodeFormFields.tom, dateRangeError),
                                      keepKeyUnaltered: true,
                                      values: { periodeNr, harFlerePerioder },
                                  }
                                : {
                                      key: getValidationErrorKey(KursperiodeFormFields.tom, dateRangeError.key),
                                      keepKeyUnaltered: true,
                                      values: { periodeNr, harFlerePerioder, ...dateRangeError.values },
                                  };
                        }
                    },
                    onChange: () => {
                        setTimeout(() => {
                            validateField(KursperiodeFormFields.fom);
                        });
                    },
                }}
            />

            {harFlerePerioder && onRemove && (
                <Box>
                    <Button
                        type="button"
                        variant="tertiary"
                        iconPosition="left"
                        icon={<TrashIcon aria-hidden={true} />}
                        onClick={onRemove}
                        size="small">
                        <AppText id="kursperiode.fjern.label" values={{ periodeNr, harFlerePerioder }} />
                    </Button>
                </Box>
            )}
        </VStack>
    );
};

export default KursperiodeQuestions;
