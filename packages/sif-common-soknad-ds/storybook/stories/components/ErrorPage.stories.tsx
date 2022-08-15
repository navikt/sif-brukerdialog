import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import ErrorPage from '../../../src/soknad-common-pages/ErrorPage';

export default {
    title: 'Component/ErrorPage',
    component: ErrorPage,
    decorators: [withFormik],
} as ComponentMeta<typeof ErrorPage>;

const Template: ComponentStory<typeof ErrorPage> = (args) => <ErrorPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
