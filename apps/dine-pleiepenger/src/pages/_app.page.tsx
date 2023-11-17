import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { AppProps } from 'next/app';
import { ServerSidePropsResult } from '../auth/withAuthentication';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { messages } from '../utils/message';
import '../style/global.css';
import '../components/process/process.css';

function MyApp({ Component, pageProps }: AppProps<ServerSidePropsResult>): ReactElement {
    return (
        <ErrorBoundary>
            <main id="maincontent" role="main" tabIndex={-1}>
                <IntlProvider locale="nb" messages={messages.nb}>
                    <Component {...pageProps} />
                </IntlProvider>
            </main>
        </ErrorBoundary>
    );
}

export default MyApp;
