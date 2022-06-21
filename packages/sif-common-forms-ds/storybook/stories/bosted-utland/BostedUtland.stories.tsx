import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
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
} as ComponentMeta<typeof BostedUtlandExample>;

const Template: ComponentStory<typeof BostedUtlandExample> = () => <BostedUtlandExample />;

export const Default = Template.bind({});
