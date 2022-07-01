import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import getFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Systemtittel } from 'nav-frontend-typografi';
import { AndreBarn } from './types';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import barnUtils from './barnUtils';
import { guid } from 'nav-frontend-js-utils';
import { getFødselsnummerValidator, getStringValidator } from '@navikt/sif-common-formik/lib/validation';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';

interface BarnFormLabels {
    title: string;
    fnr: string;
    placeholderFnr?: string;
    navn: string;
    placeholderNavn?: string;
    okButton: string;
    cancelButton: string;
}
enum BarnFormFields {
    fnr = 'fnr',
    navn = 'navn',
}

interface Props {
    barn?: Partial<AndreBarn>;
    labels?: Partial<BarnFormLabels>;
    selectDescription?: string;
    disallowedFødselsnumre?: string[];
    onSubmit: (values: AndreBarn) => void;
    onCancel: () => void;
}

type BarnFormValues = Partial<AndreBarn>;

const Form = getTypedFormComponents<BarnFormFields, BarnFormValues, ValidationError>();

const BarnForm = ({
    barn = { id: undefined, fnr: '', navn: '' },
    labels,
    disallowedFødselsnumre,
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();

    const onFormikSubmit = (formValues: BarnFormValues) => {
        if (barnUtils.isBarn(formValues)) {
            onSubmit({ ...formValues, id: barn.id || guid() });
        } else {
            throw new Error('BarnForm: Formvalues is not a valid AnnetBarn on submit.');
        }
    };

    const defaultLabels: BarnFormLabels = {
        title: intlHelper(intl, 'barn.form.title'),
        fnr: intlHelper(intl, 'barn.form.fnr'),
        navn: intlHelper(intl, 'barn.form.navn'),
        okButton: intlHelper(intl, 'barn.form.okButton'),
        cancelButton: intlHelper(intl, 'barn.form.cancelButton'),
    };

    const formLabels: BarnFormLabels = { ...defaultLabels, ...labels };

    return (
        <>
            <Form.FormikWrapper
                initialValues={barnUtils.mapBarnToFormValues(barn)}
                onSubmit={onFormikSubmit}
                renderForm={() => (
                    <Form.Form onCancel={onCancel} formErrorHandler={getFormErrorHandler(intl, 'annetBarnForm')}>
                        <Systemtittel tag="h1">{formLabels.title}</Systemtittel>
                        <FormBlock>
                            <Form.Input
                                name={BarnFormFields.navn}
                                label={formLabels.navn}
                                validate={(value) => {
                                    const error = getStringValidator({ required: true, minLength: 2, maxLength: 50 })(
                                        value
                                    );
                                    return error
                                        ? {
                                              key: error,
                                              values: {
                                                  min: 2,
                                                  maks: 50,
                                              },
                                          }
                                        : undefined;
                                }}
                                placeholder={formLabels.placeholderNavn}
                            />
                        </FormBlock>

                        <FormBlock>
                            <Form.Input
                                name={BarnFormFields.fnr}
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
                    </Form.Form>
                )}
            />
        </>
    );
};

export default BarnForm;
