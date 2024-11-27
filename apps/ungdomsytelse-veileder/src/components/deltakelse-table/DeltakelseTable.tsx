import { Alert, Table, Tag } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../api/types';
import EndreDeltakelseForm from '../../depr/components/forms/old/EndreDeltakelseForm';

interface Props {
    deltakelser: Deltakelse[];
    editable?: boolean;
    onDeltakelseSlettet?: (deltakelse: Deltakelse) => void;
    onDeltakelseEndret?: (deltakelse: Deltakelse) => void;
}

const DeltakelseStatusTag = ({ deltakelse }: { deltakelse: Deltakelse }): React.ReactNode => {
    if (deltakelse.erAktiv) {
        return deltakelse.harSøkt ? (
            <Tag variant="success" className="text-nowrap">
                Aktiv periode
            </Tag>
        ) : (
            <Tag variant="warning" className="text-nowrap">
                Ikke søkt for
            </Tag>
        );
    }
};

const DeltakelseTable = ({ deltakelser, onDeltakelseSlettet, onDeltakelseEndret }: Props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Startdato</Table.HeaderCell>
                    <Table.HeaderCell>Sluttdato</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {deltakelser.map((d) => {
                    return (
                        <Table.ExpandableRow
                            key={d.id}
                            content={
                                onDeltakelseSlettet && onDeltakelseEndret ? (
                                    <EndreDeltakelseForm
                                        deltakelse={d}
                                        deltakelser={deltakelser}
                                        onDeltakelseSlettet={onDeltakelseSlettet}
                                        onDeltakelseEndret={onDeltakelseEndret}
                                    />
                                ) : (
                                    <Alert variant="error">Missing props</Alert>
                                )
                            }>
                            <Table.DataCell>{dateFormatter.compact(d.fraOgMed)}</Table.DataCell>
                            <Table.DataCell>{d.tilOgMed ? dateFormatter.compact(d.tilOgMed) : '-'}</Table.DataCell>
                            <Table.DataCell className="w-5/6">
                                <DeltakelseStatusTag deltakelse={d} />
                            </Table.DataCell>
                        </Table.ExpandableRow>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default DeltakelseTable;
