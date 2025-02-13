import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { isDevMode } from '@navikt/sif-common-env';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import {
    getFødselsnummerValidator,
    getStringValidator,
    ValidateFødselsnummerError,
    ValidateStringError,
} from '@navikt/sif-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { FosterbarnMessageKeys, useFosterbarnIntl } from './fosterbarnMessages';
import { Fosterbarn, isFosterbarn } from './types';

interface FosterbarnFormText {
    form_fødselsnummer_label: string;
    form_navn_label: string;
}

interface Props {
    fosterbarn?: Partial<Fosterbarn>;
    onSubmit: (values: Fosterbarn) => void;
    onCancel: () => void;
    disallowedFødselsnumre?: string[];
    text?: FosterbarnFormText;
}

enum FosterbarnFormField {
    fødselsnummer = 'fødselsnummer',
    navn = 'navn',
}

type FormValues = Partial<Fosterbarn>;

export const FosterbarnFormErrors: Record<FosterbarnFormField, { [key: string]: FosterbarnMessageKeys }> = {
    [FosterbarnFormField.navn]: {
        [ValidateStringError.stringHasNoValue]: '@forms.fosterbarnForm.navn.stringHasNoValue',
    },
    [FosterbarnFormField.fødselsnummer]: {
        [ValidateStringError.stringHasNoValue]: '@forms.fosterbarnForm.fødselsnummer.fødselsnummerHasNoValue',
        [ValidateFødselsnummerError.fødselsnummerIsNotAllowed]:
            '@forms.fosterbarnForm.fødselsnummer.fødselsnummerIsNotAllowed',
        [ValidateFødselsnummerError.fødselsnummerIsNot11Chars]:
            '@forms.fosterbarnForm.fødselsnummer.fødselsnummerIsNot11Chars',
        [ValidateFødselsnummerError.fødselsnummerIsInvalid]:
            '@forms.fosterbarnForm.fødselsnummer.fødselsnummerIsInvalid',
    },
};

const Form = getTypedFormComponents<FosterbarnFormField, FormValues, ValidationError>();

const FosterbarnForm = ({
    fosterbarn: initialValues = { navn: '', fødselsnummer: '' },
    disallowedFødselsnumre,
    text,
    onSubmit,
    onCancel,
}: Props) => {
    const { text: typedText } = useFosterbarnIntl();
    const intl = useIntl();

    const onFormikSubmit = (formValues: FormValues) => {
        if (isFosterbarn(formValues)) {
            onSubmit({ ...formValues, id: initialValues.id || guid() });
        } else {
            throw new Error('Fosterbarn skjema: Formvalues is not a valid Fosterbarn on submit.');
        }
    };

    const defaultText: FosterbarnFormText = {
        form_navn_label: typedText('@forms.fosterbarn.form.navn_label'),
        form_fødselsnummer_label: typedText('@forms.fosterbarn.form.fødselsnummer_label'),
    };

    const txt = { ...defaultText, ...text };

    return (
        <>
            <Form.FormikWrapper
                initialValues={initialValues}
                onSubmit={onFormikSubmit}
                renderForm={() => (
                    <Form.Form
                        onCancel={onCancel}
                        formErrorHandler={getIntlFormErrorHandler(intl, '@forms.fosterbarnForm')}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}>
                        <Form.TextField
                            name={FosterbarnFormField.navn}
                            label={txt.form_navn_label}
                            validate={getStringValidator({ required: true })}
                        />

                        <FormBlock>
                            <Form.TextField
                                name={FosterbarnFormField.fødselsnummer}
                                label={txt.form_fødselsnummer_label}
                                validate={getFødselsnummerValidator({
                                    required: true,
                                    allowHnr: isDevMode(),
                                    disallowedValues: disallowedFødselsnumre?.filter(
                                        (f) => f !== initialValues.fødselsnummer,
                                    ),
                                })}
                                inputMode="numeric"
                                maxLength={11}
                            />
                        </FormBlock>
                    </Form.Form>
                )}
            />
        </>
    );
};

export default FosterbarnForm;
