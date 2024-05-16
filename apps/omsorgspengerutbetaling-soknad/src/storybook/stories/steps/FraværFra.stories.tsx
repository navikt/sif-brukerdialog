import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import FraværFraStep from '../../../app/søknad/steps/fravær-fra/FraværFraStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/FraværFraStep',
    component: FraværFraStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof FraværFraStep>;

const Template: StoryFn<typeof FraværFraStep> = () => <FraværFraStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
