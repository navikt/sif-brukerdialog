import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';
import { Heading, InfoCard, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface Props {
    infoTittel: string;
    infoInnhold?: ReactNode;
    children?: ReactNode;
}

export const Kvittering = ({ infoTittel, infoInnhold, children }: Props) => {
    return (
        <VStack gap="space-40">
            <InfoCard data-color="success">
                <InfoCard.Message icon={<CheckmarkCircleFillIcon aria-hidden="true" color="#06893A" />}>
                    <VStack gap="space-16">
                        <Heading level="2" size="small">
                            {infoTittel}
                        </Heading>
                        {infoInnhold}
                    </VStack>
                </InfoCard.Message>
            </InfoCard>
            {children}
        </VStack>
    );
};

export default Kvittering;
