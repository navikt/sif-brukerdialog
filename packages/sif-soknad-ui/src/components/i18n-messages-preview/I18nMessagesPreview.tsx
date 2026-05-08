import { Heading, Table } from '@navikt/ds-react';

export interface I18nMessagesPreviewProps {
    nb: Record<string, string>;
    nn: Record<string, string>;
    title?: string;
}

const missingStyle: React.CSSProperties = { backgroundColor: '#ffe9e9', color: '#c30000', fontStyle: 'italic' };

export const I18nMessagesPreview = ({ nb, nn, title }: I18nMessagesPreviewProps) => {
    const keys = [...new Set([...Object.keys(nb), ...Object.keys(nn)])].sort();

    return (
        <div>
            {title && (
                <Heading level="3" size="medium" spacing>
                    {title}
                </Heading>
            )}
            <Table size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nøkkel</Table.HeaderCell>
                        <Table.HeaderCell>Bokmål</Table.HeaderCell>
                        <Table.HeaderCell>Nynorsk</Table.HeaderCell>
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
                            <Table.DataCell style={Object.hasOwn(nb, key) ? undefined : missingStyle}>
                                {Object.hasOwn(nb, key) ? nb[key] : '—'}
                            </Table.DataCell>
                            <Table.DataCell style={Object.hasOwn(nn, key) ? undefined : missingStyle}>
                                {Object.hasOwn(nn, key) ? nn[key] : '—'}
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};
