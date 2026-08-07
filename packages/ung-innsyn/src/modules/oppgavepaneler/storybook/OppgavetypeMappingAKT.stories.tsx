import { Bleed, BodyShort, Box, Heading, Link, List, Table, VStack } from '@navikt/ds-react';
import { OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { PanelPreviewWrapper, renderOppgaveStandardStater } from '../../../storybook/storyUtils';
import { Lovlenke, OPPGAVE_LOVVERK } from '../oppgaveLovverk';
import { AvvikRegisterinntektOppgavePanel } from '../avvik-registerinntekt/AvvikRegisterinntektOppgavePanel';
import {
    inntektArbeidsgiver1,
    lagOppgaveMedInntekt,
    mockAvvikRegisterinntektAKT,
    mockAvvikRegisterinntektBesvartAKT,
} from '../avvik-registerinntekt/AvvikRegisterinntektOppgavePanel.mockData';
import { BostedVilkårOpphørOppgavePanel } from '../bostedsvilkar-opphor/BostedVilkarOpphorOppgavePanel';
import {
    mockBostedVilkårOpphørAKT,
    mockBostedVilkårOpphørBesvartAKT,
} from '../bostedsvilkar-opphor/BostedVilkarOpphorOppgavePanel.mockData';
import { BostedVilkårOppgavePanel } from '../bostedsvilkar/BostedVilkarOppgavePanel';
import { mockBostedVilkårAKT, mockBostedVilkårBesvartAKT } from '../bostedsvilkar/BostedVilkarOppgavePanel.mockData';
import { RapporterInntektOppgavePanel } from '../rapporter-inntekt/RapporterInntektOppgavePanel';
import {
    lagRapporterInntektOppgaveMedScenario,
    mockRapporterInntektAKT,
    mockRapporterInntektBesvartAKT,
} from '../rapporter-inntekt/RapporterInntektOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/1. Oversikt/Aktivitetspenger',
    decorators: [],
};
export default meta;
type Story = StoryObj;

const { AKTIVITETSPENGER } = OppgaveYtelsetype;

type Rad = {
    parsedType: ParsedOppgavetype;
    kilder: { backendType: OppgaveType; betingelse?: string }[];
    preview: React.ReactNode;
};

const rader: Rad[] = [
    {
        parsedType: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
        kilder: [{ backendType: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT }],
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockAvvikRegisterinntektAKT,
                    mockAvvikRegisterinntektBesvartAKT,
                    (oppgave, opts) => (
                        <AvvikRegisterinntektOppgavePanel
                            oppgave={lagOppgaveMedInntekt(oppgave, [inntektArbeidsgiver1])}
                            navn="SNODIG VAFFEL"
                            {...opts}
                        />
                    ),
                )}
            </PanelPreviewWrapper>
        ),
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_BOSTED,
        kilder: [{ backendType: OppgaveType.BEKREFT_BOSTED, betingelse: 'oppgavetypeData.type = BOSTED' }],
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockBostedVilkårAKT,
                    mockBostedVilkårBesvartAKT,
                    (oppgave, opts) => <BostedVilkårOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />,
                )}
            </PanelPreviewWrapper>
        ),
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_BOSTED_OPPHØR,
        kilder: [{ backendType: OppgaveType.BEKREFT_BOSTED, betingelse: 'oppgavetypeData.type = BOSTED_OPPHØR' }],
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockBostedVilkårOpphørAKT,
                    mockBostedVilkårOpphørBesvartAKT,
                    (oppgave, opts) => (
                        <BostedVilkårOpphørOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />
                    ),
                )}
            </PanelPreviewWrapper>
        ),
    },
    {
        parsedType: ParsedOppgavetype.RAPPORTER_INNTEKT,
        kilder: [{ backendType: OppgaveType.RAPPORTER_INNTEKT }],
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockRapporterInntektAKT,
                    mockRapporterInntektBesvartAKT,
                    (oppgave, opts) => (
                        <RapporterInntektOppgavePanel
                            oppgave={lagRapporterInntektOppgaveMedScenario(oppgave, 'Hel måned')}
                            navn="SNODIG VAFFEL"
                            initialKvitteringData={opts?.initialVisKvittering ? { harHattInntektOver0: true } : undefined}
                        />
                    ),
                )}
            </PanelPreviewWrapper>
        ),
    },
];

const KodeTag = ({ children }: { children: React.ReactNode }) => (
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

const LenkeEllerTodo = ({ lenke }: { lenke: Lovlenke }) =>
    lenke.url.includes('#todo') ? (
        <span style={{ color: 'var(--a-text-warning)', fontStyle: 'italic' }}>{lenke.tekst} — TODO: lenke mangler</span>
    ) : (
        <Link href={lenke.url} rel="noopener noreferrer" target="_blank">
            {lenke.tekst}
        </Link>
    );

export const Oversikt: Story = {
    name: 'Aktivitetspenger',
    render: () => (
        <VStack gap="space-24">
            <VStack gap="space-8">
                <Heading level="1" size="large">
                    Oppgavetyper — Aktivitetspenger
                </Heading>
                <BodyShort>
                    Oversikt over sammenhengen mellom backend-oppgavetyper (<KodeTag>OppgaveType</KodeTag>), parsede
                    oppgavetyper (<KodeTag>ParsedOppgavetype</KodeTag>) og lovhenvisninger. Ekspander en rad for å se
                    panelvisning og lovhenvisninger.
                </BodyShort>
            </VStack>
            <Box background="neutral-softA" borderRadius="16" padding="space-16">
                <Table zebraStripes>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>ParsedOppgavetype</Table.HeaderCell>
                            <Table.HeaderCell>Backend OppgaveType(er)</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {rader.map((rad) => {
                            const lenker = rad.kilder.flatMap((k) => OPPGAVE_LOVVERK[k.backendType]?.[AKTIVITETSPENGER] ?? []);
                            const unikeLenker = lenker.filter((l, i) => lenker.findIndex((x) => x.url === l.url) === i);
                            return (
                                <Table.ExpandableRow
                                    key={rad.parsedType}
                                    content={
                                        <Bleed marginInline="space-16 space-8">
                                            <Box background="default" borderRadius="2" padding="space-16">
                                                <VStack gap="space-24">
                                                    {unikeLenker.length > 0 && (
                                                        <VStack gap="space-4">
                                                            <Heading level="4" size="xsmall">
                                                                Lovhenvisninger
                                                            </Heading>
                                                            <List size="small">
                                                                {unikeLenker.map((lenke) => (
                                                                    <List.Item key={lenke.url}>
                                                                        <LenkeEllerTodo lenke={lenke} />
                                                                    </List.Item>
                                                                ))}
                                                            </List>
                                                        </VStack>
                                                    )}
                                                    {rad.preview}
                                                </VStack>
                                            </Box>
                                        </Bleed>
                                    }>
                                    <Table.DataCell width="25%">
                                        <KodeTag>{rad.parsedType}</KodeTag>
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        <VStack gap="space-2">
                                            {rad.kilder.map((k, i) => (
                                                <BodyShort key={i} size="small">
                                                    <KodeTag>{k.backendType}</KodeTag>
                                                    {k.betingelse && (
                                                        <span style={{ color: 'var(--a-text-subtle)' }}>
                                                            {' '}
                                                            — {k.betingelse}
                                                        </span>
                                                    )}
                                                </BodyShort>
                                            ))}
                                        </VStack>
                                    </Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Box>
        </VStack>
    ),
};
