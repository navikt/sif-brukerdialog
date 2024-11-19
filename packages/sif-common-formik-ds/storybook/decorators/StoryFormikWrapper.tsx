import { Panel } from '@navikt/ds-react';
import * as React from 'react';
import TypedFormikForm from '../../src/components/typed-formik-form/TypedFormikForm';
import TypedFormikWrapper from '../../src/components/typed-formik-wrapper/TypedFormikWrapper';
import '@navikt/ds-css';

interface Props {
    parameters?: {
        formik?: any;
        includeButtons?: boolean;
        maxWidth?: string;
    };
    children: React.ReactNode;
}

export const withFormikWrapper = (Story, args) => (
    <StoryFormikWrapper {...args}>
        <Story />
    </StoryFormikWrapper>
);

export const StoryFormikWrapper: React.FunctionComponent<Props> = (props) => {
    const { children, parameters } = props;
    const { formik, maxWidth = '800px', includeButtons = true } = parameters || {};
    const initialValues = formik?.initialValues || {};

    return (
        <TypedFormikWrapper
            initialValues={initialValues}
            onSubmit={() => {
                // eslint-disable-next-line no-console
            }}
            renderForm={({ values }) => {
                return (
                    <TypedFormikForm
                        includeButtons={includeButtons}
                        onValidSubmit={() => {
                            console.log('Valid submit');
                        }}>
                        <Panel style={{ maxWidth: maxWidth }} border={true}>
                            {children}
                        </Panel>
                    </TypedFormikForm>
                );
            }}
        />
    );
};
