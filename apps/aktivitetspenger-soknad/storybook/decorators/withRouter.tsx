import { BrowserRouter } from 'react-router-dom';

export const withRouter = (Story) => (
    <BrowserRouter>
        <Story />
    </BrowserRouter>
);
