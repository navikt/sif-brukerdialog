import { fn } from 'storybook/test';

import { OppgavePageContext } from '../pages/hooks/useOppgavePage';

const mockContext = {
    onCancel: fn(),
    onSuccess: fn(),
};

export const OppgavePageDecorator = (Story: React.ComponentType) => (
    <OppgavePageContext.Provider value={mockContext}>
        <Story />
    </OppgavePageContext.Provider>
);
