import { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import OppsummeringStep from './OppsummeringStep';

const meta: Meta<typeof OppsummeringStep> = {
    title: 'Steps/Oppsummering',
    component: OppsummeringStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof OppsummeringStep>;

export const Default: Story = {
    args: {},
};
