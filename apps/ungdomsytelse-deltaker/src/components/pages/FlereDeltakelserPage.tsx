import { Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { ErrorPage } from '@navikt/sif-common-soknad-ds/src';

const FlereDeltakelserPage = () => (
    <ErrorPage
        pageTitle="Flere deltakelser"
        bannerTitle="Ungdomsytelse"
        contentRenderer={() => {
            return (
                <SifGuidePanel mood="uncertain">
                    <Heading level="2" size="medium">
                        Flere deltakelser støttes ikke enda
                    </Heading>
                </SifGuidePanel>
            );
        }}
    />
);

export default FlereDeltakelserPage;
