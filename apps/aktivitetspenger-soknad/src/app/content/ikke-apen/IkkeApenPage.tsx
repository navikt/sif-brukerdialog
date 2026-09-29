import { VStack } from '@navikt/ds-react';
import { ApplicationPage, SifInfoCard } from '@sif/soknad-ui';

export const IkkeÅpenPage = () => {
    return (
        <ApplicationPage applicationTitle="Tjeneste ikke tilgjengelig" headerLevel="1">
            <VStack gap="space-32">
                <SifInfoCard>Denne tjenesten er ikke tilgjengelig.</SifInfoCard>
            </VStack>
        </ApplicationPage>
    );
};
