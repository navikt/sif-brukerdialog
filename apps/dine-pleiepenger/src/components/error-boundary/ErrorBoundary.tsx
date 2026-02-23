import { Page } from '@navikt/ds-react';
import { createChildLogger } from '@navikt/next-logger';
import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ErrorFallback from './ErrorFallback';

interface State {
    hasError: boolean;
}

let userRequestId: string | undefined;

function getUserRequestId(): string {
    if (!userRequestId) {
        userRequestId = uuidv4();
    }
    return userRequestId;
}

function isDecoratorNoise(error: Error): boolean {
    return typeof error?.message === 'string' && error.message.includes('Non-Error promise rejection');
}

class ErrorBoundary extends Component<PropsWithChildren, State> {
    private childLogger = createChildLogger(getUserRequestId());

    constructor(props: PropsWithChildren<unknown>) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        if (isDecoratorNoise(error)) {
            return { hasError: false };
        }
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        if (isDecoratorNoise(error)) {
            return;
        }

        this.childLogger.error(
            new Error(
                `Caught error in ErrorBoundary's componentDidCatch hasError: ${error != null}, hasErrorInfo:${
                    errorInfo != null
                }`,
                { cause: error },
            ),
        );
        this.childLogger.error(JSON.stringify({ error, errorInfo, requestId: getUserRequestId() }));
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <Page>
                    <Page.Block width="xl">
                        <ErrorFallback />
                    </Page.Block>
                </Page>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
