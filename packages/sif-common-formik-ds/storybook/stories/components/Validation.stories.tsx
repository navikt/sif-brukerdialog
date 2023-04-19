import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ValidationExample from '../validation/ValidationExample';
import { withIntl } from '../../decorators/withIntl';

export default {
    title: 'Validation/Examples',
    component: ValidationExample,
    decorators: [withIntl],
} as Meta<typeof ValidationExample>;

const Template: StoryFn<typeof ValidationExample> = () => <ValidationExample />;

export const Default = Template.bind({});
