import { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../../storybook/decorators/withIntl';
import EndringerTekstoppsummering from './EndringerTekstoppsummering';

const meta: Meta<typeof EndringerTekstoppsummering> = {
    title: 'Component/EndringerTekstoppsummering',
    component: EndringerTekstoppsummering,
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof EndringerTekstoppsummering>;

export const EttAvTreArbeidsforholdOgFerie: Story = {
    args: {
        arbeidsforhold: { antallEndret: 1, antallTotalt: 3 },
        ferie: { harLagtTil: true, harFjernet: false },
        tilsynsordningErEndret: false,
    },
};

export const KunOmsorgstilbud: Story = {
    args: {
        arbeidsforhold: { antallEndret: 0, antallTotalt: 1 },
        ferie: { harLagtTil: false, harFjernet: false },
        tilsynsordningErEndret: true,
    },
};

export const AltEndret: Story = {
    args: {
        arbeidsforhold: { antallEndret: 2, antallTotalt: 2 },
        ferie: { harLagtTil: true, harFjernet: true },
        tilsynsordningErEndret: true,
    },
};
