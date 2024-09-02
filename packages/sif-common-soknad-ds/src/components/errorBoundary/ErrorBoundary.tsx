import { Box, Button, Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';

interface State {
    eventId: string | null;
    hasError: boolean;
    error: Error | null;
    resetPending?: boolean;
}

interface Props {
    appKey: string;
    children: React.ReactNode;
    appTitle: string;
    onResetSoknad?: () => void;
}
class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { eventId: null, hasError: false, error: null, resetPending: false };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        if (error && error.message !== 'window.hasFocus is not a function') {
            this.setState({ ...this.state, hasError: true, error });
            if (this.props.appKey) {
                getSentryLoggerForApp(this.props.appKey, []).logError(error.message, errorInfo);
            }
        }
    }

    resetSoknad = async () => {
        if (this.props.onResetSoknad) {
            this.setState({ ...this.state, resetPending: true });
            this.props.onResetSoknad();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <Page
                    title={'Det oppstod en feil'}
                    topContentRenderer={() => <SoknadHeader title={this.props.appTitle} />}>
                    <Block margin="xxxl">
                        <SifGuidePanel mood="uncertain">
                            <Heading level="2" size="medium">
                                Det oppstod en feil
                            </Heading>

                            <p>Dersom feilen vedvarer, kan du prøve å starte på nytt.</p>
                            <Box marginBlock={'4 0'}>
                                {this.props.onResetSoknad && (
                                    <Button
                                        type="button"
                                        onClick={this.resetSoknad}
                                        variant="secondary"
                                        loading={this.state.resetPending}
                                        size="small">
                                        Start på nytt
                                    </Button>
                                )}
                            </Box>
                        </SifGuidePanel>
                    </Block>
                </Page>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
