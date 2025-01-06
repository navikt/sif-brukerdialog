import { Box, Heading, HStack, Tabs, Tag, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker } from '../../api/types';
import AvsluttDeltakelseForm from '../../forms/avslutt-deltakelse-form/AvsluttDeltakelseForm';
import DeltakelseStatusContent from '../deltakelse-status-content/DeltakelseStatusContent';
import EndreDeltakelseForm from '../../forms/endre-deltakelse-form/EndreDeltakelseForm';
import SlettDeltakelseForm from '../../forms/slett-deltakelse-form/SlettDeltakelseForm';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    alleDeltakelser: Deltakelse[];
    onChange: () => void;
}
const DeltakelseContent = ({ deltaker, deltakelse, alleDeltakelser, onChange }: Props) => {
    return (
        <Box className="rounded bg-gray-100 pb-10">
            <Box className=" p-3 pr-6 pl-6 border-b-2 border-b-gray-300">
                <VStack gap="4">
                    <HStack gap="4" justify={'space-between'} align="center">
                        <HStack gap="6" align="center">
                            <Heading level="2" size="medium">
                                Deltakerperiode
                            </Heading>
                            <HStack gap="2">
                                {deltakelse.harSøkt === false ? (
                                    <Tag variant="warning-moderate" size="small">
                                        Ikke søkt for
                                    </Tag>
                                ) : null}
                                {deltakelse.erAvsluttet ? (
                                    <Tag variant="warning-moderate" size="small">
                                        Avsluttet
                                    </Tag>
                                ) : null}
                                {deltakelse.erAktiv ? (
                                    <Tag variant="success-moderate" size="small">
                                        Aktiv
                                    </Tag>
                                ) : null}
                            </HStack>
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
                        {deltakelse.harSøkt === false ? <Tabs.Tab value="slett" label="Slett periode" /> : null}
                    </Tabs.List>
                    <Tabs.Panel value="status">
                        <Box padding="5" paddingBlock="8 8">
                            <DeltakelseStatusContent deltakelse={deltakelse} deltaker={deltaker} />
                        </Box>
                    </Tabs.Panel>
                    <Tabs.Panel value="endre">
                        <Box padding="5" paddingBlock="8 8">
                            <EndreDeltakelseForm
                                deltakelse={deltakelse}
                                deltakelser={alleDeltakelser}
                                onChange={onChange}
                            />
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
                            <SlettDeltakelseForm deltakelse={deltakelse} onDeltakelseSlettet={onChange} />
                        </Box>
                    </Tabs.Panel>
                </Tabs>
            </Box>
        </Box>
    );
};

export default DeltakelseContent;
