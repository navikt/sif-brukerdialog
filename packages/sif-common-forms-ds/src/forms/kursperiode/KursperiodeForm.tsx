import { VStack } from '@navikt/ds-react';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ISOStringToDate,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getDateValidator,
    getStringValidator,
    getYesOrNoValidator,
} from '@navikt/sif-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { handleDateRangeValidationError } from '@navikt/sif-common-forms-ds/src/utils';
import { FormLayout } from '@navikt/sif-common-ui';
import { ISODate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useKursperiodeIntl } from './kursperiodeMessages';
import { Kursperiode } from './types/Kursperiode';
import kursperiodeUtils from './utils/kursperiodeUtils';

interface Props {
    minDate?: Date;
    maxDate?: Date;
    kursperiode?: Kursperiode;
    alleKursperioder?: Kursperiode[];
    onSubmit: (kursperiode: Kursperiode) => void;
    onCancel: () => void;
}

export enum KursperiodeFormFields {
    tom = 'tom',
    fom = 'fom',
    avreiseSammeDag = 'avreiseSammeDag',
    hjemkomstSammeDag = 'hjemkomstSammeDag',
    avreise = 'avreise',
    hjemkomst = 'hjemkomst',
    beskrivelseReisetidTil = 'beskrivelseReisetidTil',
    beskrivelseReisetidHjem = 'beskrivelseReisetidHjem',
}

export interface KursperiodeFormValues {
    [KursperiodeFormFields.fom]: ISODate;
    [KursperiodeFormFields.tom]: ISODate;
    [KursperiodeFormFields.avreiseSammeDag]: YesOrNo;
    [KursperiodeFormFields.hjemkomstSammeDag]: YesOrNo;
    [KursperiodeFormFields.avreise]?: ISODate;
    [KursperiodeFormFields.hjemkomst]?: string;
    [KursperiodeFormFields.beskrivelseReisetidHjem]?: string;
    [KursperiodeFormFields.beskrivelseReisetidTil]?: string;
}

const Form = getTypedFormComponents<KursperiodeFormFields, KursperiodeFormValues, ValidationError>();

const KursperiodeForm = ({ maxDate, minDate, kursperiode, alleKursperioder = [], onSubmit, onCancel }: Props) => {
    const { intl, text } = useKursperiodeIntl();

    const onFormikSubmit = (formValues: KursperiodeFormValues) => {
        const dateKursperiodeToSubmit = kursperiodeUtils.mapFormValuesToKursperiode(formValues, kursperiode?.id);
        if (kursperiodeUtils.isValidKursperiode(dateKursperiodeToSubmit)) {
            onSubmit(dateKursperiodeToSubmit);
        } else {
            throw new Error('KursperiodeForm: Formvalues is not a valid Kursperiode on submit.');
        }
    };

    return (
        <>
            <Form.FormikWrapper
                initialValues={kursperiodeUtils.mapKursperiodeToFormValues(kursperiode || {})}
                onSubmit={onFormikSubmit}
                renderForm={(formik) => {
                    const disabledDateRanges =
                        kursperiode === undefined
                            ? alleKursperioder.map((k) => k.periode)
                            : alleKursperioder.filter((t) => t.id !== kursperiode.id).map((k) => k.periode);

                    const startdato = ISOStringToDate(formik.values[KursperiodeFormFields.fom]);
                    const sluttdato = ISOStringToDate(formik.values[KursperiodeFormFields.tom]);

                    const harIkkeAvreiseSammeDag = formik.values[KursperiodeFormFields.avreiseSammeDag] === YesOrNo.NO;
                    const harIkkeHjemkomstSammeDag =
                        formik.values[KursperiodeFormFields.hjemkomstSammeDag] === YesOrNo.NO;

                    return (
                        <Form.Form
                            onCancel={onCancel}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'kursperiodeForm')}
                            submitButtonLabel="Ok"
                            showButtonArrows={false}>
                            <VStack gap={'6'} maxWidth={'30rem'}>
                                <Form.DateRangePicker
                                    legend={text('kursperiode.form.periode.label')}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    disabledDateRanges={disabledDateRanges}
                                    fromInputProps={{
                                        label: text('kursperiode.form.fromDate'),
                                        name: KursperiodeFormFields.fom,
                                        validate: (value) => {
                                            const error = getDateRangeValidator({
                                                required: true,
                                                min: minDate,
                                                max: maxDate,
                                                toDate: ISOStringToDate(formik.values.tom),
                                            }).validateFromDate(value);
                                            return handleDateRangeValidationError(error, minDate, maxDate);
                                        },
                                        onChange: () => {
                                            setTimeout(() => {
                                                formik.validateField(KursperiodeFormFields.tom);
                                            });
                                        },
                                    }}
                                    toInputProps={{
                                        label: text('kursperiode.form.toDate'),
                                        name: KursperiodeFormFields.tom,
                                        validate: (value) => {
                                            const error = getDateRangeValidator({
                                                required: true,
                                                min: minDate,
                                                max: maxDate,
                                                fromDate: ISOStringToDate(formik.values.fom),
                                            }).validateToDate(value);
                                            return handleDateRangeValidationError(error, minDate, maxDate);
                                        },
                                        onChange: () => {
                                            setTimeout(() => {
                                                formik.validateField(KursperiodeFormFields.fom);
                                            });
                                        },
                                    }}
                                />
                                {startdato && sluttdato ? (
                                    <VStack gap="6">
                                        <VStack gap="4">
                                            <Form.YesOrNoQuestion
                                                name={KursperiodeFormFields.avreiseSammeDag}
                                                legend={text('kursperiode.form.avreiseSammeDag.label')}
                                                validate={getYesOrNoValidator()}
                                            />
                                            {harIkkeAvreiseSammeDag ? (
                                                <Form.DatePicker
                                                    name={KursperiodeFormFields.avreise}
                                                    label={text('kursperiode.form.avreise.label')}
                                                    maxDate={dayjs(startdato).subtract(1, 'day').toDate()}
                                                    validate={getDateValidator({ required: true, max: startdato })}
                                                />
                                            ) : null}
                                            {kursperiodeUtils.måBesvareBeskrivelseReisetidTil(formik.values) && (
                                                <VStack gap={'2'}>
                                                    <FormLayout.Panel>
                                                        <Form.Textarea
                                                            name={KursperiodeFormFields.beskrivelseReisetidTil}
                                                            label={text(
                                                                'kursperiode.form.beskrivelseReisetidTil.label',
                                                            )}
                                                            description={text(
                                                                'kursperiode.form.beskrivelseReisetidTil.description',
                                                            )}
                                                            validate={getStringValidator({
                                                                minLength: 5,
                                                                required: true,
                                                                maxLength: 500,
                                                            })}
                                                        />
                                                    </FormLayout.Panel>
                                                </VStack>
                                            )}
                                        </VStack>

                                        <VStack gap="4">
                                            <Form.YesOrNoQuestion
                                                name={KursperiodeFormFields.hjemkomstSammeDag}
                                                legend={text('kursperiode.form.hjemkomstSammeDag.label')}
                                                validate={getYesOrNoValidator()}
                                            />
                                            {harIkkeHjemkomstSammeDag ? (
                                                <Form.DatePicker
                                                    name={KursperiodeFormFields.hjemkomst}
                                                    label={text('kursperiode.form.hjemkomst.label')}
                                                    minDate={dayjs(sluttdato).add(1, 'day').toDate()}
                                                    validate={getDateValidator({ required: true, min: sluttdato })}
                                                />
                                            ) : null}

                                            {kursperiodeUtils.måBesvareBeskrivelseReisetidHjem(formik.values) && (
                                                <FormLayout.Panel>
                                                    <Form.Textarea
                                                        name={KursperiodeFormFields.beskrivelseReisetidHjem}
                                                        label={text('kursperiode.form.beskrivelseReisetidHjem.label')}
                                                        description={text(
                                                            'kursperiode.form.beskrivelseReisetidHjem.description',
                                                        )}
                                                        validate={getStringValidator({
                                                            minLength: 5,
                                                            required: true,
                                                            maxLength: 500,
                                                        })}
                                                    />
                                                </FormLayout.Panel>
                                            )}
                                        </VStack>
                                    </VStack>
                                ) : null}
                            </VStack>
                        </Form.Form>
                    );
                }}
            />
        </>
    );
};

export default KursperiodeForm;
