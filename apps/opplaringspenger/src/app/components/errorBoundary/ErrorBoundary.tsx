import React from 'react';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import appSentryLogger from '../../utils/appSentryLogger';

interface State {
    eventId: string | null;
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<any, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { eventId: null, hasError: false, error: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        if (error && error.message !== 'window.hasFocus is not a function') {
            this.setState({ ...this.state, hasError: true, error });
            appSentryLogger.logError(error.message, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorPage
                    pageTitle="Det oppstod en feil"
                    contentRenderer={() => <p>Dette er feilmeldingen ved error boundary</p>}
                />
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
