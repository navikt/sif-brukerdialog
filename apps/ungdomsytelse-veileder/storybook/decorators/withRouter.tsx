import { BrowserRouter } from 'react-router-dom';

const withRouter = (Story) => {
    return <BrowserRouter>{Story}</BrowserRouter>;
};

export default withRouter;
