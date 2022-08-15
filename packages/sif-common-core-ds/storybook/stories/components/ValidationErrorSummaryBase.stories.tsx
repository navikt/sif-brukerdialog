import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ValidationErrorSummaryBase from '../../../src/components/validation-error-summary-base/ValidationErrorSummaryBase';
import StoryWrapper from '../../decorators/StoryWrapper';

export default {
    title: 'Component/ValidationErrorSummaryBase',
    component: ValidationErrorSummaryBase,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as ComponentMeta<typeof ValidationErrorSummaryBase>;

const Template: ComponentStory<typeof ValidationErrorSummaryBase> = () => {
    return (
        <ValidationErrorSummaryBase
            title="Validarion error title"
            errors={[{ name: 'Name of control', message: 'This is the message' }]}
        />
    );
};

export const Default = Template.bind({});
