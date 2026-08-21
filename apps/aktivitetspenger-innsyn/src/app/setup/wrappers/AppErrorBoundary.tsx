import { appLogger } from '@sif/apm';
import { InnsynDefaultErrorMessage } from '@sif/ung-innsyn/components';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class AppErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
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
            return <InnsynDefaultErrorMessage />;
        }
        return this.props.children;
    }
}
