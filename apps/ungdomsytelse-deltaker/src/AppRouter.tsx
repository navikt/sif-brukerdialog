import { Alert, Box } from '@navikt/ds-react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { getRequiredEnv } from '@navikt/sif-common-env';
import DeltakerInfoLoader from './components/deltaker-info-loader/DeltakerInfoLoader';

/** __IS_GITHUB_PAGES__ settes til true i vite-demo-config */
const getIsGithubPages = () => __IS_GITHUB_PAGES__;

const AppRouter = () => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');
    const isGitHubPages = getIsGithubPages();

    if (isGitHubPages) {
        return (
            <HashRouter>
                <PageBoundary>
                    <Box marginBlock="6">
                        <Alert variant="warning">OBS - Dette er en test-versjon og ikke en reell søknad.</Alert>
                    </Box>
                </PageBoundary>
                <DeltakerInfoLoader />
            </HashRouter>
        );
    }
    return (
        <BrowserRouter basename={publicPath}>
            <DeltakerInfoLoader />
        </BrowserRouter>
    );
};

export default AppRouter;
