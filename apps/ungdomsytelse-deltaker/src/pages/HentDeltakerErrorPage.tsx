import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

import Feilside from './Feilside';

interface Props {
    error: string;
}

const HentDeltakerErrorPage = ({ error }: Props) => {
    return (
        <Feilside pageTitle="Det oppstod en feil" bannerTitle="Søknad om ungdomsprogramytelse">
            <SifGuidePanel mood="uncertain">
                <Heading level="2" size="medium" spacing>
                    Det oppstod en feil under henting av informasjon
                </Heading>
                <Alert variant="error" inline>
                    <BodyShort>{error}</BodyShort>
                </Alert>
            </SifGuidePanel>
        </Feilside>
    );
};

export default HentDeltakerErrorPage;
