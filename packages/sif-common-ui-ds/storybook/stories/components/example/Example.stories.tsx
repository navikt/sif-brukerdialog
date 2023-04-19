import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Example from '../../../../src/components/example/Example';

export default {
    title: 'Components/Example',
    component: Example,
    argTypes: {
        multiple: {
            options: [true, false],
            type: 'boolean',
        },
    },
} as Meta<typeof Example>;

const Primary: StoryFn<typeof Example> = (props) => <Example />;

export const Default = Primary.bind({});
Default.args = {
    multiple: true,
};
