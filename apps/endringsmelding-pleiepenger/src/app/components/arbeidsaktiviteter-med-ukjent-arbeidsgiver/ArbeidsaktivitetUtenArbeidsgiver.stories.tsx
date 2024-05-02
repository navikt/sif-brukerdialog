import { Meta, StoryObj } from '@storybook/react';
import { sakMock } from '../../../storybook/data/sakMock';
import { withIntl } from '../../../storybook/decorators/withIntl';
import ArbeidsaktiviteterMedUkjentArbeidsgiver from './ArbeidsaktiviteterMedUkjentArbeidsgiver';

const meta: Meta<typeof ArbeidsaktiviteterMedUkjentArbeidsgiver> = {
    title: 'Components/ArbeidsaktiviteterMedUkjentArbeidsgiver',
    component: ArbeidsaktiviteterMedUkjentArbeidsgiver,
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof ArbeidsaktiviteterMedUkjentArbeidsgiver>;

export const EnUkjent: Story = {
    name: 'Et ukjent arbeidsforhold',
    args: {
        arbeidsaktiviteter: sakMock.arbeidsaktiviteter,
        arbeidsaktivitetMedUkjentArbeidsgiver: [
            {
                organisasjonsnummer: '223344455',
            },
        ],
    },
};
export const ToUkjente: Story = {
    name: 'To ukjente arbeidsforhold',
    args: {
        arbeidsaktiviteter: sakMock.arbeidsaktiviteter,
        arbeidsaktivitetMedUkjentArbeidsgiver: [
            {
                organisasjonsnummer: '123456789',
            },
            {
                organisasjonsnummer: '223344455',
            },
        ],
    },
};
