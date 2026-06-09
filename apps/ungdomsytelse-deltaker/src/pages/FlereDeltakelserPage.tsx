import { BodyLong, Box, Heading } from '@navikt/ds-react';
import { SifGuidePanel } from '@sif/soknad-ui';

import ErrorPage from './ErrorPage';

const FlereDeltakelserPage = () => (
    <ErrorPage pageTitle="Flere deltakelser" bannerTitle="Ungdomsprogramytelsen">
        <Box paddingBlock="space-0 space-96">
            <SifGuidePanel mood="uncertain">
                <Heading level="2" size="medium" spacing>
                    Oops, det oppstod en feil
                </Heading>
                <BodyLong>
                    Vi har registrert feilen og undersøker saken. Hvis problemet vedvarer, kan du kontakte veilederen
                    din.
                </BodyLong>
            </SifGuidePanel>
        </Box>
    </ErrorPage>
);

export default FlereDeltakelserPage;
