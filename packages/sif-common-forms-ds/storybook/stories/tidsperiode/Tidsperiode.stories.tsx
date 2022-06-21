import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
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
} as ComponentMeta<typeof TidsperiodeExample>;

const Template: ComponentStory<typeof TidsperiodeExample> = () => <TidsperiodeExample />;

export const Default = Template.bind({});
