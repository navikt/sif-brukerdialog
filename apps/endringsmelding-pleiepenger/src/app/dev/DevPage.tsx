import { Button, Heading, ToggleGroup } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import React from 'react';
import { Link } from 'react-router-dom';

const DevPage = () => {
    const setMockUser = (user: string) => {
        localStorage.setItem('mockUser', user);
    };
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

                <ToggleGroup defaultValue={localStorage.getItem('mockUser') || 'soker1'} onChange={setMockUser}>
                    <ToggleGroup.Item value="soker1">Søker 1</ToggleGroup.Item>
                    <ToggleGroup.Item value="soker2">Søker 2</ToggleGroup.Item>
                    <ToggleGroup.Item value="soker3">Søker 3</ToggleGroup.Item>
                    <ToggleGroup.Item value="soker4">Søker 4</ToggleGroup.Item>
                    <ToggleGroup.Item value="soker5">Søker 5</ToggleGroup.Item>
                    <ToggleGroup.Item value="scenario1">Scenario 1</ToggleGroup.Item>
                    <ToggleGroup.Item value="scenario2">Scenario 2</ToggleGroup.Item>
                </ToggleGroup>
                <Block margin="l">
                    <Link to="../melding/velkommen">Tilbake til endringsdialog</Link>
                </Block>
            </Block>
        </Page>
    );
};

export default DevPage;
