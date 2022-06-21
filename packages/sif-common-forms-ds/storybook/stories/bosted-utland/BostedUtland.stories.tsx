import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import AppIntlProvider from '../../decorators/AppIntlProvider';
import BostedUtlandExample from './BostedUtlandExample';

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

const Template: ComponentStory<typeof BostedUtlandExample> = (args) => <BostedUtlandExample {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'BostedUtland',
    name: 'BostedUtland',
    value: 'abc',
};
Default.parameters = {
    formik: {
        initialValues: {
            BostedUtlandExample: true,
        },
    },
};
