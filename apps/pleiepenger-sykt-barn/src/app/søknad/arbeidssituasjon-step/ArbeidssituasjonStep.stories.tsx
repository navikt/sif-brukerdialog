import { Meta, StoryObj } from '@storybook/react';
import { withStepWrapper } from '../../../storybook/decorators';
import ArbeidssituasjonStep from './ArbeidssituasjonStep';

import { søknadsdata } from '../../../storybook/data/søknadsdata';

const meta: Meta<typeof ArbeidssituasjonStep> = {
    title: 'Step/ArbeidssituasjonStep',
    component: ArbeidssituasjonStep,
    decorators: [withStepWrapper],
    args: {
        søknadsperiode: søknadsdata.søknadsperiode,
    },
    parameters: {
        mockData: [
            {
                url: 'http://localhost:8089/oppslag/arbeidsgiver?fra_og_med=2024-05-01&til_og_med=2024-05-26&frilansoppdrag=true',
                method: 'GET',
                status: 200,
                response: {
                    organisasjoner: [
                        {
                            navn: 'SJOKKERENDE ELEKTRIKER',
                            organisasjonsnummer: '947064649',
                            ansattFom: '2002-04-20',
                        },
                    ],
                    frilansoppdrag: [],
                    privatarbeidsgiver: [],
                },
            },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof ArbeidssituasjonStep>;

export const Default: Story = {};
