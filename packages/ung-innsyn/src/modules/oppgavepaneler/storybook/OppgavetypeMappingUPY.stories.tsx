import { Bleed, BodyShort, Box, Heading, Link, List, Table, VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { useUngUiIntl } from '../../../i18n';
import { PanelPreviewWrapper, renderOppgaveStandardStater, StoryBox } from '../../../storybook/storyUtils';
import { Lovlenke, OPPGAVE_LOVVERK } from '../oppgaveLovverk';
import { AvvikRegisterinntektOppgavePanel } from '../avvik-registerinntekt/AvvikRegisterinntektOppgavePanel';
import {
    inntektArbeidsgiver1,
    lagOppgaveMedInntekt,
    mockAvvikRegisterinntektBesvartUPY,
    mockAvvikRegisterinntektUPY,
} from '../avvik-registerinntekt/AvvikRegisterinntektOppgavePanel.mockData';
import { EndretSluttdatoOppgavePanel } from '../endret-sluttdato/EndretSluttdatoOppgavePanel';
import { mockEndretSluttdatoBesvartUPY, mockEndretSluttdatoUPY } from '../endret-sluttdato/EndretSluttdatoOppgavePanel.mockData';
import { EndretStartOgSluttdatoOppgavePanel } from '../endret-start-og-sluttdato/EndretStartOgSluttdatoOppgavePanel';
import {
    mockEndretStartOgSluttdatoBesvartUPY,
    mockEndretStartOgSluttdatoUPY,
} from '../endret-start-og-sluttdato/EndretStartOgSluttdatoOppgavePanel.mockData';
import { mockEndretStartdatoBesvartUPY, mockEndretStartdatoUPY } from '../endret-startdato/EndretStartdatoOppgavePanel.mockData';
import { EndretStartdatoOppgavePanel } from '../endret-startdato/EndretStartdatoOppgavePanel';
import { FjernetPeriodeOppgavePanel } from '../fjernet-periode/FjernetPeriodeOppgavePanel';
import { mockFjernetPeriodeBesvartUPY, mockFjernetPeriodeUPY } from '../fjernet-periode/FjernetPeriodeOppgavePanel.mockData';
import { MeldtUtOppgavePanel } from '../meldt-ut/MeldtUtOppgavePanel';
import { mockMeldtUtBesvartUPY, mockMeldtUtUPY } from '../meldt-ut/MeldtUtOppgavePanel.mockData';
import { OpphorVedMaksdatoOppgavePanel } from '../opphor-ved-maksdato/OpphorVedMaksdatoOppgavePanel';
import { mockOpphorVedMaksdatoBesvartUPY, mockOpphorVedMaksdatoUPY } from '../opphor-ved-maksdato/OpphorVedMaksdatoOppgavePanel.mockData';
import { RapporterInntektOppgavePanel } from '../rapporter-inntekt/RapporterInntektOppgavePanel';
import {
    lagRapporterInntektOppgaveMedScenario,
    mockRapporterInntektBesvartUPY,
    mockRapporterInntektUPY,
} from '../rapporter-inntekt/RapporterInntektOppgavePanel.mockData';
import { SøkYtelseOppgavePanel } from '../sok-ytelse/SokYtelseOppgavePanel';
import { mockSøkYtelseBesvartUPY, mockSøkYtelseUPY } from '../sok-ytelse/SøkYtelseOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/1. Oversikt/Ungdomsytelse',
    decorators: [],
};
export default meta;
type Story = StoryObj;

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
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockAvvikRegisterinntektUPY,
                    mockAvvikRegisterinntektBesvartUPY,
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
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
        kilder: [
            {
                backendType: OppgaveType.BEKREFT_ENDRET_PERIODE,
                betingelse: 'endringer = [ENDRET_STARTDATO, ENDRET_SLUTTDATO]',
            },
        ],
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockEndretStartOgSluttdatoUPY,
                    mockEndretStartOgSluttdatoBesvartUPY,
                    (oppgave, opts) => (
                        <EndretStartOgSluttdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />
                    ),
                )}
            </PanelPreviewWrapper>
        ),
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
        kilder: [
            { backendType: OppgaveType.BEKREFT_ENDRET_STARTDATO },
            { backendType: OppgaveType.BEKREFT_ENDRET_PERIODE, betingelse: 'endringer = [ENDRET_STARTDATO]' },
        ],
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockEndretStartdatoUPY,
                    mockEndretStartdatoBesvartUPY,
                    (oppgave, opts) => <EndretStartdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />,
                )}
            </PanelPreviewWrapper>
        ),
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
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockEndretSluttdatoUPY,
                    mockEndretSluttdatoBesvartUPY,
                    (oppgave, opts) => <EndretSluttdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />,
                )}
            </PanelPreviewWrapper>
        ),
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE,
        kilder: [{ backendType: OppgaveType.BEKREFT_ENDRET_PERIODE, betingelse: 'endringer = [FJERNET_PERIODE]' }],
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockFjernetPeriodeUPY,
                    mockFjernetPeriodeBesvartUPY,
                    (oppgave, opts) => <FjernetPeriodeOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />,
                )}
            </PanelPreviewWrapper>
        ),
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
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockMeldtUtUPY,
                    mockMeldtUtBesvartUPY,
                    (oppgave, opts) => <MeldtUtOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />,
                )}
            </PanelPreviewWrapper>
        ),
    },
    {
        parsedType: ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO,
        kilder: [{ backendType: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO }],
        preview: (
            <PanelPreviewWrapper>
                {renderOppgaveStandardStater(
                    mockOpphorVedMaksdatoUPY,
                    mockOpphorVedMaksdatoBesvartUPY,
                    (oppgave, opts) => (
                        <OpphorVedMaksdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />
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
                    mockRapporterInntektUPY,
                    mockRapporterInntektBesvartUPY,
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
    {
        parsedType: ParsedOppgavetype.SØK_YTELSE,
        kilder: [{ backendType: OppgaveType.SØK_YTELSE }],
        preview: (
            <PanelPreviewWrapper>
                <VStack gap="space-24">
                    <StoryBox title="Forside — uløst">
                        <OppgaverList oppgaver={[mockSøkYtelseUPY]} />
                    </StoryBox>
                    <StoryBox title="Ubesvart oppgave">
                        <SøkYtelseOppgavePanel oppgave={mockSøkYtelseUPY} dokumentarkivUrl="https://example.com/docs" />
                    </StoryBox>
                    <StoryBox title="Besvart oppgave">
                        <SøkYtelseOppgavePanel
                            oppgave={mockSøkYtelseBesvartUPY}
                            dokumentarkivUrl="https://example.com/docs"
                        />
                    </StoryBox>
                    <StoryBox title="Forside — løst oppgave">
                        <OppgaverList
                            visBeskrivelse={false}
                            oppgaveStatusTagVariant="text"
                            oppgaver={[{ ...mockSøkYtelseUPY, status: OppgaveStatus.LØST }]}
                        />
                    </StoryBox>
                </VStack>
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

const LenkeEllerTodo = ({ lenke }: { lenke: Lovlenke }) => {
    const { text } = useUngUiIntl();
    const lenketekst = text(lenke.tekstKey);

    return lenke.url.includes('#todo') ? (
        <span style={{ color: 'var(--a-text-warning)', fontStyle: 'italic' }}>{lenketekst} — TODO: lenke mangler</span>
    ) : (
        <Link href={lenke.url} rel="noopener noreferrer" target="_blank">
            {lenketekst}
        </Link>
    );
};

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
                            const lenker = rad.kilder.flatMap((k) => OPPGAVE_LOVVERK[k.backendType]?.[UNGDOMSYTELSE] ?? []);
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
