import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import BostedUtlandExample from './BostedUtlandExample';
import AppIntlProvider from '../../decorators/AppIntlProvider';

export default {
    title: 'Form/BostedUtland',
    component: BostedUtlandExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as Meta<typeof BostedUtlandExample>;

const Template: StoryFn<typeof BostedUtlandExample> = () => <BostedUtlandExample />;

export const Default = Template.bind({});
