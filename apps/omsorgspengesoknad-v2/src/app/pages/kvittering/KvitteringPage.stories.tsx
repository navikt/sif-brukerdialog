import type { Meta, StoryObj } from '@storybook/react-vite';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import { getDevAppSettings } from '../../../../mock/devAppSettings';
import { applicationIntlMessages } from '../../i18n';
import { KvitteringPage } from './KvitteringPage';

const meta: Meta<typeof KvitteringPage> = {
    title: 'Pages/KvitteringPage',
    component: KvitteringPage,
    decorators: [
        (Story) => {
            const existing = document.getElementById('nav:appSettings');
            if (!existing) {
                const script = document.createElement('script');
                script.type = 'text/json';
                script.id = 'nav:appSettings';
                script.textContent = JSON.stringify(getDevAppSettings());
                document.head.appendChild(script);
            }
            return (
                <IntlProvider locale="nb" messages={applicationIntlMessages.nb}>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </IntlProvider>
            );
        },
    ],
};

export default meta;

type Story = StoryObj<typeof KvitteringPage>;

export const Default: Story = {};
