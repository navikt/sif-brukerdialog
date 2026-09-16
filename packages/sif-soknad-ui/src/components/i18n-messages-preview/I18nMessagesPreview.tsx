import { useState } from 'react';
import { Box, Heading, Table, ToggleGroup } from '@navikt/ds-react';

export interface I18nMessagesPreviewProps {
    nb: Record<string, string>;
    nn: Record<string, string>;
    title?: string;
}

type SpråkFilter = 'begge' | 'nb' | 'nn';

const missingStyle: React.CSSProperties = { backgroundColor: '#ffe9e9', color: '#c30000', fontStyle: 'italic' };

export const I18nMessagesPreview = ({ nb, nn, title }: I18nMessagesPreviewProps) => {
    const [språk, setSpråk] = useState<SpråkFilter>('begge');
    const keys = [...new Set([...Object.keys(nb), ...Object.keys(nn)])].sort();

    const visBokmål = språk !== 'nn';
    const visNynorsk = språk !== 'nb';

    return (
        <div>
            {title && (
                <Heading level="3" size="medium" spacing>
                    {title}
                </Heading>
            )}
            <Box marginBlock="space-0 space-16">
                <ToggleGroup
                    size="small"
                    value={språk}
                    onChange={(value) => setSpråk(value as SpråkFilter)}
                    label="Vis språk"
                >
                    <ToggleGroup.Item value="begge">Bokmål og nynorsk</ToggleGroup.Item>
                    <ToggleGroup.Item value="nb">Kun bokmål</ToggleGroup.Item>
                    <ToggleGroup.Item value="nn">Kun nynorsk</ToggleGroup.Item>
                </ToggleGroup>
            </Box>
            <Table size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nøkkel</Table.HeaderCell>
                        {visBokmål && <Table.HeaderCell>Bokmål</Table.HeaderCell>}
                        {visNynorsk && <Table.HeaderCell>Nynorsk</Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {keys.map((key) => (
                        <Table.Row key={key}>
                            <Table.HeaderCell scope="row">
                                <code style={{ fontSize: '0.8em', fontWeight: 'normal', wordBreak: 'break-word' }}>
                                    {key}
                                </code>
                            </Table.HeaderCell>
                            {visBokmål && (
                                <Table.DataCell style={Object.hasOwn(nb, key) ? undefined : missingStyle}>
                                    {Object.hasOwn(nb, key) ? nb[key] : '—'}
                                </Table.DataCell>
                            )}
                            {visNynorsk && (
                                <Table.DataCell style={Object.hasOwn(nn, key) ? undefined : missingStyle}>
                                    {Object.hasOwn(nn, key) ? nn[key] : '—'}
                                </Table.DataCell>
                            )}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};
