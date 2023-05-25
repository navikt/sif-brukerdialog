import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import AppIntlProvider from '../../decorators/AppIntlProvider';
import OpptjeningUtlandExample from './OpptjeningUtlandExample';

export default {
    title: 'Form/Opptjening utland',
    component: OpptjeningUtlandExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as Meta<typeof OpptjeningUtlandExample>;

const Template: StoryFn<typeof OpptjeningUtlandExample> = () => <OpptjeningUtlandExample />;

export const Default = Template.bind({});
