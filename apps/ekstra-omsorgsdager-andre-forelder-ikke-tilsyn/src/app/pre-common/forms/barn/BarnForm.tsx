import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { AndreBarn } from './types';
import barnUtils from './barnUtils';
import { getFødselsnummerValidator, getStringValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { useAppIntl } from '../../../i18n';
import { isDevMode } from '@navikt/sif-common-core-ds/src/utils/envUtils';

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
    const { text, intl } = useAppIntl();

    const onFormikSubmit = (formValues: BarnFormValues) => {
        if (barnUtils.isBarn(formValues)) {
            onSubmit({ ...formValues, id: barn.id || guid() });
        } else {
            throw new Error('BarnForm: Formvalues is not a valid AnnetBarn on submit.');
        }
    };

    const defaultLabels: BarnFormLabels = {
        title: text('barn.form.title'),
        fnr: text('barn.form.fnr'),
        navn: text('barn.form.navn'),
        okButton: text('barn.form.okButton'),
        cancelButton: text('barn.form.cancelButton'),
    };

    const formLabels: BarnFormLabels = { ...defaultLabels, ...labels };

    return (
        <>
            <Form.FormikWrapper
                initialValues={barnUtils.mapBarnToFormValues(barn)}
                onSubmit={onFormikSubmit}
                renderForm={() => (
                    <Form.Form onCancel={onCancel} formErrorHandler={getFormErrorHandler(intl, 'annetBarnForm')}>
                        <FormBlock>
                            <Form.TextField
                                name={BarnFormFields.navn}
                                label={formLabels.navn}
                                validate={(value) => {
                                    const error = getStringValidator({ required: true, minLength: 2, maxLength: 50 })(
                                        value,
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
                            <Form.TextField
                                name={BarnFormFields.fnr}
                                label={formLabels.fnr}
                                validate={getFødselsnummerValidator({
                                    required: true,
                                    allowHnr: isDevMode,
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
