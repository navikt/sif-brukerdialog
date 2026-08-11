import React from 'react';

import { InnsynDefaultErrorMessage } from '../innsyn-default-error-message/InnsynDefaultErrorMessage';

interface ErrorBoundaryProps {
    fallback?: React.ReactElement;
    onError?: (error: Error, componentStack: string) => void;
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, info);
        if (error instanceof Error) {
            this.props.onError?.(error, info.componentStack ?? '');
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? <InnsynDefaultErrorMessage />;
        }
        return this.props.children;
    }
}
