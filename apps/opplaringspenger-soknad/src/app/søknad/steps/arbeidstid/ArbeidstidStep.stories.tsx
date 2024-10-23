import { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import ArbeidstidStep from './ArbeidstidStep';

const meta: Meta<typeof ArbeidstidStep> = {
    title: 'Step/Arbeidstid',
    component: ArbeidstidStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof ArbeidstidStep>;

export const Default: Story = {
    args: {},
};
