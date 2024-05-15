import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import OmAnnenForelderStep from '../../../app/søknad/steps/om-annen-forelder/OmAnnenForelderStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';

export default {
    title: 'Steps/OmAnnenForelderStep',
    component: OmAnnenForelderStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof OmAnnenForelderStep>;

const Template: StoryFn<typeof OmAnnenForelderStep> = () => <OmAnnenForelderStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
