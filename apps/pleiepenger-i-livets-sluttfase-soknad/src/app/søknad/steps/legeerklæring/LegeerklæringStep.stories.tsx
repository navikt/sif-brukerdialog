import { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import LegeerklæringStep from './LegeerklæringStep';

const meta: Meta<typeof LegeerklæringStep> = {
    title: 'Steps/Legeerklæring',
    component: LegeerklæringStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAnalyticsProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof LegeerklæringStep>;

export const Default: Story = {
    args: {},
};
