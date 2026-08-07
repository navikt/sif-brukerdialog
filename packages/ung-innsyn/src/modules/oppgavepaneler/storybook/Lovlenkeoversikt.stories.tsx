import { BodyShort, Box, Heading, Link, List, Table, VStack } from '@navikt/ds-react';
import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { RegelverkOgInnsynReadMore } from '../../../components/readmore/RegelverkOgInnsynReadMore';
import { PanelPreviewWrapper } from '../../../storybook/storyUtils';
import { getLovLenkerForParsedType, LENKEKATALOG, Lovlenke, OPPGAVE_LOVVERK_PARSED } from '../oppgaveLovverk';

const meta: Meta = {
    title: 'Oppgaver/1. Oversikt/Lovlenker',
    decorators: [],
};
export default meta;
type Story = StoryObj;

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

type LovlenkeRad = {
    lenke: Lovlenke;
    bruk: { parsedOppgavetype: ParsedOppgavetype; ytelsetype: OppgaveYtelsetype }[];
};

const byggLovlenkerader = (): LovlenkeRad[] => {
    const rader: LovlenkeRad[] = Object.values(LENKEKATALOG).map((lenke) => ({
        lenke,
        bruk: [],
    }));

    for (const [parsedOppgavetype, ytelsemap] of Object.entries(OPPGAVE_LOVVERK_PARSED) as [
        ParsedOppgavetype,
        Partial<Record<OppgaveYtelsetype, Lovlenke[]>>,
    ][]) {
        for (const [ytelsetype, lenker] of Object.entries(ytelsemap ?? {}) as [OppgaveYtelsetype, Lovlenke[]][]) {
            for (const lenke of lenker) {
                const rad = rader.find((r) => r.lenke === lenke);
                if (rad) {
                    rad.bruk.push({ parsedOppgavetype, ytelsetype });
                }
            }
        }
    }

    return rader;
};

export const Oversikt: Story = {
    name: 'Lovlenker',
    render: () => {
        const rader = byggLovlenkerader();
        return (
            <VStack gap="space-24">
                <VStack gap="space-8">
                    <Heading level="1" size="large">
                        Lovlenker
                    </Heading>
                    <BodyShort>
                        Oversikt over alle lovhenvisninger i <KodeTag>LENKEKATALOG</KodeTag> og hvilke oppgavetyper de
                        er tilknyttet.
                    </BodyShort>
                </VStack>
                <Box background="neutral-softA" borderRadius="16" padding="space-16">
                    <Table zebraStripes>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Lovlenke</Table.HeaderCell>
                                <Table.HeaderCell>ParsedOppgavetype</Table.HeaderCell>
                                <Table.HeaderCell>Ytelse</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {rader.map(({ lenke, bruk }) =>
                                bruk.map((b, i) => (
                                    <Table.Row key={`${lenke.tekst}-${b.parsedOppgavetype}-${b.ytelsetype}`}>
                                        {i === 0 && (
                                            <Table.DataCell rowSpan={bruk.length}>
                                                <LenkeEllerTodo lenke={lenke} />
                                            </Table.DataCell>
                                        )}
                                        <Table.DataCell>
                                            <KodeTag>{b.parsedOppgavetype}</KodeTag>
                                        </Table.DataCell>
                                        <Table.DataCell>
                                            <KodeTag>{b.ytelsetype}</KodeTag>
                                        </Table.DataCell>
                                    </Table.Row>
                                )),
                            )}
                        </Table.Body>
                    </Table>
                </Box>

                <VStack gap="space-8">
                    <Heading level="2" size="small">
                        URL-katalog
                    </Heading>
                    <BodyShort size="small">Flere oppgavetyper kan dele samme URL.</BodyShort>
                </VStack>
                <Box background="neutral-softA" borderRadius="16" padding="space-16">
                    <List>
                        {Object.entries(
                            Object.values(LENKEKATALOG).reduce<Record<string, string[]>>((acc, lenke) => {
                                (acc[lenke.url] ??= []).push(lenke.tekst);
                                return acc;
                            }, {}),
                        ).map(([url, tekster]) => (
                            <List.Item key={url} title={url}>
                                <List>
                                    {tekster.map((tekst) => (
                                        <List.Item key={tekst}>{tekst}</List.Item>
                                    ))}
                                </List>
                            </List.Item>
                        ))}
                    </List>
                </Box>

                <VStack gap="space-8">
                    <Heading level="2" size="small">
                        ReadMore-forhåndsvisning
                    </Heading>
                    <BodyShort size="small">Hvordan lovlenker vises i oppgavepanelet per ytelse.</BodyShort>
                </VStack>

                {([OppgaveYtelsetype.UNGDOMSYTELSE, OppgaveYtelsetype.AKTIVITETSPENGER] as const).map((ytelsetype) => {
                    const rader = (
                        Object.entries(OPPGAVE_LOVVERK_PARSED) as [
                            ParsedOppgavetype,
                            Partial<Record<OppgaveYtelsetype, Lovlenke[]>>,
                        ][]
                    ).filter(([, ytelsemap]) => ytelsetype in ytelsemap);

                    return (
                        <VStack key={ytelsetype} gap="space-8">
                            <Heading level="3" size="xsmall">
                                <KodeTag>{ytelsetype}</KodeTag>
                            </Heading>
                            <Box background="neutral-softA" borderRadius="16" padding="space-16">
                                <Table zebraStripes>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>ParsedOppgavetype</Table.HeaderCell>
                                            <Table.HeaderCell>ReadMore</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {rader.map(([parsedOppgavetype]) => (
                                            <Table.Row key={parsedOppgavetype}>
                                                <Table.DataCell>
                                                    <KodeTag>{parsedOppgavetype}</KodeTag>
                                                </Table.DataCell>
                                                <Table.DataCell>
                                                    {getLovLenkerForParsedType({ parsedOppgavetype, ytelsetype }).length > 0 ? (
                                                        <PanelPreviewWrapper>
                                                            <RegelverkOgInnsynReadMore
                                                                lenker={getLovLenkerForParsedType({
                                                                    parsedOppgavetype,
                                                                    ytelsetype,
                                                                })}
                                                                ytelsetype={ytelsetype}
                                                            />
                                                        </PanelPreviewWrapper>
                                                    ) : (
                                                        <BodyShort size="small" style={{ color: 'var(--a-text-subtle)', fontStyle: 'italic' }}>
                                                            Ingen lovreferanse ennå
                                                        </BodyShort>
                                                    )}
                                                </Table.DataCell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </Box>
                        </VStack>
                    );
                })}
            </VStack>
        );
    },
};
