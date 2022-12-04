import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import VelkommenPage from '../../../app/pages/velkommen/VelkommenPage';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Pages/VelkommenPage',
    component: VelkommenPage,
    decorators: [withIntl, withRouterProvider, withSøknadContextProvider],
} as ComponentMeta<typeof VelkommenPage>;

const Template: ComponentStory<typeof VelkommenPage> = () => <VelkommenPage />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
    formik: {
        initialValues: {
            from: '2020-01-01',
        },
    },
};
