import { BodyLong, Box, Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

import Feilside from './Feilside';

const IngenDeltakelsePage = () => (
    <Feilside pageTitle="Deltakelse ikke funnet" bannerTitle="Ungdomsprogramytelsen">
        <Box paddingBlock="0 24">
            <SifGuidePanel mood="uncertain">
                <Heading level="2" size="medium" spacing>
                    Deltakelse ikke funnet
                </Heading>
                <BodyLong>
                    Du er ikke registrert som deltaker i ungdomsprogrammet. Hvis du nettopp er blitt meldt inn av
                    veilederen din, kan det ta litt tid før du får tilgang til søknaden. Hvis problemet vedvarer, kan du
                    ta kontakt med veilederen din.
                </BodyLong>
            </SifGuidePanel>
        </Box>
    </Feilside>
);

export default IngenDeltakelsePage;
