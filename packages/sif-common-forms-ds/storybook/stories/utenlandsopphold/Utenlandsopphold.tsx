import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import UtenlandsoppholdExample from './UtenlandsoppholdExample';
import AppIntlProvider from '../../decorators/AppIntlProvider';

export default {
    title: 'Form/Utenlandsopphold',
    component: UtenlandsoppholdExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as ComponentMeta<typeof UtenlandsoppholdExample>;

const Template: ComponentStory<typeof UtenlandsoppholdExample> = () => <UtenlandsoppholdExample />;

export const Default = Template.bind({});
