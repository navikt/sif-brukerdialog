import React from 'react';
import { IntlProvider } from 'react-intl';

import { ungUi_messages_nb } from '../i18n/nb';

const allMessages: Record<string, string> = {
    ...ungUi_messages_nb,
};

export const IntlDecorator = (Story: React.ComponentType) => {
    return (
        <IntlProvider locale="nb" messages={allMessages}>
            <Story />
        </IntlProvider>
    );
};
