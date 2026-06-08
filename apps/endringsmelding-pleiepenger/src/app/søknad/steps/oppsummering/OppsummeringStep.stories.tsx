import { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import OppsummeringStep from './OppsummeringStep';

const meta: Meta<typeof OppsummeringStep> = {
    title: 'Step/Oppsummering',
    component: OppsummeringStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAnalyticsProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof OppsummeringStep>;

export const Default: Story = {
    args: {},
};
