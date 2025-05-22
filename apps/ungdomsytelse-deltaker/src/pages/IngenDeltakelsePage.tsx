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
                    <Heading level="2" size="medium" spacing>
                        Deltaker ikke funnet
                    </Heading>
                    <BodyShort>
                        Vi finner deg ikke registrert som deltaker i ungdomsprogrammet. Hvis du nettopp er blitt meldt
                        inn av veilederen din, kan det ta litt tid før du får tilgang til søknaden. Hvis problemet
                        vedvarer, kan du ta kontakt med veilederen din.
                    </BodyShort>
                </SifGuidePanel>
            );
        }}
    />
);

export default IngenDeltakelsePage;
