import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';
import appSentryLogger from '../../utils/appSentryLogger';
import ResetMellomagringButton from '../reset-mellomlagring-button/ResetMellomlagringButton';

interface State {
    eventId: string | null;
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<any, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { eventId: null, hasError: false, error: null };
    }

    componentDidCatch(error: Error | null, errorInfo: any): void {
        if (error && error.message !== 'window.hasFocus is not a function') {
            this.setState({ ...this.state, hasError: true, error });
            appSentryLogger.logError(error.message, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <Page
                    title={'Det oppstod en feil'}
                    topContentRenderer={() => <SoknadHeader title="Søknad om omsorgspengesoknad" />}>
                    <Block margin="xxxl">
                        <SifGuidePanel mood="uncertain">
                            <Heading level="2" size="medium">
                                Det oppstod en feil
                            </Heading>
                            <p>Dersom feilen vedvarer, kan du prøve å starte på nytt.</p>
                            <ResetMellomagringButton label="Start på nytt" />
                        </SifGuidePanel>
                    </Block>
                </Page>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
