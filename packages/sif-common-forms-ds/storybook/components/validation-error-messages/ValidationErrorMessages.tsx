import * as React from 'react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { getValidationErrorMessages, MessageFileFormat } from '../devIntlUtils';

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
    return (
        <MessagesPreview
            // title="Feilmeldinger"
            messages={getValidationErrorMessages({ intlMessages, formName, validationErrors, validationErrorIntlKeys })}
            showExplanation={false}
            showMissingTextSummary={false}
        />
    );
};

export default FormValidationErrorMessages;
