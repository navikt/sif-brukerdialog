import {
    Bleed,
    BodyLong,
    Box,
    Checkbox,
    CheckboxGroup,
    List,
    Radio,
    RadioGroup,
    ReadMore,
    Table,
    Tabs,
    VStack,
} from '@navikt/ds-react';

import GruppertSjekkliste from './GruppertSjekkliste';

const Sjekkliste = () => {
    return (
        <Tabs defaultValue="gruppertListe">
            <Tabs.List>
                <Tabs.Tab value="tabell" label="Tabell" />
                <Tabs.Tab value="liste" label="Liste" />
                <Tabs.Tab value="gruppertListe" label="Gruppert Liste" />
            </Tabs.List>
            <Tabs.Panel value="tabell">
                <Box padding="6">
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.DataCell></Table.DataCell>
                                <Table.HeaderCell scope="col">Krav</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Start</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.DataCell>
                                    <Checkbox hideLabel aria-labelledby="header">
                                        {' '}
                                    </Checkbox>
                                </Table.DataCell>
                                <Table.HeaderCell scope="row">
                                    <span id="header">Skal ja</span>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Box>
            </Tabs.Panel>
            <Tabs.Panel value="liste">
                <Box padding="6">
                    <VStack gap="6">
                        <CheckboxGroup legend="Sjekkliste for deltakelse">
                            <Checkbox name="check" value="alder18">
                                Har fylt 18 år når deltakelsen starter
                            </Checkbox>
                            <Checkbox name="check" value="alder29">
                                Har ikke fylt 29 år når deltakelsen starter
                            </Checkbox>
                            <Checkbox name="check" value="bistand">
                                Har behov for bistand fra Nav for å komme i arbeid
                            </Checkbox>
                            <VStack>
                                <Checkbox name="check" value="nødvendig">
                                    Deltakelsen er nødvendig og hensiktsmessig for å komme i arbeid
                                </Checkbox>
                                <Bleed marginBlock="1 0">
                                    <Box marginInline="8 0">
                                        <ReadMore header="Les mer om krav til deltakelse">
                                            <VStack gap="4">
                                                <BodyLong>
                                                    Punkter som gir eksempler på hvem som ikke kan tas inn (eks: har lån
                                                    og stipend fra lånekassen mm mm)
                                                </BodyLong>
                                                <List>
                                                    <List.Item>Har lån og stipend fra lånekassen</List.Item>
                                                    <List.Item>Har skjult formue på Barbados</List.Item>
                                                </List>
                                            </VStack>
                                        </ReadMore>
                                    </Box>
                                </Bleed>
                            </VStack>

                            <VStack>
                                <Checkbox name="check" value="fulltid">
                                    Kan delta på fulltid
                                </Checkbox>
                                <Bleed marginBlock="1 0">
                                    <Box marginInline="8 0">
                                        <ReadMore header="Les mer om krav til deltakelse">
                                            <VStack gap="4">
                                                <BodyLong>
                                                    Punkter som gir eksempler på hvem som ikke kan delta på full tid
                                                    (eks: mottar sykepenger, pleiepenger)
                                                </BodyLong>
                                                <List>
                                                    <List.Item>Mottar sykepenger, pleiepenger</List.Item>
                                                    <List.Item>Har skjult formue på Barbados</List.Item>
                                                </List>
                                            </VStack>
                                        </ReadMore>
                                    </Box>
                                </Bleed>
                            </VStack>
                            <Checkbox name="check" value="tidligereDeltakelse">
                                Har ikke tidligere deltatt i ungdomsprogrammet
                            </Checkbox>
                            <Checkbox name="check" value="tidligereDeltakelse">
                                Ønsker å delta i ungdomsprogrammet
                            </Checkbox>
                        </CheckboxGroup>

                        <RadioGroup legend="Mottar andre livsoppholdsytelser fra Nav?">
                            <Radio name="livsoppholdystelser" value="nei">
                                Nei
                            </Radio>
                            <Radio name="livsoppholdystelser" value="økonomisk">
                                Ja, økononomisk bistand
                            </Radio>
                            <Radio name="livsoppholdsytelser" value="livsoppholdsytelse">
                                Ja, livsoppholdsytelse
                            </Radio>
                        </RadioGroup>

                        <RadioGroup
                            legend="Skal annen livsoppholdsytelse stanses"
                            description="Skal denne livsoppholdsytelsen stanses slik at tom dato kan settes etter annen livsoppholdsytelse har stanset?">
                            <VStack>
                                <Radio name="stanses" value="ja">
                                    Ja
                                </Radio>
                                <Bleed marginBlock="1 0">
                                    <Box marginInline="8 0">
                                        <ReadMore header="Om andre livsoppholdsytelser">sdf</ReadMore>
                                    </Box>
                                </Bleed>
                            </VStack>
                            <Radio name="stanses" value="nei">
                                Nei
                            </Radio>
                        </RadioGroup>
                    </VStack>
                </Box>
            </Tabs.Panel>
            <Tabs.Panel value="gruppertListe">
                <Box padding="6">
                    <GruppertSjekkliste
                        onChange={(flag) => {
                            console.log(flag);
                        }}
                    />
                </Box>
            </Tabs.Panel>
        </Tabs>
    );
};

export default Sjekkliste;
