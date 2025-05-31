/* eslint-disable no-console */
import React from 'react';

interface ErrorBoundaryProps {
    fallback?: React.ReactNode; // Tilpasset fallback-UI
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void; // Callback for logging
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ hasError: true, error });

        // Kall på ekstern logger hvis definert
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        } else {
            console.error('Error caught by ErrorBoundary:', error, errorInfo);
        }
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        const { hasError, error } = this.state;
        const { fallback, children } = this.props;

        if (hasError) {
            return (
                fallback || (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h1>Oops! Noe gikk galt.</h1>
                        <p>Vi beklager, men det oppstod en feil.</p>
                        <button onClick={this.resetError} style={{ marginTop: '1rem' }}>
                            Prøv igjen
                        </button>
                        {error && <pre style={{ marginTop: '1rem', color: 'red' }}>{error.message}</pre>}
                    </div>
                )
            );
        }

        return children;
    }
}

export default ErrorBoundary;
