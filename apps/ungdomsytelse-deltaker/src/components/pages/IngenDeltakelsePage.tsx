import { Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { ErrorPage } from '@navikt/sif-common-soknad-ds/src';

interface Props {}

const IngenDeltakelsePage = ({}: Props) => (
    <ErrorPage
        pageTitle="Deltakelse ikke funnet"
        bannerTitle="Ungdomsytelse"
        contentRenderer={() => {
            return (
                <SifGuidePanel mood="uncertain">
                    <Heading level="2" size="medium">
                        Deltaker ikke funnet eller ingen deltakelser
                    </Heading>
                </SifGuidePanel>
            );
        }}
    />
);

export default IngenDeltakelsePage;
