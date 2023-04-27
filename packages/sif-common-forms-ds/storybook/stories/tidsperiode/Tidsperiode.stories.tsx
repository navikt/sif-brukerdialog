import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import TidsperiodeExample from './TidsperiodeExample';
import AppIntlProvider from '../../decorators/AppIntlProvider';

export default {
    title: 'Form/Tidsperiode',
    component: TidsperiodeExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as Meta<typeof TidsperiodeExample>;

const Template: StoryFn<typeof TidsperiodeExample> = () => <TidsperiodeExample />;

export const Default = Template.bind({});
