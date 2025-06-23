import { Meta, StoryObj } from '@storybook/react-vite';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import LegeerklæringStep from './LegeerklæringStep';

const meta: Meta<typeof LegeerklæringStep> = {
    title: 'Step/Legeerklæring',
    component: LegeerklæringStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof LegeerklæringStep>;

export const Default: Story = {
    args: {},
};
