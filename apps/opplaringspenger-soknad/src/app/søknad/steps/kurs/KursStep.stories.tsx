import { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import KursStep from './KursStep';

const meta: Meta<typeof KursStep> = {
    title: 'Step/Kurs',
    component: KursStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof KursStep>;

export const Default: Story = {
    args: {},
};
