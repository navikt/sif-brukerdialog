import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import SituasjonStep from '../../../app/søknad/steps/situasjon/SituasjonStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { søknadsdataMock } from '../../mock-data/søknadsdataMock';
import { arbeidsgivereStorybookMock } from '../../mock-data';

export default {
    title: 'Steps/SituasjonStep',
    component: SituasjonStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        (Story) => withSøknadContextProvider(Story, { søknadsdata: søknadsdataMock }),
    ],
    parameters: {
        mockData: [
            {
                url: 'http://localhost:8089/oppslag/arbeidsgiver?fra_og_med=2024-01-01&til_og_med=2024-04-30',
                method: 'GET',
                status: 200,
                response: arbeidsgivereStorybookMock,
            },
        ],
    },
} as Meta<typeof SituasjonStep>;

const Template: StoryFn<typeof SituasjonStep> = () => <SituasjonStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
