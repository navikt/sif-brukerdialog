import { Alert, BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';
import ErrorPage from './ErrorPage';

interface Props {
    error: string;
}

const AppErrorPage = ({ error }: Props) => {
    const resetMockScenario = () => {
        store.setScenario(ScenarioType.søknad);
        globalThis.location.reload();
    };

    return (
        <ErrorPage pageTitle="Det oppstod en feil" bannerTitle="Aktivitetspenger">
            <SifGuidePanel mood="uncertain">
                <Heading level="2" size="medium" spacing>
                    Det oppstod en feil under henting av informasjon
                </Heading>
                <Alert variant="error" inline>
                    <BodyShort>{error}</BodyShort>
                </Alert>
                {__IS_VEILEDER_DEMO__ && (
                    <Box marginBlock="space-40 space-0">
                        <Button size="small" type="button" onClick={resetMockScenario}>
                            Reset mockdata
                        </Button>
                    </Box>
                )}
            </SifGuidePanel>
        </ErrorPage>
    );
};

export default AppErrorPage;
