import { Meta, StoryObj } from '@storybook/react-vite';
import { withAnalyticsProvider } from '../../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import KursStep from './KursStep';

const meta: Meta<typeof KursStep> = {
    title: 'Step/Kurs',
    component: KursStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAnalyticsProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof KursStep>;

export const Default: Story = {
    args: {},
};
