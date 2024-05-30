import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import ArbeidstidStep from './ArbeidstidStep';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitudeProvider';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';

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
