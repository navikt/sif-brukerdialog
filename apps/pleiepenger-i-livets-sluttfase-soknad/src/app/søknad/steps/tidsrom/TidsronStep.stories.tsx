import { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import TidsromStep from './TidsromStep';

const meta: Meta<typeof TidsromStep> = {
    title: 'Steps/Tidsrom',
    component: TidsromStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAnalyticsProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof TidsromStep>;

export const Default: Story = {
    args: {},
};
