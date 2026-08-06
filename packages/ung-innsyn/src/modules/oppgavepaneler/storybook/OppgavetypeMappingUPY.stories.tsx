import { Bleed, BodyShort, Box, Heading, Link, List, Table, VStack } from '@navikt/ds-react';
import { OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Lovlenke, OPPGAVE_LOVVERK } from '../oppgaveLovverk';
import { PanelPreviewWrapper } from '../../../storybook/storyUtils';
import { renderAvvikRegisterinntektAlleStater } from '../avvik-registerinntekt/AvvikRegisterinntektOppgavePanel.preview';
import { renderEndretStartOgSluttdatoAlleStater } from '../endret-start-og-sluttdato/EndretStartOgSluttdatoOppgavePanel.preview';
import { renderEndretStartdatoAlleStater } from '../endret-startdato/EndretStartdatoOppgavePanel.preview';
import { renderEndretSluttdatoAlleStater } from '../endret-sluttdato/EndretSluttdatoOppgavePanel.preview';
import { renderFjernetPeriodeAlleStater } from '../fjernet-periode/FjernetPeriodeOppgavePanel.preview';
import { renderMeldtUtAlleStater } from '../meldt-ut/MeldtUtOppgavePanel.preview';
import { renderOpphorVedMaksdatoAlleStater } from '../opphor-ved-maksdato/OpphorVedMaksdatoOppgavePanel.preview';
import { renderRapporterInntektAlleStater } from '../rapporter-inntekt/RapporterInntektOppgavePanel.preview';
import { renderSøkYtelseAlleStater } from '../sok-ytelse/SøkYtelseOppgavePanel.preview';

const meta: Meta = {
    title: 'Oppgaver/1. Oversikt/Ungdomsytelse',
    decorators: [],
};
export default meta;
type Story = StoryObj;

// ─── Data ────────────────────────────────────────────────────────────────────

const { UNGDOMSYTELSE } = OppgaveYtelsetype;

type Rad = {
    parsedType: ParsedOppgavetype;
    kilder: { backendType: OppgaveType; betingelse?: string }[];
    preview: React.ReactNode;
};

const rader: Rad[] = [
    {
        parsedType: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
        kilder: [{ backendType: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT }],
        preview: <PanelPreviewWrapper>{renderAvvikRegisterinntektAlleStater()}</PanelPreviewWrapper>,
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
        kilder: [
            {
                backendType: OppgaveType.BEKREFT_ENDRET_PERIODE,
                betingelse: 'endringer = [ENDRET_STARTDATO, ENDRET_SLUTTDATO]',
            },
        ],
        preview: <PanelPreviewWrapper>{renderEndretStartOgSluttdatoAlleStater()}</PanelPreviewWrapper>,
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
        kilder: [
            { backendType: OppgaveType.BEKREFT_ENDRET_STARTDATO },
            { backendType: OppgaveType.BEKREFT_ENDRET_PERIODE, betingelse: 'endringer = [ENDRET_STARTDATO]' },
        ],
        preview: <PanelPreviewWrapper>{renderEndretStartdatoAlleStater()}</PanelPreviewWrapper>,
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
        kilder: [
            { backendType: OppgaveType.BEKREFT_ENDRET_SLUTTDATO, betingelse: 'forrigeSluttdato er satt' },
            {
                backendType: OppgaveType.BEKREFT_ENDRET_PERIODE,
                betingelse: 'endringer = [ENDRET_SLUTTDATO] + forrige finnes',
            },
        ],
        preview: <PanelPreviewWrapper>{renderEndretSluttdatoAlleStater()}</PanelPreviewWrapper>,
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE,
        kilder: [{ backendType: OppgaveType.BEKREFT_ENDRET_PERIODE, betingelse: 'endringer = [FJERNET_PERIODE]' }],
        preview: <PanelPreviewWrapper>{renderFjernetPeriodeAlleStater()}</PanelPreviewWrapper>,
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_MELDT_UT,
        kilder: [
            { backendType: OppgaveType.BEKREFT_ENDRET_SLUTTDATO, betingelse: 'forrigeSluttdato mangler' },
            {
                backendType: OppgaveType.BEKREFT_ENDRET_PERIODE,
                betingelse: 'endringer = [ENDRET_SLUTTDATO], ingen forrige',
            },
        ],
        preview: <PanelPreviewWrapper>{renderMeldtUtAlleStater()}</PanelPreviewWrapper>,
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO,
        kilder: [{ backendType: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO }],
        preview: <PanelPreviewWrapper>{renderOpphorVedMaksdatoAlleStater()}</PanelPreviewWrapper>,
    },
    {
        parsedType: ParsedOppgavetype.RAPPORTER_INNTEKT,
        kilder: [{ backendType: OppgaveType.RAPPORTER_INNTEKT }],
        preview: <PanelPreviewWrapper>{renderRapporterInntektAlleStater()}</PanelPreviewWrapper>,
    },
    {
        parsedType: ParsedOppgavetype.SØK_YTELSE,
        kilder: [{ backendType: OppgaveType.SØK_YTELSE }],
        preview: <PanelPreviewWrapper>{renderSøkYtelseAlleStater()}</PanelPreviewWrapper>,
    },
];

// ─── Komponenter ─────────────────────────────────────────────────────────────

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

// ─── Story ────────────────────────────────────────────────────────────────────

export const Oversikt: Story = {
    name: 'Ungdomsytelse',
    render: () => (
        <VStack gap="space-24">
            <VStack gap="space-8">
                <Heading level="1" size="large">
                    Oppgavetyper — Ungdomsytelse
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
                            const lenker = rad.kilder.flatMap(
                                (k) => OPPGAVE_LOVVERK[k.backendType]?.[UNGDOMSYTELSE] ?? [],
                            );
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
