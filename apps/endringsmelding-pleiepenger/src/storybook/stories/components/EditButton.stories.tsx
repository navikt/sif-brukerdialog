import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import EditButton from '../../../app/components/edit-button/EditButton';

export default {
    title: 'Components/EditButton',
    component: EditButton,
    argTypes: {
        multiple: {
            options: [true, false],
            type: 'boolean',
        },
    },
} as ComponentMeta<typeof EditButton>;

const Primary: ComponentStory<typeof EditButton> = (props) => <EditButton {...props} />;

export const Default = Primary.bind({});
Default.args = {
    multiple: true,
};
