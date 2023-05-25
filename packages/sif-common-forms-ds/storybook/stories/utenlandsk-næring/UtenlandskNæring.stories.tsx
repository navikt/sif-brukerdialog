import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import AppIntlProvider from '../../decorators/AppIntlProvider';
import UtenlandsNæringExample from './UtenlandsNæringExample';

export default {
    title: 'Form/Utenlands næring',
    component: UtenlandsNæringExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as Meta<typeof UtenlandsNæringExample>;

const Template: StoryFn<typeof UtenlandsNæringExample> = () => <UtenlandsNæringExample />;

export const Default = Template.bind({});
