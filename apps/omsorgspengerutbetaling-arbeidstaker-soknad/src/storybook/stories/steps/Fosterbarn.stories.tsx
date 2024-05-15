import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import FosterbarnStep from '../../../app/søknad/steps/fosterbarn/FosterbarnStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/FosterbarnStep',
    component: FosterbarnStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof FosterbarnStep>;

const Template: StoryFn<typeof FosterbarnStep> = () => <FosterbarnStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
