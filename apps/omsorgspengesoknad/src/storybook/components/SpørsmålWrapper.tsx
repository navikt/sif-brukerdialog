import * as React from 'react';
import '@navikt/ds-css';
import { StoryFormikWrapper } from './StoryFormikWrapper';
import StoryIntlProvider from './StoryIntlProvider';

interface Props {
    parameters: {
        formErrorHandlerIntlKey: string;
    };
    children: React.ReactNode;
}

export const SpørsmålWrapper: React.FunctionComponent<Props> = (props) => {
    const { children, parameters } = props;
    const { formErrorHandlerIntlKey = 'formIntlKey' } = parameters || {};

    return (
        <StoryIntlProvider locale="nb">
            <StoryFormikWrapper parameters={{ formErrorHandlerIntlKey, maxWidth: 'none', includeButtons: false }}>
                {children}
            </StoryFormikWrapper>
        </StoryIntlProvider>
    );
};
