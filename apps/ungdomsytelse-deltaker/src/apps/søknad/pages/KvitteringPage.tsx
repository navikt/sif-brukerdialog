import { Alert, BodyLong, Button, Heading, List, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SøknadHeader from '../components/søknad-header/SøknadHeader';

const KvitteringPage = () => {
    return (
        <Page title="Kvittering">
            <VStack gap="8">
                <SøknadHeader tittel="Søknad om ungdomsytelse" />

                <Alert variant="success">
                    <Heading level="2" size="small" spacing>
                        Søknad er sendt!
                    </Heading>
                    <BodyLong>Vi har mottatt din søknad om ungdomsytelse.</BodyLong>
                </Alert>
                <div>
                    <Heading level="3" size="small" spacing>
                        Hva skjer videre?
                    </Heading>
                    <List>
                        <List.Item>Du vil få en SMS når søknaden din er ferdig behandlet.</List.Item>
                        <List.Item>
                            Hvis du starter å tjene penger mens du er i ungdomsprogrammet må du melde fra om dette
                            mellom 1.-7. hver måned. Du vil få en SMS og oppgave på min side når du kan melde ifra.
                        </List.Item>
                        <List.Item>Ungdomsytelsen utbetales som regel den 10. hver måned.</List.Item>
                    </List>
                </div>
                <BodyLong>Vi ønsker deg lykke til med veien videre!</BodyLong>

                <div>
                    <Button as="a" href="https://www.nav.no/minside">
                        Gå til Min side
                    </Button>
                </div>
            </VStack>
        </Page>
    );
};

export default KvitteringPage;
