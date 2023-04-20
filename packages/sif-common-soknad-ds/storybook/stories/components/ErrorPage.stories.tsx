import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { withIntl } from '../../decorators/withIntl';
import ErrorPage from '../../../src/pages/ErrorPage';

export default {
    title: 'Component/ErrorPage',
    component: ErrorPage,
    decorators: [withIntl],
} as Meta<typeof ErrorPage>;

const Template: StoryFn<typeof ErrorPage> = (args) => <ErrorPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
