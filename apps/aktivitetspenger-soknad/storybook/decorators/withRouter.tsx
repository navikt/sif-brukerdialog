import { MemoryRouter } from 'react-router-dom';

export const withRouter = (Story: any) => (
    <MemoryRouter>
        <Story />
    </MemoryRouter>
);
