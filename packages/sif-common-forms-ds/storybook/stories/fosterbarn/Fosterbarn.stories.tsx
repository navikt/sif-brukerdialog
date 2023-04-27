import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
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
} as Meta<typeof FosterbarnExample>;

const Template: StoryFn<typeof FosterbarnExample> = () => <FosterbarnExample />;

export const Default = Template.bind({});
