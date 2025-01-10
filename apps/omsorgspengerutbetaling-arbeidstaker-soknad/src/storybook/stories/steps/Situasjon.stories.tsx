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
import { http, HttpResponse } from 'msw';

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
        msw: {
            handlers: [
                http.get('**arbeidsgiver**', () => {
                    return HttpResponse.json(arbeidsgivereStorybookMock);
                }),
            ],
        },
    },
} as Meta<typeof SituasjonStep>;

const Template: StoryFn<typeof SituasjonStep> = () => <SituasjonStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
