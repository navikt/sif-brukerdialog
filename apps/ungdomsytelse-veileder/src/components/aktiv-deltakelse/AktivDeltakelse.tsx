import { Box, Heading, HStack, Tabs, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker } from '../../api/types';
import AvsluttDeltakelseForm from '../../forms/avslutt-deltakelse-form/AvsluttDeltakelseForm';
import DeltakelseStatusContent from '../deltakelse-status-content/DeltakelseStatusContent';
import DeltakelseStatusTag from '../deltakelse-status-tag/DeltakelseStatusTag';
import EndreDeltakelseForm from '../../forms/endre-deltakelse-form/EndreDeltakelseForm';
import SlettDeltakelseForm from '../../forms/slett-deltakelse-form/SlettDeltakelseForm';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    alleDeltakelser: Deltakelse[];
    onChange: () => void;
}
const AktivDeltakelse = ({ deltaker, deltakelse, alleDeltakelser, onChange }: Props) => {
    return (
        <Box className="rounded bg-gray-100">
            <Box className=" p-3 pr-6 pl-6 border-b-2 border-b-gray-300">
                <VStack gap="4">
                    <HStack gap="4" justify={'space-between'} align="center">
                        <HStack gap="4" align="center">
                            <Heading level="2" size="medium">
                                Deltakerperiode
                            </Heading>
                            <DeltakelseStatusTag deltakelse={deltakelse} />
                        </HStack>
                        <HStack gap="4">
                            <Box>Startdato: {dateFormatter.compact(deltakelse.fraOgMed)}</Box>
                            <Box>
                                Sluttdato: {deltakelse.tilOgMed ? dateFormatter.compact(deltakelse.tilOgMed) : <>-</>}
                            </Box>
                        </HStack>
                    </HStack>
                </VStack>
            </Box>
            <Box className="p-6 bg-gray-50">
                <Tabs defaultValue="status">
                    <Tabs.List>
                        <Tabs.Tab value="status" label="Status" />
                        <Tabs.Tab value="endre" label="Endre periode" />
                        <Tabs.Tab value="avslutt" label="Avslutt periode" />
                        <Tabs.Tab value="slett" label="Slett periode" />
                    </Tabs.List>
                    <Tabs.Panel value="status">
                        <Box padding="5" paddingBlock="8 8">
                            <DeltakelseStatusContent deltakelse={deltakelse} deltaker={deltaker} />
                        </Box>
                    </Tabs.Panel>
                    <Tabs.Panel value="endre">
                        <Box padding="5" paddingBlock="8 8">
                            <EndreDeltakelseForm deltakelse={deltakelse} deltakelser={alleDeltakelser} />
                        </Box>
                    </Tabs.Panel>
                    <Tabs.Panel value="avslutt">
                        <Box padding="5" paddingBlock="8 8">
                            <AvsluttDeltakelseForm
                                deltakelse={deltakelse}
                                onDeltakelseAvsluttet={onChange}
                                onCancel={() => console.log('avbryt')}
                            />
                        </Box>
                    </Tabs.Panel>
                    <Tabs.Panel value="slett">
                        <Box padding="5" paddingBlock="8 8">
                            <SlettDeltakelseForm deltakelse={deltakelse} />
                        </Box>
                    </Tabs.Panel>
                </Tabs>
                {/* <VStack>
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
                </VStack> */}
            </Box>
        </Box>
    );
};

export default AktivDeltakelse;
