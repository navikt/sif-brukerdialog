import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import Feilside from './Feilside';

const IngenSendSøknadOppgave = () => {
    return (
        <Feilside pageTitle="Det oppstod en feil" bannerTitle="Søknad om ungdomsprogramytelse">
            <SifGuidePanel mood="uncertain">
                <Heading level="2" size="medium" spacing>
                    Deltaker har ikke en aktiv sendSøknadOppgave
                </Heading>
                <Alert variant="error" inline>
                    <BodyShort>
                        Dette er på grunn av gamle testdata, og skal ikke oppstå for nye deltakere som meldes inn.
                    </BodyShort>
                </Alert>
            </SifGuidePanel>
        </Feilside>
    );
};

export default IngenSendSøknadOppgave;
