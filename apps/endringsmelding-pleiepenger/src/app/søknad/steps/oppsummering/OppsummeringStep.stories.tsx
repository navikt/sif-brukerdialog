import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import OppsummeringStep from './OppsummeringStep';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitudeProvider';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';

const meta: Meta<typeof OppsummeringStep> = {
    title: 'Step/Oppsummering',
    component: OppsummeringStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof OppsummeringStep>;

export const Default: Story = {
    args: {},
};
