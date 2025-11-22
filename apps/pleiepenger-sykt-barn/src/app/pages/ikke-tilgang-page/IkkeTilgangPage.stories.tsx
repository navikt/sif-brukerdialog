import type { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import IkkeTilgangPage from './IkkeTilgangPage';

const meta: Meta<typeof IkkeTilgangPage> = {
    title: 'Pages/IkkeTilgangPage',
    component: IkkeTilgangPage,
    decorators: [withAnalyticsProvider, withIntl],
};
export default meta;

type Story = StoryObj<typeof IkkeTilgangPage>;

export const Default: Story = {};
