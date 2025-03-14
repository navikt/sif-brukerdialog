import { Box, Heading, List, Tag, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker } from '@navikt/ung-common';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}
const DeltakelseStatusContent = ({ deltakelse }: Props) => {
    return (
        <VStack gap="4" className="rounded p-5 bg-gray-50">
            <Heading level="3" size="medium">
                Status
            </Heading>
            <List>
                <List.Item title="Deltaker har søkt">
                    <VStack gap="4">
                        <Box>
                            {deltakelse.harSøkt ? (
                                <Tag variant="success-moderate" size="small">
                                    Ja
                                </Tag>
                            ) : (
                                <Tag variant="warning-moderate" size="small">
                                    Nei
                                </Tag>
                            )}
                        </Box>
                    </VStack>
                </List.Item>
                <List.Item title="Startdato">{dateFormatter.compact(deltakelse.fraOgMed)}</List.Item>
                <List.Item title="Sluttdato">
                    {deltakelse.tilOgMed ? dateFormatter.compact(deltakelse.tilOgMed) : 'Ikke satt'}
                </List.Item>
                <List.Item title="Antall dager brukt">X av Y dager brukt</List.Item>
            </List>
        </VStack>
    );
};

export default DeltakelseStatusContent;
