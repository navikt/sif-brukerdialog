import { Table } from '@navikt/ds-react';
import { InntektFraAInntekt } from '@navikt/ung-common';
import { FormattedNumber } from 'react-intl';

interface Props {
    inntekt: InntektFraAInntekt;
}

const InntektTabell = ({ inntekt }: Props) => {
    const data: Array<{ navn: string; inntekt: number }> = [];
    inntekt.arbeidsgivere.forEach((arbeidsgiver) => {
        data.push({ navn: arbeidsgiver.navn, inntekt: arbeidsgiver.beløp });
    });
    inntekt.ytelser.forEach((ytelse) => {
        data.push({ navn: ytelse.navn, inntekt: ytelse.beløp });
    });
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
