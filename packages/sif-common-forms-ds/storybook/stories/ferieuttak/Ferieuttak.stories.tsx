import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import FerieuttakExample from './FerieuttakExample';
import AppIntlProvider from '../../decorators/AppIntlProvider';

export default {
    title: 'FormDepr/Ferieuttak',
    component: FerieuttakExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as Meta<typeof FerieuttakExample>;

const Template: StoryFn<typeof FerieuttakExample> = () => <FerieuttakExample />;

export const Default = Template.bind({});
