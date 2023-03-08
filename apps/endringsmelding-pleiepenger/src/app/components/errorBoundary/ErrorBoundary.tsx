import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import appSentryLogger from '../../utils/appSentryLogger';
import { Heading } from '@navikt/ds-react';

interface State {
    eventId: string | null;
    hasError: boolean;
    error: Error | null;
    errorInfo?: any;
}

class ErrorBoundary extends React.Component<any, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { eventId: null, hasError: false, error: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        if (error && error.message !== 'window.hasFocus is not a function') {
            this.setState({ ...this.state, hasError: true, error, errorInfo });
            appSentryLogger.logError(error.message, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            const { error, errorInfo } = this.state;
            const debug = JSON.stringify({ error, errorInfo });
            return (
                <Page
                    title={'Det oppstod en feil'}
                    topContentRenderer={() => <SoknadHeader title="Endringsmelding - pleiepenger sykt barn" />}>
                    <Block margin="xxxl">
                        <SifGuidePanel mood="uncertain">
                            <Heading level="2" size="medium">
                                Oops - der oppstod det en feil
                            </Heading>
                            <p>
                                Du kan gå tilbake å prøve på nytt. Dersom feilen vedvarer, kan du prøve igjen litt
                                senere.
                            </p>
                            <p>[{debug}]</p>
                        </SifGuidePanel>
                    </Block>
                </Page>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
