import { Heading, Panel } from '@navikt/ds-react';
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import MessagesPreview from '@navikt/sif-common-core/lib/dev-utils/intl/messages-preview/MessagesPreview';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds/lib';
import { getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import flat from 'flat';
import { Fosterbarn } from '../../../src/forms/fosterbarn';
import FosterbarnForm, { FosterbarnFormErrors } from '../../../src/forms/fosterbarn/FosterbarnForm';
import FosterbarnListAndDialog from '../../../src/forms/fosterbarn/FosterbarnListAndDialog';
import fosterbarnMessages from '../../../src/forms/fosterbarn/fosterbarnMessages';
import SubmitPreview from '../../components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';

enum FormField {
    'fosterbarn' = 'fosterbarn',
}

interface FormValues {
    [FormField.fosterbarn]: Fosterbarn[];
}
const initialValues: FormValues = { fosterbarn: [] };

const FosterbarnExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<Fosterbarn> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();
    return (
        <>
            <Box padBottom="l">
                <Heading level="2" size="small">
                    Liste og dialog
                </Heading>
            </Box>
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
                                <FosterbarnListAndDialog<FormField>
                                    name={FormField.fosterbarn}
                                    validate={getListValidator({ required: true })}
                                />
                            </TypedFormikForm>
                        );
                    }}
                />
                <SubmitPreview values={listFormValues} />
            </Panel>

            <Box margin="xxl" padBottom="l">
                <FormValidationErrorMessages
                    validationErrorIntlKeys={flat(FosterbarnFormErrors)}
                    intlMessages={fosterbarnMessages}
                />
            </Box>

            <Box margin="xxl" padBottom="l">
                <Heading level="2" size="small">
                    Kun dialog
                </Heading>
            </Box>

            <Panel border={true}>
                <FosterbarnForm
                    fosterbarn={{}}
                    onSubmit={setSingleFormValues}
                    onCancel={() => console.log('cancel me')}
                />
            </Panel>
            <SubmitPreview values={singleFormValues} />

            <MessagesPreview messages={fosterbarnMessages} showExplanation={false} />
        </>
    );
};

export default FosterbarnExample;
