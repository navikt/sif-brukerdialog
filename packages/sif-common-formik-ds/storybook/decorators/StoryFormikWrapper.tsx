import { Panel } from '@navikt/ds-react';
import * as React from 'react';
import TypedFormikForm from '../../src/components/typed-formik-form/TypedFormikForm';
import TypedFormikWrapper from '../../src/components/typed-formik-wrapper/TypedFormikWrapper';
import '@navikt/ds-css';
import { IntlProvider } from 'react-intl';

interface Props {
    parameters?: {
        formik?: any;
        includeButtons?: boolean;
        maxWidth?: string;
    };
    children: React.ReactNode;
}

export const withFormikWrapper = (Story, args) => (
    <IntlProvider locale="nb" messages={{}}>
        <StoryFormikWrapper {...args}>
            <Story />
        </StoryFormikWrapper>
    </IntlProvider>
);

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
                console.log('renderForm');
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
