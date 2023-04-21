import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
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
} as Meta<typeof FraværExample>;

const Template: StoryFn<typeof FraværExample> = () => <FraværExample />;

export const Default = Template.bind({});
