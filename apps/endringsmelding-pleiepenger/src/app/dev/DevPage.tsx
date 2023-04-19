import { Button, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import React from 'react';
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

            <Block margin="xxl">
                <Heading level="3" size="medium" spacing={true}>
                    Aktiv brukerprofil (mockdata)
                </Heading>

                <Block margin="l">
                    <Link to="../melding/velkommen">Tilbake til endringsdialog</Link>
                </Block>
            </Block>
        </Page>
    );
};

export default DevPage;
