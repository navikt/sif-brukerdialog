import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import MedlemskapStep from '../../../app/søknad/steps/medlemskap/MedlemskapStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/MedlemskapStep',
    component: MedlemskapStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof MedlemskapStep>;

const Template: StoryFn<typeof MedlemskapStep> = () => <MedlemskapStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
