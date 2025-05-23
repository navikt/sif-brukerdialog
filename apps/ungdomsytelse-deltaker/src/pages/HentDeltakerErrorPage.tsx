import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { ErrorPage } from '@navikt/sif-common-soknad-ds/src';

interface Props {
    error: string;
}

const HentDeltakerErrorPage = ({ error }: Props) => {
    return (
        <ErrorPage
            pageTitle="Det oppstod en feil"
            bannerTitle="Søknad om ungdomsprogramytelse"
            contentRenderer={() => {
                return (
                    <SifGuidePanel mood="uncertain">
                        <Heading level="2" size="medium" spacing>
                            Det oppstod en feil under henting av informasjon
                        </Heading>
                        <Alert variant="error" inline>
                            <BodyShort>{error}</BodyShort>
                        </Alert>
                    </SifGuidePanel>
                );
            }}
        />
    );
};

export default HentDeltakerErrorPage;
