import { Table } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';

interface Props {}

const InntektTabell = ({}: Props) => {
    const data = [
        {
            navn: 'Godlia video og persienner',
            inntekt: 213,
        },
        {
            navn: 'Mix kiosk',
            inntekt: 3500,
        },
        {
            navn: 'Sykepenger',
            inntekt: 500,
        },
    ];
    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Arbeidsgiver/ytelse</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Inntekt</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map(({ navn, inntekt }, i) => {
                    return (
                        <Table.Row key={i + navn}>
                            <Table.HeaderCell scope="row">{navn}</Table.HeaderCell>
                            <Table.DataCell>
                                <FormattedNumber value={inntekt} />
                            </Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default InntektTabell;
