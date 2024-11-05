import { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import ArbeidssituasjonStep from './ArbeidssituasjonStep';

const meta: Meta<typeof ArbeidssituasjonStep> = {
    title: 'Steps/Arbeidssituasjon',
    component: ArbeidssituasjonStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAmplitudeProvider, withRouterProvider],
    parameters: {
        mockData: [
            {
                url: 'http://localhost:8089/oppslag/arbeidsgiver?fra_og_med=2024-05-06&til_og_med=2024-05-31',
                method: 'GET',
                status: 200,
                response: {
                    organisasjoner: [
                        {
                            navn: 'Arbeids- og velferdsetaten',
                            organisasjonsnummer: '123451234',
                            ansattFom: '2019-09-25',
                            ansattTom: null,
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

export const Default: Story = {
    args: {},
};
