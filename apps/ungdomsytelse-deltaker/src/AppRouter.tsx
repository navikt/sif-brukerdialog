import { Alert, Box } from '@navikt/ds-react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { getRequiredEnv } from '@navikt/sif-common-env';

/** __IS_GITHUB_PAGES__ settes til true i vite-demo-config */
const getIsGithubPages = () => __IS_GITHUB_PAGES__;

const AppRouter = ({ children }: { children: React.ReactNode }) => {
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
                {children}
            </HashRouter>
        );
    }
    return <BrowserRouter basename={publicPath}>{children}</BrowserRouter>;
};

export default AppRouter;
