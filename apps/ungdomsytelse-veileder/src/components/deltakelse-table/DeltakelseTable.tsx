import { Button, Table } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../api/types';

interface Props {
    deltakelser: Deltakelse[];
    velgDeltakelse?: (deltakelse: Deltakelse) => void;
}

const DeltakelseTable = ({ deltakelser, velgDeltakelse }: Props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Fra og med</Table.HeaderCell>
                    <Table.HeaderCell>Til og med</Table.HeaderCell>
                    {velgDeltakelse && <Table.HeaderCell></Table.HeaderCell>}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {deltakelser.map((d) => (
                    <Table.Row key={d.id}>
                        <Table.DataCell>{d.id}</Table.DataCell>
                        <Table.DataCell>{dateFormatter.compact(d.fraOgMed)}</Table.DataCell>
                        <Table.DataCell>{d.tilOgMed ? dateFormatter.compact(d.tilOgMed) : null}</Table.DataCell>
                        {velgDeltakelse && (
                            <Table.DataCell>
                                <Button
                                    type="button"
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                        velgDeltakelse(d);
                                    }}
                                    variant="secondary"
                                    size="small">
                                    Velg
                                </Button>
                            </Table.DataCell>
                        )}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default DeltakelseTable;
