import React from 'react';
import { IntlProvider } from 'react-intl';

import { sifSoknadUiMessages } from '../i18n';

export const StorybookDecorator = (Story: React.ComponentType) => {
    return (
        <IntlProvider locale="nb" messages={sifSoknadUiMessages.nb}>
            <Story />
        </IntlProvider>
    );
};
