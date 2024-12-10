import { Box, Button } from '@navikt/ds-react';
import { getTypedFormComponents, ISOStringToDate, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { ISODate } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../../i18n';
import {
    getDateRangeValidator,
    getDateValidator,
    getStringValidator,
    getYesOrNoValidator,
} from '@navikt/sif-common-formik-ds/src/validation';
import { getTillattSøknadsperiode } from '../../../../utils/søknadsperiodeUtils';
import { useFormikContext } from 'formik';
import { KursFormFields } from '../KursStep';
import { Delete } from '@navikt/ds-icons';
import kursperiodeUtils, { getPerioderFromKursperiodeFormValue } from '../kursperiodeUtils';
import { handleDateRangeValidationError } from '@navikt/sif-common-forms-ds/src/utils';
import { FormLayout } from '@navikt/sif-common-ui';

export enum KursperiodeFormFields {
    tom = 'tom',
    fom = 'fom',
    harTaptArbeidstid = 'harTaptArbeidstid',
    avreise = 'avreise',
    hjemkomst = 'hjemkomst',
    beskrivelseReisetid = 'beskrivelseReisetid',
}

export interface KursperiodeFormValues {
    [KursperiodeFormFields.fom]: ISODate;
    [KursperiodeFormFields.tom]: ISODate;
    [KursperiodeFormFields.harTaptArbeidstid]: YesOrNo;
    [KursperiodeFormFields.avreise]?: ISODate;
    [KursperiodeFormFields.hjemkomst]?: string;
    [KursperiodeFormFields.beskrivelseReisetid]?: string;
}
const Form = getTypedFormComponents<KursperiodeFormFields, KursperiodeFormValues, ValidationError>();

interface Props {
    values: Partial<KursperiodeFormValues>;
    index: number;
    harFlerePerioder?: boolean;
    allePerioder: Partial<KursperiodeFormValues>[];
    onRemove?: () => void;
}

const getValidationErrorKey = (field: KursperiodeFormFields, error: string) => {
    return `kursperiode.form.${field}.validation.${error}`;
};
const KursperiodeQuestions = ({ values, index, harFlerePerioder, allePerioder, onRemove }: Props) => {
    const { text } = useAppIntl();
    const gyldigSøknadsperiode = getTillattSøknadsperiode();
    const { validateField } = useFormikContext<KursperiodeFormValues>();
    const minDate = gyldigSøknadsperiode.from;
    const maxDate = gyldigSøknadsperiode.to;

    const getFieldName = (field: KursperiodeFormFields) =>
        `${KursFormFields.kursperioder}.${index}.${field}` as KursperiodeFormFields;

    const disabledDateRanges = allePerioder
        .filter((p) => p !== values)
        .map(getPerioderFromKursperiodeFormValue)
        .filter((p) => p !== undefined)
        .map((periode) => periode.periodeMedReise);

    const startdato = ISOStringToDate(values[KursperiodeFormFields.fom]);
    const sluttdato = ISOStringToDate(values[KursperiodeFormFields.tom]);
    const harTaptArbeidstid = values[KursperiodeFormFields.harTaptArbeidstid] === YesOrNo.YES;
    const periodeNr = index + 1;

    return (
        <FormLayout.Questions>
            <Form.DateRangePicker
                legend={text('kursperiode.form.periode.label', { periodeNr })}
                hideLegend={harFlerePerioder === false}
                minDate={minDate}
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
            <Form.YesOrNoQuestion
                name={getFieldName(KursperiodeFormFields.harTaptArbeidstid)}
                legend={text('kursperiode.form.harTaptArbeidstid.label')}
                validate={(value) => {
                    const error = getYesOrNoValidator()(value);
                    if (error) {
                        return {
                            key: getValidationErrorKey(KursperiodeFormFields.harTaptArbeidstid, error),
                            keepKeyUnaltered: true,
                            values: { periodeNr, harFlerePerioder },
                        };
                    }
                }}
            />
            {harTaptArbeidstid ? (
                <>
                    <Form.DatePicker
                        name={getFieldName(KursperiodeFormFields.avreise)}
                        label={text('kursperiode.form.avreise.label')}
                        maxDate={startdato}
                        defaultMonth={startdato}
                        validate={(value) => {
                            const error = getDateValidator({ required: true, max: startdato })(value);
                            if (error) {
                                return {
                                    key: getValidationErrorKey(KursperiodeFormFields.avreise, error),
                                    keepKeyUnaltered: true,
                                    values: { periodeNr, harFlerePerioder },
                                };
                            }
                        }}
                    />

                    <Form.DatePicker
                        name={getFieldName(KursperiodeFormFields.hjemkomst)}
                        label={text('kursperiode.form.hjemkomst.label')}
                        minDate={sluttdato}
                        defaultMonth={sluttdato}
                        validate={(value) => {
                            const error = getDateValidator({ required: true, min: sluttdato })(value);
                            if (error) {
                                return {
                                    key: getValidationErrorKey(KursperiodeFormFields.hjemkomst, error),
                                    keepKeyUnaltered: true,
                                    values: { periodeNr, harFlerePerioder },
                                };
                            }
                        }}
                    />

                    {kursperiodeUtils.måBesvareBeskrivelseReisetid(values) && (
                        <Form.Textarea
                            name={getFieldName(KursperiodeFormFields.beskrivelseReisetid)}
                            label={text('kursperiode.form.beskrivelseReisetid.label')}
                            description={text('kursperiode.form.beskrivelseReisetid.description')}
                            validate={(value) => {
                                const error = getStringValidator({
                                    minLength: 5,
                                    required: true,
                                    maxLength: 500,
                                })(value);
                                if (error) {
                                    return {
                                        key: getValidationErrorKey(KursperiodeFormFields.beskrivelseReisetid, error),
                                        keepKeyUnaltered: true,
                                        values: { periodeNr, harFlerePerioder, maxLength: 500 },
                                    };
                                }
                            }}
                        />
                    )}
                </>
            ) : null}
            {harFlerePerioder && onRemove && (
                <Box>
                    <Button
                        type="button"
                        variant="secondary"
                        iconPosition="left"
                        icon={<Delete aria-hidden={true} />}
                        onClick={onRemove}
                        size="small">
                        <AppText id="kursperiode.fjern.label" values={{ periodeNr, harFlerePerioder }} />
                    </Button>
                </Box>
            )}
        </FormLayout.Questions>
    );
};

export default KursperiodeQuestions;
