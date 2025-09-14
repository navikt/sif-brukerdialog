import { Button, Heading, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Link } from 'react-router-dom';

const DevPage = () => {
    return (
        <Page title="Teknisk">
            <Heading level="1" size="large" spacing={true}>
                Teknisk
            </Heading>
            <Heading level="2" size="medium" spacing={true}>
                Mellomlagring
            </Heading>

            <Button
                type="button"
                onClick={() => {
                    localStorage.clear();
                }}>
                Tøm mellomlagring
            </Button>

            <VStack marginBlock="10">
                <Heading level="3" size="medium" spacing={true}>
                    Aktiv brukerprofil (mockdata)
                </Heading>
                <div>
                    <Link to="../melding/velkommen">Tilbake til endringsdialog</Link>
                </div>
            </VStack>
        </Page>
    );
};

export default DevPage;
