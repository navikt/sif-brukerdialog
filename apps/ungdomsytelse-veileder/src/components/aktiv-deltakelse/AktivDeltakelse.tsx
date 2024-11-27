import { Accordion, Box, Heading, HGrid, List, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker } from '../../api/types';
import AvsluttDeltakelseForm from '../../forms/avslutt-deltakelse-form/AvsluttDeltakelseForm';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    alleDeltakelser: Deltakelse[];
    onChange: () => void;
}
const AktivDeltakelse = ({ deltakelse, alleDeltakelser, onChange }: Props) => {
    return (
        <HGrid columns={'auto 1fr'} gap="4" padding="4">
            <Box className="rounded bg-surface-action-subtle p-6 pr-12">
                <VStack gap="4">
                    <Heading level="2" size="small">
                        Aktiv deltakelse
                    </Heading>
                    <List size="small">
                        <List.Item>Startdato: {dateFormatter.compact(deltakelse.fraOgMed)}</List.Item>
                        <List.Item>
                            Sluttdato:{' '}
                            {deltakelse.tilOgMed ? dateFormatter.compact(deltakelse.tilOgMed) : <>Ikke satt</>}
                        </List.Item>
                        <List.Item>Søkt for: {deltakelse.harSøkt ? 'Ja' : 'Nei'}</List.Item>
                        <List.Item>Flere deltakelser: {alleDeltakelser.length > 1 ? 'Ja' : 'Nei'}</List.Item>
                    </List>
                </VStack>
            </Box>
            <Box className="p-6">
                <VStack>
                    <Heading level="2" size="small">
                        Handlinger
                    </Heading>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>1. Avslutt deltakelse</Accordion.Header>
                            <Accordion.Content>
                                <Box
                                    className="rounded-md bg-gray-100 p-8 items-center w-full"
                                    maxWidth={'30rem'}
                                    width={'100%'}>
                                    <AvsluttDeltakelseForm
                                        deltakelse={deltakelse}
                                        onDeltakelseAvsluttet={onChange}
                                        onCancel={() => console.log('avbryt')}
                                    />
                                </Box>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </VStack>
            </Box>
        </HGrid>
    );
};

export default AktivDeltakelse;
