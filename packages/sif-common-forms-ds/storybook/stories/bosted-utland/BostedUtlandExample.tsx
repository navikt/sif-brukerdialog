import * as React from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '../../components/messages-preview/MessagesPreview';
import { date1YearAgo, date1YearFromNow } from '@navikt/sif-common-utils';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { flatten } from 'flat';
import BostedUtlandForm, { BostedUtlandFormErrors } from '../../../src/forms/bosted-utland/BostedUtlandForm';
import BostedUtlandListAndDialog from '../../../src/forms/bosted-utland/BostedUtlandListAndDialog';
import bostedUtlandMessages from '../../../src/forms/bosted-utland/bostedUtlandMessages';
import { BostedUtland } from '../../../src/forms/bosted-utland/types';
import SubmitPreview from '../../components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';
import { Heading, Panel } from '@navikt/ds-react';

enum FormField {
    'bosted' = 'bosted',
}

interface FormValues {
    [FormField.bosted]: BostedUtland[];
}
const initialValues: FormValues = { bosted: [] };

const FormikExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<BostedUtland> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();
    return (
        <>
            <Block padBottom="l">
                <Heading level="2" size="small">
                    Liste og dialog
                </Heading>
            </Block>
            <Panel border={true}>
                <TypedFormikWrapper<FormValues>
                    initialValues={initialValues}
                    onSubmit={setListFormValues}
                    renderForm={() => {
                        return (
                            <TypedFormikForm<FormValues, ValidationError>
                                includeButtons={true}
                                submitButtonLabel="Valider skjema"
                                formErrorHandler={getFormErrorHandler(intl)}>
                                <BostedUtlandListAndDialog<FormField>
                                    name={FormField.bosted}
                                    minDate={date1YearAgo}
                                    maxDate={date1YearFromNow}
                                    validate={getListValidator({ required: true })}
                                    labels={{
                                        addLabel: 'Legg til utenlandsopphold',
                                        listTitle: 'Registrerte utenlandsopphold',
                                        modalTitle: 'Utenlandsopphold',
                                        emptyListText: 'Ingen utenlandsopphold er lagt til',
                                    }}
                                />
                            </TypedFormikForm>
                        );
                    }}
                />
                <SubmitPreview values={listFormValues} />
            </Panel>

            <Block margin="xxl" padBottom="l">
                <FormValidationErrorMessages
                    validationErrorIntlKeys={flatten(BostedUtlandFormErrors)}
                    intlMessages={bostedUtlandMessages}
                />
            </Block>

            <Block margin="xxl" padBottom="l">
                <Heading level="2" size="small">
                    Kun dialog
                </Heading>
            </Block>

            <Block margin="xxl" padBottom="l">
                <Panel border={true}>
                    <BostedUtlandForm
                        minDate={date1YearAgo}
                        maxDate={date1YearFromNow}
                        onSubmit={setSingleFormValues}
                        onCancel={() => null}
                    />
                </Panel>
                <SubmitPreview values={singleFormValues} />
            </Block>

            <MessagesPreview title="Alle tekster" messages={bostedUtlandMessages} showExplanation={false} />
        </>
    );
};

export default FormikExample;
