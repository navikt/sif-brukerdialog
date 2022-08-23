import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ValidationExample from '../validation/ValidationExample';
import { withIntl } from '../../decorators/withIntl';

export default {
    title: 'Validation/Examples',
    component: ValidationExample,
    decorators: [withIntl],
} as ComponentMeta<typeof ValidationExample>;

const Template: ComponentStory<typeof ValidationExample> = () => <ValidationExample />;

export const Default = Template.bind({});
