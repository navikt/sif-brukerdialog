import { render } from '@testing-library/react';
import * as React from 'react';
import { StoryFormikWrapper } from '../../../storybook/decorators/StoryFormikWrapper';
import { mockAnimalOptions } from '../../../storybook/mock-data';
import * as stories from '../../../storybook/stories/components/FormikCheckboxGroup.stories';
import FormikCheckboxGroup from './FormikCheckboxGroup';

const { Default } = stories;

describe('<FormikCheckboxGroup>', () => {
    const renderComponent = (content, initialValues?: any) => {
        return render(
            <StoryFormikWrapper parameters={{ includeButtons: true, formik: { initialValues } }}>
                {content}
            </StoryFormikWrapper>,
        );
    };

    it('rendrer gruppe riktig', async () => {
        const screen = renderComponent(<Default name={'animals'} legend={'Choose'} checkboxes={mockAnimalOptions} />);
        const checkbox = screen.getByText('Choose');
        expect(checkbox).toBeDefined();
    });

    it('rendrer gruppe riktig ved initial values', async () => {
        const screen = renderComponent(
            <FormikCheckboxGroup
                name="animals"
                legend={'Choose animal'}
                checkboxes={[
                    ...mockAnimalOptions,
                    { label: 'Dragon', value: 'dragon', 'data-testid': 'dragon-option' },
                ]}
            />,
            { animals: ['dragon'] },
        );
        const checkbox = screen.getByTestId('dragon-option');
        expect(checkbox).toBeDefined();
        expect(checkbox.ariaChecked === 'true').toBeTruthy();
        expect(checkbox).toBeChecked();
    });
});
