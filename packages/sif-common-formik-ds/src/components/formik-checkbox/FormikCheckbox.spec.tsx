import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { StoryFormikWrapper } from '../../../storybook/decorators/StoryFormikWrapper';
import * as stories from '../../../storybook/stories/components/FormikCheckbox.stories';

const { Default } = stories;

describe('<FormikCheckbox>', () => {
    const handleChange = jest.fn();

    const renderComponent = (content) => {
        return render(<StoryFormikWrapper parameters={{ includeButtons: true }}>{content}</StoryFormikWrapper>);
    };

    const label = 'Checkbox label';

    it('rendrer checkbox riktig', async () => {
        const screen = renderComponent(<Default name="abc" value="1" label={label}></Default>);
        const checkbox = screen.getByText(label);
        expect(checkbox).toBeDefined();
    });

    it('kaller afterOnChange etter at bruker endrer state', async () => {
        const screen = renderComponent(<Default afterOnChange={handleChange} name="abc" label={label} />);
        const checkbox = screen.getByText(label);
        userEvent.click(checkbox);
        await waitFor(() => expect(handleChange).toHaveBeenCalled());
    });

    it('kaller ikke afterOnChange dersom denne ikke er satt og bruker endrer state', async () => {
        const screen = renderComponent(<Default name="abc" label={label} />);
        const checkbox = screen.getByText(label);
        userEvent.click(checkbox);
        await waitFor(() => expect(handleChange).not.toHaveBeenCalled());
    });
});
