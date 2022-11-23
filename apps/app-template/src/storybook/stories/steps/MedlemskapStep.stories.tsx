import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import MedlemskapStep from '../../../app/søknad/steps/medlemskap/MedlemskapStep';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/MedlemskapStep',
    component: MedlemskapStep,
    decorators: [withIntl, withRouterProvider, withSøknadContextProvider, withFormikWrapper],
} as ComponentMeta<typeof MedlemskapStep>;

const Template: ComponentStory<typeof MedlemskapStep> = () => <MedlemskapStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
    formik: {},
};
