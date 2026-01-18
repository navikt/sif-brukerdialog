import { BodyShort, BoxNew, Link, Page, VStack } from '@navikt/ds-react';

const AppFooter = () => {
    return (
        <footer>
            <BoxNew background="neutral-moderateA">
                <Page.Block gutters={true}>
                    <VStack gap="6" className="pt-6 pb-6">
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
            </BoxNew>
        </footer>
    );
};

export default AppFooter;
