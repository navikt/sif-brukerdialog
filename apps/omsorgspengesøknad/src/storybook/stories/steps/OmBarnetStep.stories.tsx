import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import OmBarnetStep from '../../../app/søknad/steps/om-barnet/OmBarnetStep';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/OmBarnetStep',
    component: OmBarnetStep,
    decorators: [withIntl, withRouterProvider, withSøknadContextProvider, withFormikWrapper],
} as ComponentMeta<typeof OmBarnetStep>;

const Template: ComponentStory<typeof OmBarnetStep> = () => <OmBarnetStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
    formik: {
        initialValues: {
            from: '2020-01-01',
        },
    },
};
