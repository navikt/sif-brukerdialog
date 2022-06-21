import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
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
} as ComponentMeta<typeof AnnetBarnExample>;

const Template: ComponentStory<typeof AnnetBarnExample> = (args) => <AnnetBarnExample {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'AnnetBarn',
    name: 'AnnetBarn',
    value: 'abc',
};
Default.parameters = {
    formik: {
        initialValues: {
            AnnetBarnExample: true,
        },
    },
};
