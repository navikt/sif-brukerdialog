import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import LegeerklæringStep from '../../../app/søknad/steps/legeerklæring/LegeerklæringStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/LegeerklæringStep',
    component: LegeerklæringStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof LegeerklæringStep>;

const Template: StoryFn<typeof LegeerklæringStep> = () => <LegeerklæringStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
