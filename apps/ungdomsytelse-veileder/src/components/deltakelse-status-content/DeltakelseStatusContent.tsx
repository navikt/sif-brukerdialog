import { Box, List, Tag, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '../../api/types';
import { dateFormatter } from '@navikt/sif-common-utils';
import DeltakelseOppgaveliste from '../deltakelse-oppgaveliste/DeltakelseOppgaveliste';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}
const DeltakelseStatusContent = ({ deltakelse }: Props) => {
    return (
        <Box>
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
                <List.Item title="Oppgaver til deltaker">
                    <DeltakelseOppgaveliste oppgaver={deltakelse.oppgaver} />
                </List.Item>
            </List>
        </Box>
    );
};

export default DeltakelseStatusContent;
