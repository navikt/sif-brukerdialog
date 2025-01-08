import { Box, Tabs } from '@navikt/ds-react';
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
        <>
            <Tabs defaultValue="status">
                <Tabs.List>
                    <Tabs.Tab value="status" label="Status" />
                    <Tabs.Tab value="endre" label="Endre periode" />
                    {deltakelse.harSøkt === false ? <Tabs.Tab value="slett" label="Slett periode" /> : null}
                </Tabs.List>
                <Tabs.Panel value="status">
                    <Box paddingBlock="8 0">
                        <DeltakelseStatusContent deltakelse={deltakelse} deltaker={deltaker} />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="endre">
                    <Box paddingBlock="8 0">
                        <EndreDeltakelseForm
                            deltakelse={deltakelse}
                            deltakelser={alleDeltakelser}
                            onChange={onChange}
                        />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="avslutt">
                    <Box padding="5" paddingBlock="8 0">
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
        </>
    );
};

export default DeltakelseContent;
