import { Panel } from '@navikt/ds-react';
import React from 'react';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds/lib';
import '@navikt/ds-css';

interface Props {
    parameters?: {
        formik?: any;
        includeButtons?: boolean;
        maxWidth?: string;
    };
    children: React.ReactNode;
}

export const StoryFormikWrapper: React.FunctionComponent<Props> = (props) => {
    const { children, parameters } = props;
    const { formik, maxWidth = '800px', includeButtons = true } = parameters || {};
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
                    <TypedFormikForm includeButtons={includeButtons}>
                        <Panel style={{ maxWidth: maxWidth }} border={true}>
                            {children}
                        </Panel>
                    </TypedFormikForm>
                );
            }}
        />
    );
};
