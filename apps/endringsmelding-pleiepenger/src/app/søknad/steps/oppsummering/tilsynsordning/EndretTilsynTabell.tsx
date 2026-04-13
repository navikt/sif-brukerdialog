import { Table } from '@navikt/ds-react';
import { DurationText } from '@navikt/sif-common-ui';
import { dateFormatter, dateToISODate } from '@navikt/sif-common-utils';

import { DagMedEndretTilsyn } from '../../../../utils';

interface Props {
    dagerMedEndretTilsyn: DagMedEndretTilsyn[];
    visOpprinneligTid?: boolean;
}

const EndretTilsynTabell = ({ dagerMedEndretTilsyn, visOpprinneligTid = false }: Props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Dato</Table.HeaderCell>
                    {visOpprinneligTid && <Table.HeaderCell>Endret fra</Table.HeaderCell>}
                    <Table.HeaderCell>Endret til</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {dagerMedEndretTilsyn.map((dag) => (
                    <Table.Row key={dateToISODate(dag.dato)}>
                        <Table.DataCell className="capsFirstLetter">
                            {dateFormatter.dayCompactDate(dag.dato)}
                        </Table.DataCell>
                        {visOpprinneligTid && (
                            <Table.DataCell>
                                {dag.tidOpprinnelig ? (
                                    <DurationText
                                        duration={{
                                            hours: dag.tidOpprinnelig.hours,
                                            minutes: dag.tidOpprinnelig.minutes,
                                        }}
                                        fullText={true}
                                    />
                                ) : (
                                    '-'
                                )}
                            </Table.DataCell>
                        )}
                        <Table.DataCell>
                            <DurationText
                                duration={{ hours: dag.tid.hours, minutes: dag.tid.minutes }}
                                fullText={true}
                            />
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default EndretTilsynTabell;
