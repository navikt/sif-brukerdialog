import { BodyShort, Box, Heading, Label, Link, List, Table, Tabs, Tag, VStack } from '@navikt/ds-react';
import { OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

import { Lovlenke, OPPGAVE_LOVVERK } from '../../../config/oppgaveLovverk';
import { PanelPreviewWrapper } from '../../../storybook/storyUtils';
import { renderAvvikRegisterinntektAlleStater } from '../avvik-registerinntekt/AvvikRegisterinntektOppgavePanel.preview';
import { renderBostedVilkårAlleStater } from '../bostedsvilkar/BostedVilkarOppgavePanel.preview';
import { renderBostedVilkårOpphørAlleStater } from '../bostedsvilkar-opphor/BostedVilkarOpphørOppgavePanel.preview';
import { renderEndretStartOgSluttdatoAlleStater } from '../endret-start-og-sluttdato/EndretStartOgSluttdatoOppgavePanel.preview';
import { renderEndretStartdatoAlleStater } from '../endret-startdato/EndretStartdatoOppgavePanel.preview';
import { renderEndretSluttdatoAlleStater } from '../endret-sluttdato/EndretSluttdatoOppgavePanel.preview';
import { renderFjernetPeriodeAlleStater } from '../fjernet-periode/FjernetPeriodeOppgavePanel.preview';
import { renderMeldtUtAlleStater } from '../meldt-ut/MeldtUtOppgavePanel.preview';
import { renderOpphorVedMaksdatoAlleStater } from '../opphor-ved-maksdato/OpphorVedMaksdatoOppgavePanel.preview';
import { renderRapporterInntektAlleStater } from '../rapporter-inntekt/RapporterInntektOppgavePanel.preview';
import { renderSøkYtelseAlleStater } from '../sok-ytelse/SøkYtelseOppgavePanel.preview';

const meta: Meta = {
    title: 'Oppgaver/1. Oversikt',
    decorators: [],
};
export default meta;
type Story = StoryObj;

// ─── Typer ───────────────────────────────────────────────────────────────────

type MappingRad = {
    backendType: OppgaveType;
    betingelse?: string;
    parsedType: ParsedOppgavetype;
    ytelse: OppgaveYtelsetype[];
};

// ─── Mapping-data ─────────────────────────────────────────────────────────────

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
    { backendType: OppgaveType.SØK_YTELSE, parsedType: ParsedOppgavetype.SØK_YTELSE, ytelse: [UNGDOMSYTELSE] },
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

// ─── Gruppering ───────────────────────────────────────────────────────────────

type GruppertRad = {
    parsedType: ParsedOppgavetype;
    ytelse: OppgaveYtelsetype[];
    kilder: { backendType: OppgaveType; betingelse?: string }[];
};

const grupperteMappingRader: GruppertRad[] = (() => {
    const map = new Map<ParsedOppgavetype, GruppertRad>();
    for (const rad of mappingRader) {
        if (!map.has(rad.parsedType)) {
            map.set(rad.parsedType, { parsedType: rad.parsedType, ytelse: rad.ytelse, kilder: [] });
        }
        map.get(rad.parsedType)!.kilder.push({ backendType: rad.backendType, betingelse: rad.betingelse });
    }
    return [...map.values()].sort((a, b) => a.parsedType.localeCompare(b.parsedType, 'no'));
})();

const mappingGrupper = {
    ungdomsytelse: grupperteMappingRader.filter((r) => r.ytelse.length === 1 && r.ytelse[0] === UNGDOMSYTELSE),
    aktivitetspenger: grupperteMappingRader.filter((r) => r.ytelse.length === 1 && r.ytelse[0] === AKTIVITETSPENGER),
    felles: grupperteMappingRader.filter((r) => r.ytelse.length > 1),
};

// ─── Komponenter ──────────────────────────────────────────────────────────────

const PANEL_PREVIEW: Partial<Record<ParsedOppgavetype, React.ReactNode>> = {
    [ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO]: (
        <PanelPreviewWrapper>{renderEndretStartdatoAlleStater()}</PanelPreviewWrapper>
    ),
    [ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO]: (
        <PanelPreviewWrapper>{renderEndretSluttdatoAlleStater()}</PanelPreviewWrapper>
    ),
    [ParsedOppgavetype.BEKREFT_MELDT_UT]: <PanelPreviewWrapper>{renderMeldtUtAlleStater()}</PanelPreviewWrapper>,
    [ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO]: (
        <PanelPreviewWrapper>{renderEndretStartOgSluttdatoAlleStater()}</PanelPreviewWrapper>
    ),
    [ParsedOppgavetype.BEKREFT_FJERNET_PERIODE]: (
        <PanelPreviewWrapper>{renderFjernetPeriodeAlleStater()}</PanelPreviewWrapper>
    ),
    [ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO]: (
        <PanelPreviewWrapper>{renderOpphorVedMaksdatoAlleStater()}</PanelPreviewWrapper>
    ),
    [ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT]: (
        <PanelPreviewWrapper>{renderAvvikRegisterinntektAlleStater()}</PanelPreviewWrapper>
    ),
    [ParsedOppgavetype.RAPPORTER_INNTEKT]: (
        <PanelPreviewWrapper>{renderRapporterInntektAlleStater()}</PanelPreviewWrapper>
    ),
    [ParsedOppgavetype.SØK_YTELSE]: <PanelPreviewWrapper>{renderSøkYtelseAlleStater()}</PanelPreviewWrapper>,
    [ParsedOppgavetype.BEKREFT_BOSTED]: <PanelPreviewWrapper>{renderBostedVilkårAlleStater()}</PanelPreviewWrapper>,
    [ParsedOppgavetype.BEKREFT_BOSTED_OPPHØR]: (
        <PanelPreviewWrapper>{renderBostedVilkårOpphørAlleStater()}</PanelPreviewWrapper>
    ),
};

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

const MappingTabell = ({ rader }: { rader: GruppertRad[] }) => (
    <Table zebraStripes>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>ParsedOppgavetype</Table.HeaderCell>
                <Table.HeaderCell>Backend OppgaveType(er)</Table.HeaderCell>
                <Table.HeaderCell>Ytelse</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {rader.map((rad) => {
                const backendType = rad.kilder[0].backendType;
                const ytelseMap = OPPGAVE_LOVVERK[backendType] ?? {};
                const lenker = rad.ytelse.flatMap((y) => ytelseMap[y] ?? []);
                return (
                    <Table.ExpandableRow
                        key={rad.parsedType}
                        content={
                            <VStack gap="space-24">
                                {lenker.length > 0 && (
                                    <VStack gap="space-4">
                                        <Heading level="4" size="xsmall">
                                            Lovhenvisninger
                                        </Heading>
                                        <List size="small">
                                            {lenker.map((lenke) => (
                                                <List.Item key={lenke.url}>
                                                    <LenkeEllerTodo lenke={lenke} />
                                                </List.Item>
                                            ))}
                                        </List>
                                    </VStack>
                                )}
                                <VStack gap="space-4">
                                    {PANEL_PREVIEW[rad.parsedType] ?? (
                                        <BodyShort
                                            size="small"
                                            style={{ fontStyle: 'italic', color: 'var(--a-text-subtle)' }}>
                                            Forhåndsvisning ikke implementert ennå
                                        </BodyShort>
                                    )}
                                </VStack>
                            </VStack>
                        }>
                        <Table.DataCell width={'20%'}>
                            <KodeTag>{rad.parsedType}</KodeTag>
                        </Table.DataCell>
                        <Table.DataCell width={'50%'}>
                            <VStack gap="space-2">
                                {rad.kilder.map((kilde, i) => (
                                    <BodyShort key={i} size="small">
                                        <KodeTag>{kilde.backendType}</KodeTag>
                                        {kilde.betingelse && (
                                            <span style={{ color: 'var(--a-text-subtle)' }}> — {kilde.betingelse}</span>
                                        )}
                                    </BodyShort>
                                ))}
                            </VStack>
                        </Table.DataCell>
                        <Table.DataCell width={'30%'}>
                            <VStack gap="space-2">
                                {rad.ytelse.map((y) => (
                                    <YtelseTag key={y} ytelse={y} />
                                ))}
                            </VStack>
                        </Table.DataCell>
                    </Table.ExpandableRow>
                );
            })}
        </Table.Body>
    </Table>
);

const YtelseTag = ({ ytelse }: { ytelse: OppgaveYtelsetype }) => (
    <span>
        <Tag variant={ytelse === OppgaveYtelsetype.UNGDOMSYTELSE ? 'alt1' : 'alt3'} size="xsmall">
            {ytelse}
        </Tag>
    </span>
);

const LenkeEllerTodo = ({ lenke }: { lenke: Lovlenke }) =>
    lenke.url.includes('#todo') ? (
        <span style={{ color: 'var(--a-text-warning)', fontStyle: 'italic' }}>{lenke.tekst} — TODO: lenke mangler</span>
    ) : (
        <Link href={lenke.url} rel="noopener noreferrer" target="_blank">
            {lenke.tekst}
        </Link>
    );

type YtelseFilter = 'alle' | OppgaveYtelsetype;

const TabInnhold = ({ filter }: { filter: YtelseFilter }) => {
    const visUpy = filter === 'alle' || filter === UNGDOMSYTELSE;
    const visAp = filter === 'alle' || filter === AKTIVITETSPENGER;
    return (
        <Box background="neutral-softA" borderRadius="16" marginBlock="space-12">
            <VStack gap="space-32" padding="space-32">
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
        </Box>
    );
};

// ─── Story ────────────────────────────────────────────────────────────────────

export const Oversikt: Story = {
    name: 'Oppgavetyper og lovverk',
    render: () => (
        <VStack gap="space-24">
            <VStack gap="space-8">
                <Heading level="1" size="large">
                    Oppgavetyper — helhetsoversikt
                </Heading>
                <BodyShort>
                    Oversikt over sammenhengen mellom backend-oppgavetyper (<KodeTag>OppgaveType</KodeTag>), parsede
                    oppgavetyper (<KodeTag>ParsedOppgavetype</KodeTag>) og lovhenvisninger som vises til bruker.
                </BodyShort>
            </VStack>

            <VStack gap="space-4">
                <Label>Flyt</Label>
                <BodyShort>
                    <KodeTag>OppgaveType (backend)</KodeTag> → <KodeTag>parseOppgaver()</KodeTag> →{' '}
                    <KodeTag>ParsedOppgavetype</KodeTag> → Oppgavepanel
                </BodyShort>
            </VStack>

            <VStack gap="space-4">
                <Heading level="2" size="medium">
                    Mapping: OppgaveType → ParsedOppgavetype
                </Heading>
                <BodyShort size="small">
                    <KodeTag>BEKREFT_ENDRET_PERIODE</KodeTag> og <KodeTag>BEKREFT_ENDRET_SLUTTDATO</KodeTag> splitter
                    til ulike <KodeTag>ParsedOppgavetype</KodeTag> basert på innholdet i{' '}
                    <KodeTag>oppgavetypeData</KodeTag>.
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
    ),
};
