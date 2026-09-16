import { appLogger } from '@sif/apm';
import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
    fallback?: ReactNode;
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
    constructor(props: ErrorBoundaryProps) {
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
            return this.props.fallback ?? null;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
