import { BodyShort, Box, Heading, HGrid, List, Page } from '@navikt/ds-react';
import { NotFoundSVG } from './NotFoundSVG';

const NotFoundPage = () => {
    return (
        <Page>
            <Page.Block width="xl" gutters={true}>
                <main className="navds-pageblock navds-pageblock--xl navds-pageblock--gutter">
                    <Box padding="20" className="bg-gray-50">
                        <HGrid columns={2}>
                            <div>
                                <Heading level="1" size="xlarge" spacing={true}>
                                    Beklager, vi fant ikke siden
                                </Heading>

                                <BodyShort size="medium">
                                    Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                                </BodyShort>
                                <List>
                                    <List.Item>Bruk gjerne søket eller menyen</List.Item>
                                </List>
                            </div>
                            <NotFoundSVG />
                        </HGrid>
                    </Box>
                </main>
            </Page.Block>
        </Page>
    );
};

export default NotFoundPage;
