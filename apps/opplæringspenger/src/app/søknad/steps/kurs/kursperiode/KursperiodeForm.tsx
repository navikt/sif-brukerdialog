import { useIntl } from 'react-intl';
import { getTypedFormComponents, ISOStringToDate, YesOrNo } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getDateValidator,
    getStringValidator,
    getYesOrNoValidator,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import kursperiodeUtils from './kursperiodeUtils';
import { useKursperiodeIntl } from './kursperiodeMessages';
import { handleDateRangeValidationError } from '@navikt/sif-common-forms-ds/src/utils';
import { Kursperiode } from '../../../../types/Kursperiode';
import { ISODate } from '@navikt/sif-common-utils';
import { VStack } from '@navikt/ds-react';
import { FormPanel } from '@navikt/sif-common-ui';
import dayjs from 'dayjs';
export interface KursperiodeFormLabels {
    fromDate: string;
    toDate: string;
    intervalTitle: string;
    okButton: string;
    cancelButton: string;
}

interface Props {
    minDate?: Date;
    maxDate?: Date;
    kursperiode?: Kursperiode;
    alleKursperioder?: Kursperiode[];
    formLabels?: Partial<KursperiodeFormLabels>;
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
    begrunnelseReisetidTil = 'begrunnelseReisetidTil',
    begrunnelseReisetidHjem = 'begrunnelseReisetidHjem',
}

export interface KursperiodeFormValues {
    [KursperiodeFormFields.fom]: ISODate;
    [KursperiodeFormFields.tom]: ISODate;
    [KursperiodeFormFields.avreiseSammeDag]: YesOrNo;
    [KursperiodeFormFields.hjemkomstSammeDag]: YesOrNo;
    [KursperiodeFormFields.avreise]?: ISODate;
    [KursperiodeFormFields.hjemkomst]?: string;
    [KursperiodeFormFields.begrunnelseReisetidHjem]?: string;
    [KursperiodeFormFields.begrunnelseReisetidTil]?: string;
}

const Form = getTypedFormComponents<KursperiodeFormFields, KursperiodeFormValues, ValidationError>();

const KursperiodeForm = ({
    maxDate,
    minDate,
    formLabels,
    kursperiode,
    alleKursperioder = [],
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();
    const { text } = useKursperiodeIntl();

    const onFormikSubmit = (formValues: KursperiodeFormValues) => {
        const dateKursperiodeToSubmit = kursperiodeUtils.mapFormValuesToKursperiode(formValues, kursperiode?.id);
        if (kursperiodeUtils.isValidKursperiode(dateKursperiodeToSubmit)) {
            onSubmit(dateKursperiodeToSubmit);
        } else {
            throw new Error('KursperiodeForm: Formvalues is not a valid Kursperiode on submit.');
        }
    };

    const defaultLabels: KursperiodeFormLabels = {
        intervalTitle: text('kursperiode.form.title'),
        fromDate: text('kursperiode.form.fromDate'),
        toDate: text('kursperiode.form.toDate'),
        okButton: text('kursperiode.form.okButton'),
        cancelButton: text('kursperiode.form.cancelButton'),
    };

    const inlineLabels: KursperiodeFormLabels = { ...defaultLabels, ...formLabels };

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
                            formErrorHandler={getFormErrorHandler(intl, 'kursperiodeForm')}
                            submitButtonLabel="Ok"
                            showButtonArrows={false}>
                            <VStack gap={'6'} maxWidth={'30rem'}>
                                <Form.DateRangePicker
                                    legend={inlineLabels.intervalTitle}
                                    description="Velg start- og sluttdato for kursperioden."
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    disabledDateRanges={disabledDateRanges}
                                    fromInputProps={{
                                        label: inlineLabels.fromDate,
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
                                        label: inlineLabels.toDate,
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
                                                legend="Reiser du til kursstedet på samme dag som kurset starter?"
                                                validate={getYesOrNoValidator()}
                                            />
                                            {harIkkeAvreiseSammeDag ? (
                                                <Form.DatePicker
                                                    name={KursperiodeFormFields.avreise}
                                                    label="Hvilken dato reiser du til kursstedet"
                                                    maxDate={dayjs(startdato).subtract(1, 'day').toDate()}
                                                    validate={getDateValidator({ max: startdato })}
                                                />
                                            ) : null}
                                            {kursperiodeUtils.måBesvareBegrunnelseReisetidTil(formik.values) && (
                                                <VStack gap={'2'}>
                                                    <FormPanel>
                                                        <Form.Textarea
                                                            name={KursperiodeFormFields.begrunnelseReisetidTil}
                                                            label="Begrunnelse for reisetid til kurssted"
                                                            description="På grunn av at det er mer enn én dag mellom avreise og startdato, må du begrunne reisetiden til kursstedet."
                                                            validate={getStringValidator({
                                                                minLength: 5,
                                                                required: true,
                                                            })}
                                                        />
                                                    </FormPanel>
                                                </VStack>
                                            )}
                                        </VStack>

                                        <VStack gap="4">
                                            <Form.YesOrNoQuestion
                                                name={KursperiodeFormFields.hjemkomstSammeDag}
                                                legend="Kommer du hjem fra kursstedet på samme dag som kurset slutter?"
                                                validate={getYesOrNoValidator()}
                                            />
                                            {harIkkeHjemkomstSammeDag ? (
                                                <Form.DatePicker
                                                    name={KursperiodeFormFields.hjemkomst}
                                                    label="Hvilken dato kommer du hjem fra kursstedet"
                                                    minDate={dayjs(sluttdato).add(1, 'day').toDate()}
                                                    validate={getDateValidator({ min: sluttdato })}
                                                />
                                            ) : null}

                                            {kursperiodeUtils.måBesvareBegrunnelseReisetidHjem(formik.values) && (
                                                <VStack gap={'2'}>
                                                    <FormPanel>
                                                        <Form.Textarea
                                                            name={KursperiodeFormFields.begrunnelseReisetidHjem}
                                                            label="Begrunnelse for reisetid fra kurssted"
                                                            description="På grunn av at det er mer enn én dag mellom sluttdato og hjemkomst, må du begrunne reisetiden fra kursstedet."
                                                            validate={getStringValidator({
                                                                minLength: 5,
                                                                required: true,
                                                            })}
                                                        />
                                                    </FormPanel>
                                                </VStack>
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
