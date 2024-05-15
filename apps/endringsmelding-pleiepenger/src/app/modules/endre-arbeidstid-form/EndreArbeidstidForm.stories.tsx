import { Meta, StoryObj } from '@storybook/react';
import { arbeidsukerMockData } from '../../../mocks/data/app/arbeidsukerMockData';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';
import EndreArbeidstidForm from './EndreArbeidstidForm';

const meta: Meta<typeof EndreArbeidstidForm> = {
    title: 'Modules/EndreArbeidstidForm',
    component: EndreArbeidstidForm,
    decorators: [withIntl, withRouterProvider, (Story) => withSøknadContextProvider(Story, {}), withModalWrapper],
};

const { arbeidsuke, arbeidsukerEttÅr, arbeidsukerFlereÅr } = arbeidsukerMockData;

export default meta;

type Story = StoryObj<typeof EndreArbeidstidForm>;

export const EndreEnUke: Story = {
    args: { arbeidsuker: [arbeidsuke], onCancel: () => null, onSubmit: () => null },
};
export const EndreFlereUkerSammeÅr: Story = {
    args: { arbeidsuker: arbeidsukerEttÅr, onCancel: () => null, onSubmit: () => null },
};
export const EndreFlereUkerFlereÅr: Story = {
    args: { arbeidsuker: arbeidsukerFlereÅr, onCancel: () => null, onSubmit: () => null },
};
