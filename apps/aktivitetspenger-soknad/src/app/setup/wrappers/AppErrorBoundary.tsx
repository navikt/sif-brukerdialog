import { useFaroInstance } from '@navikt/sif-common-faro';
import { AppErrorFallback } from '@sif/soknad-ui';
import React from 'react';

interface FaroErrorBoundaryProps {
    onError?: (error: Error, componentStack: string) => void;
    fallback: React.ReactElement;
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class FaroErrorBoundary extends React.Component<FaroErrorBoundaryProps, State> {
    constructor(props: FaroErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.props.onError?.(error, errorInfo.componentStack || '');
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

interface Props {
    children: React.ReactNode;
}

export const AppErrorBoundary = ({ children }: Props) => {
    const { logError } = useFaroInstance();
    return (
        <FaroErrorBoundary onError={logError} fallback={<AppErrorFallback />}>
            {children}
        </FaroErrorBoundary>
    );
};
