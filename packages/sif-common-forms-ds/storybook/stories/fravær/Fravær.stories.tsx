import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import FraværExample from './FraværExample';
import AppIntlProvider from '../../decorators/AppIntlProvider';

export default {
    title: 'Form/Fravær',
    component: FraværExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as ComponentMeta<typeof FraværExample>;

const Template: ComponentStory<typeof FraværExample> = () => <FraværExample />;

export const Default = Template.bind({});
