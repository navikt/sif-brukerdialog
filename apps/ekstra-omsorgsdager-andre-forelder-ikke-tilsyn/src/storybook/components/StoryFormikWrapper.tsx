import { Box } from '@navikt/ds-react';
import * as React from 'react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import StoryIntlProvider from './StoryIntlProvider';

interface Props {
    parameters?: {
        formik?: any;
        includeButtons?: boolean;
        maxWidth?: string;
    };
    children: React.ReactNode;
}

export const StoryFormikWrapper = (props: Props) => {
    const { children, parameters } = props;
    const { formik, maxWidth = '800px', includeButtons = false } = parameters || {};
    const initialValues = formik?.initialValues || {};

    return (
        <StoryIntlProvider locale="nb">
            <TypedFormikWrapper
                initialValues={initialValues}
                onSubmit={(values) => {
                    // eslint-disable-next-line no-console
                    console.log('StoryFormikProvider', values);
                }}
                renderForm={() => {
                    return (
                        <TypedFormikForm includeButtons={includeButtons}>
                            <Box.New style={{ maxWidth: maxWidth }} borderColor="neutral" borderWidth="1">
                                {children}
                            </Box.New>
                        </TypedFormikForm>
                    );
                }}
            />
        </StoryIntlProvider>
    );
};
