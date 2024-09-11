import { Panel } from '@navikt/ds-react';
import * as React from 'react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import '@navikt/ds-css';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useAppIntl } from '../../app/i18n';

interface Props {
    parameters?: {
        formik?: any;
        includeButtons?: boolean;
        maxWidth?: string;
        formErrorHandlerIntlKey: string;
    };
    children: React.ReactNode;
}

export const StoryFormikWrapper: React.FunctionComponent<Props> = (props) => {
    const { intl } = useAppIntl();
    const { children, parameters } = props;
    const {
        formik,
        maxWidth = '800px',
        includeButtons = true,
        formErrorHandlerIntlKey = 'formIntlKey',
    } = parameters || {};
    const initialValues = formik?.initialValues || {};

    return (
        <TypedFormikWrapper
            initialValues={initialValues}
            onSubmit={(values) => {
                // eslint-disable-next-line no-console
                console.log('StoryFormikProvider', values);
            }}
            renderForm={() => {
                return (
                    <TypedFormikForm
                        includeButtons={includeButtons}
                        onValidSubmit={() => null}
                        includeValidationSummary={true}
                        formErrorHandler={getIntlFormErrorHandler(intl, formErrorHandlerIntlKey)}
                        runDelayedFormValidation={true}>
                        <Panel style={{ maxWidth: maxWidth }} border={true}>
                            {children}
                        </Panel>
                    </TypedFormikForm>
                );
            }}
        />
    );
};
