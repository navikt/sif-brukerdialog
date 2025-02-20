import { Alert, Box, Tabs } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '../../api/types';
import AvsluttDeltakelseForm from '../../forms/avslutt-deltakelse-form/AvsluttDeltakelseForm';
import DeltakelseStatusContent from '../deltakelse-status-content/DeltakelseStatusContent';
import EndreDeltakelseForm from '../../forms/endre-deltakelse-form/EndreDeltakelseForm';
import SlettDeltakelseForm from '../../forms/slett-deltakelse-form/SlettDeltakelseForm';
import DeltakelseOppgaver from '../deltakelse-oppgaver/DeltakelseOppgaver';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    alleDeltakelser: Deltakelse[];
    onChange: () => void;
}
const DeltakelseContent = ({ deltaker, deltakelse, alleDeltakelser, onChange }: Props) => {
    return (
        <Box className="pb-20">
            <Tabs defaultValue="status">
                <Tabs.List>
                    <Tabs.Tab value="status" label="Status" />
                    <Tabs.Tab value="oppgaver" label="Oppgaver til deltaker" />
                    {/* <Tabs.Tab value="endre" label="Endre periode" /> */}
                    <Tabs.Tab value="endreStartdato" label="Endre startdato" />
                    <Tabs.Tab value="endreSluttdato" label="Endre sluttdato" />
                    {deltakelse.harSøkt === false ? <Tabs.Tab value="slett" label="Slett periode" /> : null}
                </Tabs.List>
                <Tabs.Panel value="status">
                    <Box paddingBlock="8 0">
                        <DeltakelseStatusContent deltakelse={deltakelse} deltaker={deltaker} />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="oppgaver">
                    <Box paddingBlock="8 0">
                        <DeltakelseOppgaver oppgaver={deltakelse.oppgaver} />
                    </Box>
                </Tabs.Panel>
                {/* <Tabs.Panel value="endre">
                    <Box paddingBlock="8 0">
                        <EndreDeltakelseForm
                            variant="startOgSluttdato"
                            deltakelse={deltakelse}
                            deltakelser={alleDeltakelser}
                            onChange={onChange}
                        />
                    </Box>
                </Tabs.Panel> */}
                <Tabs.Panel value="endreStartdato">
                    <Box paddingBlock="8 0">
                        <EndreDeltakelseForm
                            header="Endre startdato"
                            description={
                                deltakelse.harSøkt ? (
                                    <Alert variant="info" inline={true}>
                                        Når startdato endres, opprettes en oppgave til deltaker hvor hen må bekrefte den
                                        nye startdatoen. Oppgaven vil også bli synlig for deg under fanen "Oppgaver til
                                        deltaker".
                                    </Alert>
                                ) : (
                                    <Alert variant="info" inline={true}>
                                        Deltaker har ikke søkt enda. Du kan endre startdatoen uten at det uløser blir
                                        noen oppgave til deltaker.
                                    </Alert>
                                )
                            }
                            variant="startdato"
                            deltakelse={deltakelse}
                            deltakelser={alleDeltakelser}
                            onChange={onChange}
                        />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="endreSluttdato">
                    <Box paddingBlock="8 0">
                        <EndreDeltakelseForm
                            header="Endre sluttdato"
                            description={
                                deltakelse.harSøkt ? (
                                    <Alert variant="info" inline={true}>
                                        Når sluttdato endres, opprettes en oppgave til deltaker hvor hen må bekrefte den
                                        nye sluttdatoen. Oppgaven vil også bli synlig for deg under fanen "Oppgaver til
                                        deltaker".
                                    </Alert>
                                ) : (
                                    <Alert variant="info" inline={true}>
                                        Deltaker har ikke søkt enda. Du kan endre sluttdato uten at det uløser blir noen
                                        oppgave til deltaker.
                                    </Alert>
                                )
                            }
                            variant="sluttdato"
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
        </Box>
    );
};

export default DeltakelseContent;
