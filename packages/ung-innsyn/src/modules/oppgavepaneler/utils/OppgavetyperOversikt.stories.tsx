import { BodyShort, Box, Heading, Label, Link, List, Table, Tabs, Tag, VStack } from '@navikt/ds-react';
import { OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

import { Lovlenke, OPPGAVE_LOVVERK } from '../../../config/oppgaveLovverk';

const meta: Meta = {
    title: 'Oppgaver/1. Oversikt',
    decorators: [],
};
export default meta;

type Story = StoryObj;

type MappingRad = {
    backendType: OppgaveType;
    betingelse?: string;
    parsedType: ParsedOppgavetype;
    ytelse: OppgaveYtelsetype[];
};

type FieldDef = {
    name: string;
    type: string;
    description?: string;
};

const OPPGAVETYPEDATA_FELTER = {
    [ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT]: [
        { name: 'fraOgMed', type: 'ISODate', description: 'Periodens start' },
        { name: 'tilOgMed', type: 'ISODate', description: 'Periodens slutt' },
        { name: 'registerinntekt', type: 'RegisterinntektDto', description: 'Inntekt registrert fra Skatteetaten' },
        { name: 'gjelderDelerAvMåned', type: 'boolean', description: 'Om perioden kun gjelder deler av måneden' },
    ],
    [ParsedOppgavetype.BEKREFT_BOSTED]: [
        {
            name: 'periode',
            type: 'DateRange',
            description: '{ from: ISODate, to: ISODate } — perioden bostedvilkåret ikke er oppfylt',
        },
        { name: 'erBosattITrondheim', type: 'boolean', description: 'Om bruker er bosatt i Trondheim ifølge register' },
        {
            name: 'ikkeOppfyltÅrsak',
            type: 'string | undefined',
            description: 'Årsak til at bostedvilkåret ikke er oppfylt',
        },
        {
            name: 'ikkeOppfyltÅrsakFritekstbeskrivelse',
            type: 'string | undefined',
            description: 'Fritekstbeskrivelse av årsak',
        },
    ],
    [ParsedOppgavetype.BEKREFT_BOSTED_OPPHØR]: [
        { name: 'fom', type: 'ISODate', description: 'Dato fra og med opphøret gjelder' },
        { name: 'erBosattITrondheim', type: 'boolean', description: 'Om bruker er bosatt i Trondheim ifølge register' },
        {
            name: 'ikkeOppfyltÅrsak',
            type: 'string | undefined',
            description: 'Årsak til at bostedvilkåret ikke er oppfylt',
        },
        {
            name: 'ikkeOppfyltÅrsakFritekstbeskrivelse',
            type: 'string | undefined',
            description: 'Fritekstbeskrivelse av årsak',
        },
    ],
    [ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO]: [
        { name: 'forrigeStartdato', type: 'ISODate', description: 'Startdato før endringen' },
        { name: 'nyStartdato', type: 'ISODate', description: 'Ny startdato etter endringen' },
    ],
    [ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO]: [
        { name: 'forrigeSluttdato', type: 'ISODate', description: 'Sluttdato før endringen' },
        { name: 'nySluttdato', type: 'ISODate', description: 'Ny sluttdato etter endringen' },
    ],
    [ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO]: [
        {
            name: 'forrigePeriode',
            type: 'OpenDateRange',
            description: '{ from: ISODate, to?: ISODate } — periode før endring',
        },
        {
            name: 'nyPeriode',
            type: 'DateRange',
            description: '{ from: ISODate, to: ISODate } — ny periode etter endring',
        },
    ],
    [ParsedOppgavetype.BEKREFT_MELDT_UT]: [
        { name: 'sluttdato', type: 'ISODate', description: 'Dato bruker meldte seg ut' },
    ],
    [ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO]: [
        { name: 'maksdato', type: 'ISODate', description: 'Maksimal sluttdato for ytelsen' },
        { name: 'sluttdato', type: 'ISODate', description: 'Faktisk sluttdato ved opphør' },
    ],
    [ParsedOppgavetype.RAPPORTER_INNTEKT]: [
        { name: 'fraOgMed', type: 'ISODate', description: 'Rapporteringsperiodens start' },
        { name: 'tilOgMed', type: 'ISODate', description: 'Rapporteringsperiodens slutt' },
        { name: 'gjelderDelerAvMåned', type: 'boolean', description: 'Om perioden kun gjelder deler av måneden' },
    ],
    [ParsedOppgavetype.SØK_YTELSE]: [{ name: 'fomDato', type: 'ISODate', description: 'Dato søknadsperioden starter' }],
    [ParsedOppgavetype.BEKREFT_FJERNET_PERIODE]: [],
} satisfies Record<ParsedOppgavetype, FieldDef[]>;

const { UNGDOMSYTELSE, AKTIVITETSPENGER } = OppgaveYtelsetype;

const mappingRader: MappingRad[] = [
    {
        backendType: OppgaveType.BEKREFT_ENDRET_STARTDATO,
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
        ytelse: [UNGDOMSYTELSE],
    },
    {
        backendType: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
        betingelse: 'forrigeSluttdato er satt',
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
        ytelse: [UNGDOMSYTELSE],
    },
    {
        backendType: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
        betingelse: 'forrigeSluttdato mangler',
        parsedType: ParsedOppgavetype.BEKREFT_MELDT_UT,
        ytelse: [UNGDOMSYTELSE],
    },
    {
        backendType: OppgaveType.BEKREFT_ENDRET_PERIODE,
        betingelse: 'endringer = [ENDRET_STARTDATO]',
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
        ytelse: [UNGDOMSYTELSE],
    },
    {
        backendType: OppgaveType.BEKREFT_ENDRET_PERIODE,
        betingelse: 'endringer = [ENDRET_SLUTTDATO] + forrige finnes',
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
        ytelse: [UNGDOMSYTELSE],
    },
    {
        backendType: OppgaveType.BEKREFT_ENDRET_PERIODE,
        betingelse: 'endringer = [ENDRET_SLUTTDATO], ingen forrige',
        parsedType: ParsedOppgavetype.BEKREFT_MELDT_UT,
        ytelse: [UNGDOMSYTELSE],
    },
    {
        backendType: OppgaveType.BEKREFT_ENDRET_PERIODE,
        betingelse: 'endringer = [FJERNET_PERIODE]',
        parsedType: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE,
        ytelse: [UNGDOMSYTELSE],
    },
    {
        backendType: OppgaveType.BEKREFT_ENDRET_PERIODE,
        betingelse: 'endringer = [ENDRET_STARTDATO, ENDRET_SLUTTDATO]',
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
        ytelse: [UNGDOMSYTELSE],
    },
    {
        backendType: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
        parsedType: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
        ytelse: [UNGDOMSYTELSE, AKTIVITETSPENGER],
    },
    {
        backendType: OppgaveType.RAPPORTER_INNTEKT,
        parsedType: ParsedOppgavetype.RAPPORTER_INNTEKT,
        ytelse: [UNGDOMSYTELSE, AKTIVITETSPENGER],
    },
    {
        backendType: OppgaveType.SØK_YTELSE,
        parsedType: ParsedOppgavetype.SØK_YTELSE,
        ytelse: [UNGDOMSYTELSE],
    },
    {
        backendType: OppgaveType.BEKREFT_BOSTED,
        betingelse: 'oppgavetypeData.type = BOSTED',
        parsedType: ParsedOppgavetype.BEKREFT_BOSTED,
        ytelse: [AKTIVITETSPENGER],
    },
    {
        backendType: OppgaveType.BEKREFT_BOSTED,
        betingelse: 'oppgavetypeData.type = BOSTED_OPPHØR',
        parsedType: ParsedOppgavetype.BEKREFT_BOSTED_OPPHØR,
        ytelse: [AKTIVITETSPENGER],
    },
    {
        backendType: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
        parsedType: ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO,
        ytelse: [UNGDOMSYTELSE],
    },
];

const Kode = ({ children }: { children: React.ReactNode }) => (
    <code
        style={{
            fontSize: '0.8em',
            background: 'var(--a-surface-subtle)',
            padding: '1px 5px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
        }}>
        {children}
    </code>
);

const OppgavetypeDataDoc = ({ parsedType }: { parsedType: ParsedOppgavetype }) => {
    const felter = OPPGAVETYPEDATA_FELTER[parsedType];
    if (!felter || felter.length === 0) {
        return (
            <BodyShort size="small" style={{ color: 'var(--a-text-subtle)', fontStyle: 'italic' }}>
                Ingen oppgavetypeData
            </BodyShort>
        );
    }
    return (
        <Table size="small">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={{ width: '220px' }}>Felt</Table.HeaderCell>
                    <Table.HeaderCell style={{ width: '200px' }}>Type</Table.HeaderCell>
                    <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {felter.map((felt) => (
                    <Table.Row key={felt.name}>
                        <Table.DataCell>
                            <Kode>{felt.name}</Kode>
                        </Table.DataCell>
                        <Table.DataCell>
                            <Kode>{felt.type}</Kode>
                        </Table.DataCell>
                        <Table.DataCell>
                            <BodyShort size="small">{felt.description}</BodyShort>
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

// Partisjoner mappingRader i tre grupper etter ytelse
const mappingGrupper = {
    ungdomsytelse: mappingRader.filter((r) => r.ytelse.length === 1 && r.ytelse[0] === UNGDOMSYTELSE),
    aktivitetspenger: mappingRader.filter((r) => r.ytelse.length === 1 && r.ytelse[0] === AKTIVITETSPENGER),
    felles: mappingRader.filter((r) => r.ytelse.length > 1),
};

const MappingTabell = ({ rader }: { rader: MappingRad[] }) => {
    const sortert = [...rader].sort((a, b) => a.parsedType.localeCompare(b.parsedType, 'no'));
    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>ParsedOppgavetype</Table.HeaderCell>
                    <Table.HeaderCell>Backend OppgaveType</Table.HeaderCell>
                    <Table.HeaderCell>Betingelse i parseOppgaver()</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {sortert.map((rad, i) => (
                    <Table.ExpandableRow key={i} content={<OppgavetypeDataDoc parsedType={rad.parsedType} />}>
                        <Table.DataCell>
                            <Kode>{rad.parsedType}</Kode>
                        </Table.DataCell>
                        <Table.DataCell>
                            <Kode>{rad.backendType}</Kode>
                        </Table.DataCell>
                        <Table.DataCell>
                            {rad.betingelse ? (
                                <BodyShort size="small">{rad.betingelse}</BodyShort>
                            ) : (
                                <BodyShort size="small" style={{ color: 'var(--a-text-subtle)' }}>
                                    —
                                </BodyShort>
                            )}
                        </Table.DataCell>
                    </Table.ExpandableRow>
                ))}
            </Table.Body>
        </Table>
    );
};

type YtelseFilter = 'alle' | OppgaveYtelsetype;

const YtelseTag = ({ ytelse }: { ytelse: OppgaveYtelsetype }) => (
    <Tag variant={ytelse === OppgaveYtelsetype.UNGDOMSYTELSE ? 'alt1' : 'alt3'} size="xsmall">
        {ytelse}
    </Tag>
);

const LenkeEllerTodo = ({ lenke }: { lenke: Lovlenke }) =>
    lenke.url.includes('#todo') ? (
        <span style={{ color: 'var(--a-text-warning)', fontStyle: 'italic' }}>{lenke.tekst} — TODO: lenke mangler</span>
    ) : (
        <Link href={lenke.url} rel="noopener noreferrer" target="_blank">
            {lenke.tekst}
        </Link>
    );

const TabInnhold = ({ filter }: { filter: YtelseFilter }) => {
    const visUpy = filter === 'alle' || filter === UNGDOMSYTELSE;
    const visAp = filter === 'alle' || filter === AKTIVITETSPENGER;

    return (
        <Box background="neutral-softA" borderRadius="16" marginBlock="space-12">
            <VStack gap="space-32" padding={'space-32'}>
                {/* Mapping: gruppert per ytelse */}
                <VStack gap="space-32">
                    {visUpy && (
                        <VStack gap="space-8">
                            <Heading level="3" size="medium">
                                Ungdomsytelse
                            </Heading>
                            <MappingTabell rader={mappingGrupper.ungdomsytelse} />
                        </VStack>
                    )}

                    {visAp && (
                        <VStack gap="space-8">
                            <Heading level="3" size="medium">
                                Aktivitetspenger
                            </Heading>
                            <MappingTabell rader={mappingGrupper.aktivitetspenger} />
                        </VStack>
                    )}

                    <VStack gap="space-8">
                        <Heading level="3" size="medium">
                            Felles — Ungdomsytelse og Aktivitetspenger
                        </Heading>
                        <MappingTabell rader={mappingGrupper.felles} />
                    </VStack>
                </VStack>

                {/* Lovverk-tabell */}
                <VStack gap="space-8">
                    <VStack gap="space-4">
                        <Heading level="2" size="medium">
                            Lovhenvisninger per OppgaveType
                        </Heading>
                        <BodyShort size="small">
                            Generert fra <Kode>OPPGAVE_LOVVERK</Kode> i <Kode>src/config/oppgaveLovverk.ts</Kode>.
                            Oppdateres automatisk når konfigurasjonen endres.
                        </BodyShort>
                    </VStack>
                    <Table size="small" zebraStripes>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>OppgaveType</Table.HeaderCell>
                                <Table.HeaderCell>Ytelse</Table.HeaderCell>
                                <Table.HeaderCell>Lovhenvisninger</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Object.entries(OPPGAVE_LOVVERK).flatMap(([oppgavetype, ytelseMap]) =>
                                Object.entries(ytelseMap)
                                    .filter(([ytelse]) => filter === 'alle' || ytelse === filter)
                                    .map(([ytelse, lenker]) => (
                                        <Table.Row key={`${oppgavetype}-${ytelse}`}>
                                            <Table.DataCell>
                                                <Kode>{oppgavetype}</Kode>
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                <YtelseTag ytelse={ytelse as OppgaveYtelsetype} />
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                <List size="small">
                                                    {lenker.map((lenke) => (
                                                        <List.Item key={lenke.url}>
                                                            <LenkeEllerTodo lenke={lenke} />
                                                        </List.Item>
                                                    ))}
                                                </List>
                                            </Table.DataCell>
                                        </Table.Row>
                                    )),
                            )}
                        </Table.Body>
                    </Table>
                </VStack>
            </VStack>
        </Box>
    );
};

const OversiktPanel = () => (
    <VStack gap="space-24">
        <VStack gap="space-8">
            <Heading level="1" size="large">
                Oppgavetyper — helhetsoversikt
            </Heading>
            <BodyShort>
                Oversikt over sammenhengen mellom backend-oppgavetyper (<Kode>OppgaveType</Kode>), parsede oppgavetyper
                (<Kode>ParsedOppgavetype</Kode>) og lovhenvisninger som vises til bruker.
            </BodyShort>
        </VStack>

        <VStack gap="space-4">
            <Label>Flyt</Label>
            <BodyShort>
                <Kode>OppgaveType (backend)</Kode> → <Kode>parseOppgaver()</Kode> → <Kode>ParsedOppgavetype</Kode> →
                Oppgavepanel
            </BodyShort>
        </VStack>

        <VStack gap="space-4">
            <Heading level="2" size="medium">
                Mapping: OppgaveType → ParsedOppgavetype
            </Heading>
            <BodyShort size="small">
                <Kode>BEKREFT_ENDRET_PERIODE</Kode> og <Kode>BEKREFT_ENDRET_SLUTTDATO</Kode> splitter til ulike{' '}
                <Kode>ParsedOppgavetype</Kode> basert på innholdet i <Kode>oppgavetypeData</Kode>.
            </BodyShort>
        </VStack>

        <Tabs defaultValue="alle">
            <Tabs.List>
                <Tabs.Tab value="alle" label="Alle" />
                <Tabs.Tab value={UNGDOMSYTELSE} label="Ungdomsytelse" />
                <Tabs.Tab value={AKTIVITETSPENGER} label="Aktivitetspenger" />
            </Tabs.List>
            <Tabs.Panel value="alle">
                <TabInnhold filter="alle" />
            </Tabs.Panel>
            <Tabs.Panel value={UNGDOMSYTELSE}>
                <TabInnhold filter={UNGDOMSYTELSE} />
            </Tabs.Panel>
            <Tabs.Panel value={AKTIVITETSPENGER}>
                <TabInnhold filter={AKTIVITETSPENGER} />
            </Tabs.Panel>
        </Tabs>
    </VStack>
);

export const Oversikt: Story = {
    name: 'Oppgavetyper og lovverk',
    render: () => <OversiktPanel />,
};
