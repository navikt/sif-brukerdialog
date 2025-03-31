import { BodyShort, Table } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';

export interface InntektTabellRad {
    navn: string;
    beløp: number;
}

interface Props {
    header: string;
    inntekt: InntektTabellRad[];
}

const InntektTabell = ({ header, inntekt }: Props) => {
    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">{header}</Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="w-16 text-right text-nowrap">
                        Inntekt
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
                            <Table.DataCell className="w-16 text-right text-nowrap">
                                <FormattedNumber value={beløp} />
                            </Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default InntektTabell;
