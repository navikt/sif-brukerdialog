import '@navikt/ds-css';

import { Panel } from '@navikt/ds-react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import * as React from 'react';

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
    const { formik, maxWidth = '800px' } = parameters || {};
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
                    <Panel style={{ maxWidth: maxWidth }} border={false}>
                        {children}
                    </Panel>
                );
            }}
        />
    );
};
