import { Box } from '@navikt/ds-react';
import * as React from 'react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { useAppIntl } from '../../app/i18n';
import '@navikt/ds-css';

interface Props {
    parameters?: {
        formik?: any;
        includeButtons?: boolean;
        maxWidth?: string;
        formErrorHandlerIntlKey: string;
    };
    children: React.ReactNode;
    useBorder?: boolean;
}

export const StoryFormikWrapper: React.FunctionComponent<Props> = (props) => {
    const { intl } = useAppIntl();
    const { children, parameters, useBorder } = props;
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
                        <Box
                            {...(useBorder
                                ? {
                                      maxWidth,
                                      borderColor: 'border-info',
                                      borderRadius: 'medium',
                                      borderWidth: '1',
                                  }
                                : {})}>
                            {children}
                        </Box>
                    </TypedFormikForm>
                );
            }}
        />
    );
};
