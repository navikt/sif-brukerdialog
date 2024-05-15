import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import OmBarnaStep from '../../../app/søknad/steps/om-barna/OmBarnaStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';

export default {
    title: 'Steps/OmBarnaStep',
    component: OmBarnaStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof OmBarnaStep>;

const Template: StoryFn<typeof OmBarnaStep> = () => <OmBarnaStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
