import { Table } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../api/types';

interface Props {
    deltakelser: Deltakelse[];
}

const DeltakelseTable = ({ deltakelser }: Props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Fra og med</Table.HeaderCell>
                    <Table.HeaderCell>Til og med</Table.HeaderCell>
                    <Table.HeaderCell>Søkt for</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {deltakelser.map((d) => (
                    <Table.Row key={d.id}>
                        <Table.DataCell>{dateFormatter.compact(d.fraOgMed)}</Table.DataCell>
                        <Table.DataCell>{d.tilOgMed ? dateFormatter.compact(d.tilOgMed) : null}</Table.DataCell>
                        <Table.DataCell>{d.harSøkt ? 'Ja' : 'Nei'}</Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default DeltakelseTable;
