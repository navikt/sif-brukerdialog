import * as React from 'react';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import MessagesPreview from '../../components/messages-preview/MessagesPreview';
import { MessageFileFormat } from '../devIntlUtils';

const createFieldErrorIntlKey = (error: ValidationError, fieldName: string, errorPrefix?: string): string =>
    `${errorPrefix ? `${errorPrefix}.` : ''}${fieldName}.${error}`;

export type ValidationErrorMessagesDocType = {
    fields: { [key: string]: string[] };
};

interface Props {
    formName?: string;
    validationErrors?: ValidationErrorMessagesDocType;
    validationErrorIntlKeys?: { [key: string]: string };
    intlMessages: MessageFileFormat;
}

const FormValidationErrorMessages: React.FunctionComponent<Props> = ({
    validationErrors,
    formName,
    intlMessages,
    validationErrorIntlKeys,
}) => {
    const validationeMessages: MessageFileFormat = {
        nb: {},
        nn: {},
    };

    if (validationErrors) {
        const fields = validationErrors.fields;

        Object.keys(fields).forEach((field) =>
            Object.keys(fields[field]).forEach((errorKey) => {
                const error = fields[field][errorKey];
                const intlKey = createFieldErrorIntlKey(error, field, formName);
                validationeMessages['nb'][intlKey] = intlMessages['nb'][intlKey];
                validationeMessages['nn'][intlKey] = intlMessages['nn'][intlKey];
            }),
        );
    }

    if (validationErrorIntlKeys) {
        Object.keys(validationErrorIntlKeys).forEach((key) => {
            const intlKey = validationErrorIntlKeys[key];
            validationeMessages['nb'][intlKey] = intlMessages['nb'][intlKey];
            validationeMessages['nn'][intlKey] = intlMessages['nn'][intlKey];
        });
    }
    return (
        <MessagesPreview
            title="Feilmeldinger"
            messages={validationeMessages}
            showExplanation={false}
            showMissingTextSummary={false}
        />
    );
};

export default FormValidationErrorMessages;
