import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../storybook/decorators/withIntl';
import NoAccessPage from './NoAccessPage';

const meta: Meta<typeof NoAccessPage> = {
    title: 'Pages/NoAccessPage',
    component: NoAccessPage,
    decorators: [withIntl],
};
export default meta;

type Story = StoryObj<typeof NoAccessPage>;

export const Default: Story = {
    args: {
        papirskjemaUrl: 'https://www.nav.no/',
    },
};
