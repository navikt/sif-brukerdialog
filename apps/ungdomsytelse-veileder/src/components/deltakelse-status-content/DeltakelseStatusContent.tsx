import { Box, Heading, List, Tag, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '../../api/types';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}
const DeltakelseStatusContent = ({ deltakelse }: Props) => {
    return (
        <Box>
            <Heading level="2" size="medium">
                Status for deltakerperiode
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
                    {deltakelse.tilOgMed ? dateFormatter.compact(deltakelse.tilOgMed) : '-'}
                </List.Item>
            </List>
        </Box>
    );
};

export default DeltakelseStatusContent;
