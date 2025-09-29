import { Box, Button, Heading } from '@navikt/ds-react';
import React from 'react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import AppPage from '../app-page/AppPage';

interface State {
    hasError: boolean;
    error: Error | null;
    resetPending: boolean;
}

interface Props {
    children: React.ReactNode;
    appTitle: string;
    onResetSoknad?: () => void;
}

class AppErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            resetPending: false,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ hasError: true, error });
        // eslint-disable-next-line no-console
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    resetSoknad = () => {
        if (this.props.onResetSoknad) {
            this.setState({ resetPending: true });
            this.props.onResetSoknad();
        }
    };

    render() {
        const { hasError, resetPending } = this.state;
        const { children, onResetSoknad } = this.props;

        if (hasError) {
            return (
                <AppPage>
                    <Box paddingBlock="10">
                        <SifGuidePanel mood="uncertain">
                            <Heading level="2" size="medium">
                                Det oppstod en feil
                            </Heading>
                            <p>Dersom feilen vedvarer, kan du prøve å starte på nytt.</p>
                            <Box marginBlock="4 0">
                                {onResetSoknad && (
                                    <Button
                                        type="button"
                                        onClick={this.resetSoknad}
                                        variant="secondary"
                                        loading={resetPending}
                                        size="small">
                                        Start på nytt
                                    </Button>
                                )}
                            </Box>
                        </SifGuidePanel>
                    </Box>
                </AppPage>
            );
        }

        return children;
    }
}

export default AppErrorBoundary;
