import { Alert, BodyLong, Button, Heading, List, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SøknadHeader from '../components/søknad-header/SøknadHeader';
import getLenker from '../../../utils/lenker';

const KvitteringPage = () => {
    return (
        <Page title="Kvittering">
            <VStack gap="8">
                <SøknadHeader />

                <Alert variant="success">
                    <Heading level="2" size="small" spacing>
                        Søknaden er sendt!
                    </Heading>
                    <BodyLong>Vi har fått søknaden din om penger gjennom ungdomsprogramytelsen.</BodyLong>
                </Alert>
                <div>
                    <Heading level="3" size="small" spacing>
                        Hva skjer videre?
                    </Heading>
                    <List>
                        <List.Item>
                            Du får en SMS når søknaden din er ferdig behandlet. Da kan du logge inn på Min side på
                            nav.no og se svaret på søknaden (vedtaket).
                        </List.Item>
                        <List.Item>Penger gjennom ungdomsprogramytelsen får du som regel den 10. hver måned.</List.Item>
                        <List.Item>
                            Hvis du tjener penger mens du er i ungdomsprogrammet, må du melde fra om dette. Du får en
                            SMS den 1. hver måned, og så logger du inn på Min side på nav.no og melder fra om hva du
                            tjente måneden før.
                        </List.Item>
                    </List>
                </div>
                <BodyLong>Vi ønsker deg lykke til med veien videre!</BodyLong>

                <div>
                    <Button as="a" href={getLenker().minSide}>
                        Gå til Min side
                    </Button>
                </div>
            </VStack>
        </Page>
    );
};

export default KvitteringPage;
