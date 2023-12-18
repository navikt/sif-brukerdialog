import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { prettifyDate } from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
    ValidateDateError,
    ValidateFødselsnummerError,
    ValidateRequiredFieldError,
    ValidateStringError,
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import annetBarnUtils from './annetBarnUtils';
import { AnnetBarn, AnnetBarnFormValues, BarnType } from './types';

export interface AnnetBarnFormLabels {
    title: string;
    fnr: string;
    placeholderFnr?: string;
    fødselsdato: string;
    navn: string;
    placeholderNavn?: string;
    okButton: string;
    cancelButton: string;
    aldersGrenseText?: string;
    visBarnTypeValg?: string;
}

enum AnnetBarnFormFields {
    fnr = 'fnr',
    fødselsdato = 'fødselsdato',
    navn = 'navn',
    type = 'type',
}

export const AnnetBarnFormErrors = {
    [AnnetBarnFormFields.navn]: { [ValidateStringError.stringHasNoValue]: 'annetBarnForm.navn.stringHasNoValue' },
    [AnnetBarnFormFields.fødselsdato]: {
        [ValidateDateError.dateHasNoValue]: 'annetBarnForm.fødselsdato.dateHasNoValue',
        [ValidateDateError.dateIsBeforeMin]: 'annetBarnForm.fødselsdato.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'annetBarnForm.fødselsdato.dateIsAfterMax',
        [ValidateDateError.dateHasInvalidFormat]: 'annetBarnForm.fødselsdato.dateHasInvalidFormat',
    },
    [AnnetBarnFormFields.fnr]: {
        [ValidateFødselsnummerError.fødselsnummerHasNoValue]: 'annetBarnForm.fnr.fødselsnummerHasNoValue',
        [ValidateFødselsnummerError.fødselsnummerIsInvalid]: 'annetBarnForm.fnr.fødselsnummerIsInvalid',
        [ValidateFødselsnummerError.fødselsnummerIsNot11Chars]: 'annetBarnForm.fnr.fødselsnummerIsNot11Chars',
        [ValidateFødselsnummerError.fødselsnummerIsNotAllowed]: 'annetBarnForm.fnr.fødselsnummerIsNotAllowed',
    },
    [AnnetBarnFormFields.type]: {
        [ValidateRequiredFieldError.noValue]: 'annetBarnForm.type.noValue',
    },
};

interface Props {
    annetBarn?: Partial<AnnetBarn>;
    labels?: Partial<AnnetBarnFormLabels>;
    minDate: Date;
    maxDate: Date;
    disallowedFødselsnumre?: string[];
    visBarnTypeValg?: boolean;
    onSubmit: (values: AnnetBarn) => void;
    onCancel: () => void;
}

const Form = getTypedFormComponents<AnnetBarnFormFields, AnnetBarnFormValues, ValidationError>();

const AnnetBarnForm = ({
    annetBarn = { fnr: '', navn: '', fødselsdato: undefined, id: undefined, type: undefined },
    labels,
    minDate,
    maxDate,
    disallowedFødselsnumre,
    visBarnTypeValg,
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();

    const onFormikSubmit = (formValues: AnnetBarnFormValues) => {
        const annetBarnToSubmit = annetBarnUtils.mapFormValuesToPartialAnnetBarn(formValues, annetBarn.id);
        if (annetBarnUtils.isAnnetBarn(annetBarnToSubmit)) {
            onSubmit(annetBarnToSubmit);
        } else {
            throw new Error('AnnetBarnForm: Formvalues is not a valid AnnetBarn on submit.');
        }
    };

    const defaultLabels: AnnetBarnFormLabels = {
        title: intlHelper(intl, 'annetBarn.form.title'),
        fnr: intlHelper(intl, 'annetBarn.form.fnr'),
        fødselsdato: intlHelper(intl, 'annetBarn.form.fødselsdato'),
        navn: intlHelper(intl, 'annetBarn.form.navn'),
        okButton: intlHelper(intl, 'annetBarn.form.okButton'),
        cancelButton: intlHelper(intl, 'annetBarn.form.cancelButton'),
    };

    const formLabels: AnnetBarnFormLabels = { ...defaultLabels, ...labels };

    return (
        <Form.FormikWrapper
            initialValues={annetBarnUtils.mapAnnetBarnToFormValues(annetBarn)}
            onSubmit={onFormikSubmit}
            renderForm={() => (
                <Form.Form
                    onCancel={onCancel}
                    formErrorHandler={getFormErrorHandler(intl, 'annetBarnForm')}
                    submitButtonLabel="Ok"
                    showButtonArrows={false}>
                    <Form.TextField
                        name={AnnetBarnFormFields.navn}
                        label={formLabels.navn}
                        validate={getStringValidator({ required: true })}
                        placeholder={formLabels.placeholderNavn}
                    />
                    <FormBlock>
                        <Form.DatePicker
                            name={AnnetBarnFormFields.fødselsdato}
                            label={
                                formLabels.aldersGrenseText
                                    ? `${formLabels.fødselsdato} ${formLabels.aldersGrenseText}`
                                    : `${formLabels.fødselsdato}`
                            }
                            validate={(value) => {
                                const dateError = getDateValidator({ required: true, min: minDate, max: maxDate })(
                                    value,
                                );
                                if (dateError === ValidateDateError.dateIsBeforeMin) {
                                    return {
                                        key: dateError,
                                        values: { dato: prettifyDate(minDate) },
                                    };
                                }
                                return dateError;
                            }}
                            maxDate={maxDate}
                            minDate={minDate}
                            dropdownCaption={true}
                        />
                    </FormBlock>

                    <FormBlock>
                        <Form.TextField
                            name={AnnetBarnFormFields.fnr}
                            label={formLabels.fnr}
                            validate={getFødselsnummerValidator({
                                required: true,
                                disallowedValues: disallowedFødselsnumre,
                            })}
                            inputMode="numeric"
                            maxLength={11}
                            placeholder={formLabels.placeholderFnr}
                        />
                    </FormBlock>
                    {visBarnTypeValg && (
                        <FormBlock>
                            <Form.RadioGroup
                                name={AnnetBarnFormFields.type}
                                legend={intlHelper(intl, 'annetBarn.form.årsak.spm')}
                                radios={[
                                    {
                                        label: intlHelper(intl, 'annetBarn.form.årsak.FOSTERBARN'),
                                        value: BarnType.fosterbarn,
                                    },
                                    {
                                        label: intlHelper(intl, 'annetBarn.form.årsak.ANNET'),
                                        value: BarnType.annet,
                                    },
                                ]}
                                validate={getRequiredFieldValidator()}
                            />
                        </FormBlock>
                    )}
                </Form.Form>
            )}
        />
    );
};

export default AnnetBarnForm;
