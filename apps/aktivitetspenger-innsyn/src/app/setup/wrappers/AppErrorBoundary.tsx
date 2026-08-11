import { InnsynDefaultErrorMessage } from '@sif/ung-innsyn/components';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

export class AppErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        console.error('AppErrorBoundary caught an error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <InnsynDefaultErrorMessage />;
        }
        return this.props.children;
    }
}
