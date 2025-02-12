import { useIntl } from 'react-intl';
import { getIntlFormErrorHandler, getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { getDateRangeValidator, ValidateDateError } from '@navikt/sif-common-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { handleDateRangeValidationError, mapFomTomToDateRange } from '../../utils';
import enkeltdatoUtils from './enkeltdatoUtils';
import { Enkeltdato, EnkeltdatoFormValues } from './types';
import { EnkeltdatoMessageKeys, useEnkeltdatoIntl } from './enkeltdatoMessages';
import { DateRange } from '@navikt/sif-common-utils';

export interface EnkeltdatoerFormLabels {
    enkeltdato: string;
    okButton: string;
    cancelButton: string;
}

interface Props {
    minDate: Date;
    maxDate: Date;
    enkeltdato?: Enkeltdato;
    alleEnkeltdatoer?: Enkeltdato[];
    disabledDateRanges?: DateRange[];
    formLabels?: Partial<EnkeltdatoerFormLabels>;
    onSubmit: (values: Enkeltdato) => void;
    onCancel: () => void;
}

enum EnkeltdatoFormFields {
    dato = 'dato',
}

export const EnkeltdatoFormErrors: Record<EnkeltdatoFormFields, { [key: string]: EnkeltdatoMessageKeys }> = {
    [EnkeltdatoFormFields.dato]: {
        [ValidateDateError.dateHasNoValue]: '@forms.enkeltdato.form.dato.dateHasNoValue',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.enkeltdato.form.dato.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: '@forms.enkeltdato.form.dato.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.enkeltdato.form.dato.dateIsAfterMax',
    },
};

const Form = getTypedFormComponents<EnkeltdatoFormFields, EnkeltdatoFormValues, ValidationError>();

const EnkeltdatoForm = ({
    enkeltdato,
    formLabels,
    minDate,
    maxDate,
    alleEnkeltdatoer = [],
    disabledDateRanges = [],
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();
    const { text } = useEnkeltdatoIntl();

    const onFormikSubmit = (formValues: EnkeltdatoFormValues) => {
        const enkeltdatoToSubmit = enkeltdatoUtils.mapFormValuesToEnkeltdato(formValues, enkeltdato?.id);
        if (enkeltdatoUtils.isValidEnkeltdato(enkeltdatoToSubmit)) {
            onSubmit(enkeltdatoToSubmit);
        } else {
            throw new Error('EnkeltdatoForm: Formvalues is not a valid Enkeltdato on submit.');
        }
    };

    const defaultLabels: EnkeltdatoerFormLabels = {
        enkeltdato: text('@forms.enkeltdato.form.dato.label'),
        okButton: text('@forms.enkeltdato.form.okButton'),
        cancelButton: text('@forms.enkeltdato.form.cancelButton'),
    };

    const inlineLabels: EnkeltdatoerFormLabels = { ...defaultLabels, ...formLabels };

    return (
        <>
            <Form.FormikWrapper
                initialValues={enkeltdatoUtils.mapEnkeltdatoToFormValues(enkeltdato || {})}
                onSubmit={onFormikSubmit}
                renderForm={(formik) => {
                    const disabledDates: DateRange[] =
                        enkeltdato === undefined
                            ? alleEnkeltdatoer.map((d) => mapFomTomToDateRange({ fom: d.dato, tom: d.dato }))
                            : alleEnkeltdatoer
                                  .filter((d) => d.id !== enkeltdato.id)
                                  .map((d) => mapFomTomToDateRange({ fom: d.dato, tom: d.dato }));

                    return (
                        <Form.Form
                            onCancel={onCancel}
                            formErrorHandler={getIntlFormErrorHandler(intl, '@forms.enkeltdato.form')}
                            submitButtonLabel="Ok"
                            showButtonArrows={false}>
                            <Form.DatePicker
                                label={inlineLabels.enkeltdato}
                                minDate={minDate}
                                maxDate={maxDate}
                                disabledDateRanges={[...disabledDates, ...disabledDateRanges]}
                                name={EnkeltdatoFormFields.dato}
                                validate={(value) => {
                                    const error = getDateRangeValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                        toDate: ISOStringToDate(formik.values.dato),
                                    }).validateFromDate(value);
                                    return handleDateRangeValidationError(error, minDate, maxDate);
                                }}
                                onChange={() => {
                                    setTimeout(() => {
                                        formik.validateField(EnkeltdatoFormFields.dato);
                                    });
                                }}
                            />
                        </Form.Form>
                    );
                }}
            />
        </>
    );
};

export default EnkeltdatoForm;
