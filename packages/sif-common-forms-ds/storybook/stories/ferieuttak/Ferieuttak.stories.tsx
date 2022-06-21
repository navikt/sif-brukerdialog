import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import FerieuttakExample from './FerieuttakExample';
import AppIntlProvider from '../../decorators/AppIntlProvider';

export default {
    title: 'Form/Ferieuttak',
    component: FerieuttakExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as ComponentMeta<typeof FerieuttakExample>;

const Template: ComponentStory<typeof FerieuttakExample> = () => <FerieuttakExample />;

export const Default = Template.bind({});
