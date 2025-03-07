import { Heading, HStack, LinkPanel, VStack } from '@navikt/ds-react';
import { Deltakelse } from '@navikt/ung-common';

interface Props {
    deltakelse: Deltakelse;
}
const DeltakelseHandlinger = ({ deltakelse }: Props) => {
    console.log(deltakelse);
    return (
        <VStack gap="4">
            <Heading level="3" size="small">
                Handlinger
            </Heading>
            <HStack className="bg-gray-50 p-5 rounded-md" gap="4">
                <LinkPanel className="rounded-md" href="#" onClick={() => console.log('endre startdato')}>
                    <LinkPanel.Title className="text-large">Endre startdato</LinkPanel.Title>
                </LinkPanel>
                <LinkPanel className="rounded-md" href="#" onClick={() => console.log('endre sluttdato')}>
                    <LinkPanel.Title className="text-large">Endre sluttdato</LinkPanel.Title>
                </LinkPanel>
            </HStack>
        </VStack>
    );
};

export default DeltakelseHandlinger;
