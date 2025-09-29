import { BrowserRouter } from 'react-router-dom';

export const withRouter = (Story) => {
    return (
        <BrowserRouter>
            <Story />
        </BrowserRouter>
    );
};
