import { appLogger } from '@sif/apm';
import { AppErrorFallback } from '@sif/soknad-ui';
import React, { ReactNode } from 'react';

interface State {
    hasError: boolean;
}

export class AppErrorBoundary extends React.Component<{ children: ReactNode }, State> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        appLogger.logException(error, { componentStack: errorInfo?.componentStack });
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <AppErrorFallback />;
        }
        return this.props.children;
    }
}
