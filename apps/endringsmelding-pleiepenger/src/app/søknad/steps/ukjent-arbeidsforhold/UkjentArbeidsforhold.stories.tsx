import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import UkjentArbeidsforholdStep from './UkjentArbeidsforholdStep';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitudeProvider';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';

const meta: Meta<typeof UkjentArbeidsforholdStep> = {
    title: 'Step/Ukjent arbeidsforhold',
    component: UkjentArbeidsforholdStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof UkjentArbeidsforholdStep>;

export const Default: Story = {
    args: {},
};
