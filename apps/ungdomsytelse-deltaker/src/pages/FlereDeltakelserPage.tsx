import { BodyLong, Box, Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { ErrorPage } from '@navikt/sif-common-soknad-ds/src';

const FlereDeltakelserPage = () => (
    <ErrorPage
        pageTitle="Flere deltakelser"
        bannerTitle="Ungdomsprogramytelsen"
        contentRenderer={() => {
            return (
                <Box paddingBlock="0 24">
                    <SifGuidePanel mood="uncertain">
                        <Heading level="2" size="medium" spacing>
                            Oops, det oppstod en feil
                        </Heading>
                        <BodyLong>
                            Vi har registrert feilen og undersøker saken. Hvis problemet vedvarer, kan du kontakte
                            veilederen din.
                        </BodyLong>
                    </SifGuidePanel>
                </Box>
            );
        }}
    />
);

export default FlereDeltakelserPage;
