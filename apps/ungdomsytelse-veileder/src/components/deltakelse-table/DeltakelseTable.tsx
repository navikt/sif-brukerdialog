import { Table } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../api/types';
import EndreDeltakelseForm from '../forms/EndreDeltakelseForm';

interface Props {
    deltakelser: Deltakelse[];
    onDeltakelseSlettet: (deltakelse: Deltakelse) => void;
    onDeltakelseEndret: (deltakelse: Deltakelse) => void;
}

const DeltakelseTable = ({ deltakelser, onDeltakelseSlettet, onDeltakelseEndret }: Props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Fra og med</Table.HeaderCell>
                    <Table.HeaderCell>Til og med</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {deltakelser.map((d) => (
                    <Table.ExpandableRow
                        key={d.id}
                        content={
                            <EndreDeltakelseForm
                                deltakelse={d}
                                deltakelser={deltakelser}
                                onDeltakelseSlettet={onDeltakelseSlettet}
                                onDeltakelseEndret={onDeltakelseEndret}
                            />
                        }>
                        <Table.DataCell>{d.id}</Table.DataCell>
                        <Table.DataCell>{dateFormatter.compact(d.fraOgMed)}</Table.DataCell>
                        <Table.DataCell>{d.tilOgMed ? dateFormatter.compact(d.tilOgMed) : null}</Table.DataCell>
                    </Table.ExpandableRow>
                ))}
            </Table.Body>
        </Table>
    );
};

export default DeltakelseTable;
