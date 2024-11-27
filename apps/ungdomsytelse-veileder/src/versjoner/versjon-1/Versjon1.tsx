import { Outlet } from 'react-router-dom';
import { Page } from '@navikt/ds-react';
import AppHeader from './components/AppHeader';
import { IntlProvider } from 'react-intl';
import { appMessages } from './i18n';

const Versjon1 = () => {
    return (
        <IntlProvider locale="nb" messages={appMessages.nb}>
            <Page>
                <AppHeader />
                <Outlet />
            </Page>
        </IntlProvider>
    );
};

export default Versjon1;
