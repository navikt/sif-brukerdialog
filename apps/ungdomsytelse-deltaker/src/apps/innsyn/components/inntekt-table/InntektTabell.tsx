import { BodyShort, Box, Table } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';

export interface InntektTableRow {
    navn: string;
    beløp: number;
}

interface Props {
    navnRowHeader: string;
    beløpRowHeader: string;
    totalColHeader: string;
    inntekt: InntektTableRow[];
    total: number;
}

const InntektTable = ({ navnRowHeader, inntekt, total, beløpRowHeader, totalColHeader }: Props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">{navnRowHeader}</Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="w-16">
                        <Box className="text-right text-nowrap">{beløpRowHeader}</Box>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {inntekt.map(({ navn, beløp }, i) => {
                    return (
                        <Table.Row key={i + navn}>
                            <Table.HeaderCell scope="row">
                                <BodyShort weight="regular">{navn}</BodyShort>
                            </Table.HeaderCell>
                            <Table.DataCell className="w-16">
                                <BodyShort className="text-right text-nowrap">
                                    <FormattedNumber value={beløp} />
                                </BodyShort>
                            </Table.DataCell>
                        </Table.Row>
                    );
                })}
                <Table.Row>
                    <Table.HeaderCell scope="row">
                        <BodyShort weight="semibold">{totalColHeader}</BodyShort>
                    </Table.HeaderCell>
                    <Table.DataCell className="w-16">
                        <BodyShort weight="semibold" className="text-right text-nowrap">
                            <FormattedNumber value={total} />
                        </BodyShort>
                    </Table.DataCell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

export default InntektTable;
