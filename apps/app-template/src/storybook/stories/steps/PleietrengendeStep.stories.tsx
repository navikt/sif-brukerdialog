import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import PleietrengendeStep from '../../../app/søknad/steps/pleietrengende/PleietrengendeStep';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/PleietrengendeStep',
    component: PleietrengendeStep,
    decorators: [withIntl, withRouterProvider, withSøknadContextProvider, withFormikWrapper],
} as ComponentMeta<typeof PleietrengendeStep>;

const Template: ComponentStory<typeof PleietrengendeStep> = () => <PleietrengendeStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
    formik: {},
};
