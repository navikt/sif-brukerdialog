import { Alert, List, ReadMore, VStack } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import VeilederDemoHeader from './demo/veileder-demo-header/VeilederDemoHeader';

const AppRouter = ({ children }: { children: React.ReactNode }) => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');

    if (__IS_GITHUB_PAGES__ || __IS_VEILEDER_DEMO__) {
        return (
            <HashRouter>
                <header>
                    <VStack gap="10">
                        {__IS_VEILEDER_DEMO__ && <VeilederDemoHeader />}
                        <PageBoundary>
                            <Alert variant="warning" fullWidth={true} className="w-full">
                                Demo av søknadsskjema og deltakersider for ungdomsprogrammet
                                {__IS_VEILEDER_DEMO__ && (
                                    <ReadMore header="Mer informajson" size="small">
                                        <List>
                                            <List.Item>
                                                Denne demoen er en interaktiv løsning der du kan sende inn en søknad og
                                                besvare oppgaver slik en deltaker ville gjort.
                                            </List.Item>
                                            <List.Item>
                                                Du kan utforske fritt – alt du gjør her påvirker kun demoen, og
                                                ingenting sendes videre til andre systemer.
                                            </List.Item>
                                            <List.Item>
                                                I menyen «Velg scenario» oppe til høyre kan du bytte mellom
                                                søknadsskjemaet og deltakersidene.
                                            </List.Item>
                                            <List.Item>
                                                Demoen husker midlertidig det du gjør, slik at den oppfører seg som for
                                                en faktisk deltaker – for eksempel vil oppgaver du har besvart vises som
                                                besvart etterpå.
                                            </List.Item>
                                            <List.Item>
                                                Når du bytter scenario, tilbakestilles alt du har gjort.
                                            </List.Item>
                                        </List>
                                    </ReadMore>
                                )}
                            </Alert>
                        </PageBoundary>
                    </VStack>
                </header>
                <div className={__IS_VEILEDER_DEMO__ ? 'demoMode' : undefined}>{children}</div>
            </HashRouter>
        );
    }
    return (
        <>
            {__IS_VEILEDER_DEMO__ ? (
                <>
                    <VeilederDemoHeader />
                    <BrowserRouter basename={publicPath}>
                        <div className={__IS_VEILEDER_DEMO__ ? 'demoMode' : undefined}>{children}</div>
                    </BrowserRouter>
                </>
            ) : (
                <BrowserRouter basename={publicPath}>{children}</BrowserRouter>
            )}
        </>
    );
};

export default AppRouter;
