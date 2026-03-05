import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <VStack gap="space-16" style={{ padding: '2rem', minHeight: '50vh' }}>
                    <Heading size="large">Noe gikk galt</Heading>
                    <Alert variant="error">
                        <VStack gap="space-8">
                            <BodyShort>En uventet feil har oppstått.</BodyShort>
                            {this.state.error && <BodyShort size="small">{this.state.error.message}</BodyShort>}
                        </VStack>
                    </Alert>
                </VStack>
            );
        }

        return this.props.children;
    }
}
