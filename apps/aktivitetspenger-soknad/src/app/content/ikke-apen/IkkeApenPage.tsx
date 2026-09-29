import { InformationSquareIcon } from '@navikt/aksel-icons';
import { InfoCard, VStack } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui';

export const IkkeÅpenPage = () => {
    return (
        <ApplicationPage applicationTitle="Tjeneste ikke tilgjengelig" headerLevel="1">
            <VStack gap="space-32">
                <InfoCard>
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden="true" />}>
                        Denne tjenesten er ikke tilgjengelig.
                    </InfoCard.Message>
                </InfoCard>
            </VStack>
        </ApplicationPage>
    );
};
