import { Button, Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';
import { appSentryLogger, relocateToWelcomePage } from '@utils';
import søknadStateEndpoint from '../../api/endpoints/søknadStateEndpoint';

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

    async restart() {
        await søknadStateEndpoint.purge();
        relocateToWelcomePage();
    }

    render() {
        if (this.state.hasError) {
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
                                Du kan gå tilbake å prøve på nytt. Hvis feilen vedvarer, kan du prøve igjen litt senere
                            </p>
                            <p>
                                Eller du kan velge å starte helt på nytt, men da vil eventuelle endringer du har lagt
                                inn være fjernet.
                            </p>
                            <Button type="button" onClick={() => this.restart()} size="small" variant="secondary">
                                Start på nytt
                            </Button>
                        </SifGuidePanel>
                    </Block>
                </Page>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
