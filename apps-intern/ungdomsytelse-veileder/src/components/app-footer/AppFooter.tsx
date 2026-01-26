import { BodyShort, Box, Link, Page, VStack } from '@navikt/ds-react';

const AppFooter = () => {
    return (
        <footer>
            <Box background="neutral-moderateA">
                <Page.Block gutters={true}>
                    <VStack gap="space-24" className="pt-6 pb-6">
                        <BodyShort>
                            Hvis du opplever feil med løsningen, kan du melde fra om dette{' '}
                            <Link
                                href="https://jira.adeo.no/plugins/servlet/desk/portal/541/create/6034"
                                target="_blank"
                                rel="noopener noreferrer">
                                i Porten
                            </Link>
                            .
                        </BodyShort>
                    </VStack>
                </Page.Block>
            </Box>
        </footer>
    );
};

export default AppFooter;
