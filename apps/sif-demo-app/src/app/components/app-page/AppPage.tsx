import { Page, VStack } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
}

export const AppPage = ({ children }: Props) => (
    <Page>
        <Page.Block as="main" width="md" gutters>
            <VStack gap="space-24">{children}</VStack>
        </Page.Block>
    </Page>
);
