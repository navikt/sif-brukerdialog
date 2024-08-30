import { useIntl } from 'react-intl';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getDateValidator,
    getStringValidator,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import kursperiodeUtils from './kursperiodeUtils';
import { useKursperiodeIntl } from './kursperiodeMessages';
import { handleDateRangeValidationError } from '@navikt/sif-common-forms-ds/src/utils';
import { Kursperiode } from '../../../../types/Kursperiode';
import { ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { HStack, VStack } from '@navikt/ds-react';
import { FormPanel } from '@navikt/sif-common-ui';

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
    avreise = 'avreise',
    hjemkomst = 'hjemkomst',
    begrunnelseReisetidTil = 'begrunnelseReisetidTil',
    begrunnelseReisetidHjem = 'begrunnelseReisetidHjem',
}

export interface KursperiodeFormValues {
    [KursperiodeFormFields.fom]: ISODate;
    [KursperiodeFormFields.tom]: ISODate;
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

                    const startdato = ISODateToDate(formik.values[KursperiodeFormFields.fom] || '');
                    const sluttdato = ISODateToDate(formik.values[KursperiodeFormFields.tom] || '');

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

                                <Form.InputGroup legend="Reisetid" name={'as' as any}>
                                    <p>
                                        Hvis du reiser til eller hjem en annen dag enn kursperioden, må du oppgi dette
                                        her.
                                    </p>
                                    <HStack gap={'4'}>
                                        <Form.DatePicker
                                            name={KursperiodeFormFields.avreise}
                                            label="Avreisedato"
                                            maxDate={startdato}
                                            validate={getDateValidator({ max: startdato })}
                                        />
                                        <Form.DatePicker
                                            name={KursperiodeFormFields.hjemkomst}
                                            label="Hjemkomst"
                                            minDate={sluttdato}
                                            validate={getDateValidator({ min: sluttdato })}
                                        />
                                    </HStack>
                                </Form.InputGroup>

                                {kursperiodeUtils.måBesvareBegrunnelseReisetidHjem(formik.values) && (
                                    <VStack gap={'2'}>
                                        <FormPanel>
                                            <Form.Textarea
                                                name={KursperiodeFormFields.begrunnelseReisetidTil}
                                                label="Begrunnelse for reisetid til kurssted"
                                                description="På grunn av at det er mer enn én dag mellom avreise og startdato, må du begrunne reisetiden til kursstedet."
                                                validate={getStringValidator({ minLength: 5, required: true })}
                                            />
                                        </FormPanel>
                                    </VStack>
                                )}
                                {kursperiodeUtils.måBesvareBegrunnelsebegrunnelseReisetidTil(formik.values) && (
                                    <VStack gap={'2'}>
                                        <FormPanel>
                                            <Form.Textarea
                                                name={KursperiodeFormFields.begrunnelseReisetidHjem}
                                                label="Begrunnelse for reisetid fra kurssted"
                                                description="På grunn av at det er mer enn én dag mellom sluttdato og hjemkomst, må du begrunne reisetiden fra kursstedet."
                                                validate={getStringValidator({ minLength: 5, required: true })}
                                            />
                                        </FormPanel>
                                    </VStack>
                                )}
                            </VStack>
                        </Form.Form>
                    );
                }}
            />
        </>
    );
};

export default KursperiodeForm;
