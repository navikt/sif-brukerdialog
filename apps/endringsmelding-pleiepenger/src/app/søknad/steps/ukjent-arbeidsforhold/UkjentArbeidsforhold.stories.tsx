import { Meta, StoryObj } from '@storybook/react-vite';

import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitudeProvider';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import UkjentArbeidsforholdStep from './UkjentArbeidsforholdStep';

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
