import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import ArbeidssituasjonStep from '../../../app/søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/ArbeidssituasjonStep',
    component: ArbeidssituasjonStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof ArbeidssituasjonStep>;

const Template: StoryFn<typeof ArbeidssituasjonStep> = () => <ArbeidssituasjonStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
