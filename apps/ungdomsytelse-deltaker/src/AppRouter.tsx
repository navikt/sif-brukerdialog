import { Alert, Box } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import VeilederDemoHeader from './demo/veileder-demo-header/VeilederDemoHeader';

/** __IS_GITHUB_PAGES__ settes til true i vite-demo-config */
const getIsGithubPages = () => __IS_GITHUB_PAGES__;
const getIsVeilederDemo = () => __IS_VEILEDER_DEMO__;

const AppRouter = ({ children }: { children: React.ReactNode }) => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');

    if (getIsGithubPages()) {
        return (
            <HashRouter>
                <PageBoundary>
                    <div role="alert">
                        <Box marginBlock="6">
                            <Alert variant="warning">OBS - Dette er en test-versjon og ikke en reell søknad.</Alert>
                        </Box>
                    </div>
                </PageBoundary>
                {children}
            </HashRouter>
        );
    }
    return (
        <>
            {getIsVeilederDemo() && <VeilederDemoHeader />}
            <BrowserRouter basename={publicPath}>{children}</BrowserRouter>;
        </>
    );
};

export default AppRouter;
