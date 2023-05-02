import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import AnnetBarnExample from './AnnetBarnExample';
import AppIntlProvider from '../../decorators/AppIntlProvider';

export default {
    title: 'Form/AnnetBarn',
    component: AnnetBarnExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as Meta<typeof AnnetBarnExample>;

const Template: StoryFn<typeof AnnetBarnExample> = () => <AnnetBarnExample />;

export const Default = Template.bind({});
