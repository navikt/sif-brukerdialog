import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import VirksomhetExample from './VirksomhetExample';
import AppIntlProvider from '../../decorators/AppIntlProvider';

export default {
    title: 'Form/Virksomhet',
    component: VirksomhetExample,
    decorators: [
        (Story) => (
            <AppIntlProvider locale="nb">
                <Story />
            </AppIntlProvider>
        ),
    ],
} as ComponentMeta<typeof VirksomhetExample>;

const Template: ComponentStory<typeof VirksomhetExample> = () => <VirksomhetExample />;

export const Default = Template.bind({});
