import { Page } from '@navikt/ds-react';
import AppFooter from '../app-footer/AppFooter';

const AppPage = ({ children }) => {
    return (
        <Page style={{ minHeight: 'calc(100lvh - 3rem)' }} footer={<AppFooter />}>
            {children}
        </Page>
    );
};

export default AppPage;
