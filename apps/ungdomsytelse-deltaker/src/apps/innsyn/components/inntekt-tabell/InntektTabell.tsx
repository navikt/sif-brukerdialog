import { BodyShort, Box, Table } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';

export interface InntektTabellRad {
    navn: string;
    beløp: number;
}

interface Props {
    header: string;
    lønnHeader: string;
    inntekt: InntektTabellRad[];
    summert: number;
}

const InntektTabell = ({ header, inntekt, summert, lønnHeader }: Props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">{header}</Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="w-16">
                        <Box className="text-right text-nowrap">{lønnHeader}</Box>
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
                        <BodyShort weight="semibold">Totalt</BodyShort>
                    </Table.HeaderCell>
                    <Table.DataCell className="w-16">
                        <BodyShort weight="semibold" className="text-right text-nowrap">
                            <FormattedNumber value={summert} />
                        </BodyShort>
                    </Table.DataCell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

export default InntektTabell;
