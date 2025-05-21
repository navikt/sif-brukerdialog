import { BodyShort, Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { ErrorPage } from '@navikt/sif-common-soknad-ds/src';

const IngenDeltakelsePage = () => (
    <ErrorPage
        pageTitle="Deltakelse ikke funnet"
        bannerTitle="Ungdomsprogramytelse"
        contentRenderer={() => {
            return (
                <SifGuidePanel mood="uncertain">
                    <Heading level="2" size="medium">
                        Deltaker ikke funnet
                    </Heading>
                    <BodyShort>
                        Vi ser ikke at du registrert som deltaker i ungdomsprogrammet. Hvis du akkurat er meldt inn av
                        din veileder, kan det ta litt tid før du får tilgang til søknaden. Hvis dette ikke hjelper, kan
                        du ta kontakt med din veileder.
                    </BodyShort>
                </SifGuidePanel>
            );
        }}
    />
);

export default IngenDeltakelsePage;
