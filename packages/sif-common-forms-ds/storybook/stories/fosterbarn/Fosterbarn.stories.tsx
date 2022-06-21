import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import FosterbarnExample from './FosterbarnExample';
import AppIntlProvider from '../../decorators/AppIntlProvider';

export default {
    title: 'Form/Fosterbarn',
    component: FosterbarnExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as ComponentMeta<typeof FosterbarnExample>;

const Template: ComponentStory<typeof FosterbarnExample> = () => <FosterbarnExample />;

export const Default = Template.bind({});
