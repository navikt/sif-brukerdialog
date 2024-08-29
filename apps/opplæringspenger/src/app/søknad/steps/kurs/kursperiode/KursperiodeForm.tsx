import { useIntl } from 'react-intl';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    ValidateDateError,
    ValidateDateRangeError,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
// import { handleDateRangeValidationError, mapFomTomToDateRange } from '../../utils';
import kursperiodeUtils from './kursperiodeUtils';
import { KursperiodeMessageKeys, useKursperiodeIntl } from './kursperiodeMessages';
import { handleDateRangeValidationError } from '@navikt/sif-common-forms-ds/src/utils';
import { Kursperiode } from '../../../../types/Kursperiode';
import { ISODate } from '@navikt/sif-common-utils';

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

enum KursperiodeFormFields {
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

export const KursperiodeFormErrors: Record<KursperiodeFormFields, { [key: string]: KursperiodeMessageKeys }> = {
    [KursperiodeFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: 'kursperiodeForm.fom.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'kursperiodeForm.fom.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: 'kursperiodeForm.fom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'kursperiodeForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'kursperiodeForm.fom.dateIsAfterMax',
    },
    [KursperiodeFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: 'kursperiodeForm.tom.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'kursperiodeForm.tom.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: 'kursperiodeForm.tom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'kursperiodeForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'kursperiodeForm.tom.dateIsAfterMax',
    },
    [KursperiodeFormFields.avreise]: {
        [ValidateDateError.dateHasNoValue]: 'kursperiodeForm.tom.dateHasNoValue',
    },
    [KursperiodeFormFields.hjemkomst]: {},
    [KursperiodeFormFields.begrunnelseReisetidHjem]: {},
    [KursperiodeFormFields.begrunnelseReisetidTil]: {},
};

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

                    return (
                        <Form.Form
                            onCancel={onCancel}
                            formErrorHandler={getFormErrorHandler(intl, 'kursperiodeForm')}
                            submitButtonLabel="Ok"
                            showButtonArrows={false}>
                            <Form.DateRangePicker
                                legend={inlineLabels.intervalTitle}
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
                        </Form.Form>
                    );
                }}
            />
        </>
    );
};

export default KursperiodeForm;
