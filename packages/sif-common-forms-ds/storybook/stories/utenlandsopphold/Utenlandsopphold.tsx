import { Meta, StoryFn } from '@storybook/react';
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
} as Meta<typeof UtenlandsoppholdExample>;

const Template: StoryFn<typeof UtenlandsoppholdExample> = () => <UtenlandsoppholdExample />;

export const Default = Template.bind({});
