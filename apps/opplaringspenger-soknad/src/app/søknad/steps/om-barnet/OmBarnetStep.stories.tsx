import { Meta, StoryObj } from '@storybook/react-vite';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import OmBarnetStep from './OmBarnetStep';

const meta: Meta<typeof OmBarnetStep> = {
    title: 'Step/Om barnet',
    component: OmBarnetStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof OmBarnetStep>;

export const Default: Story = {
    args: {},
};
