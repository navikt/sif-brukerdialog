import { Table } from '@navikt/ds-react';
import { DurationText } from '@navikt/sif-common-ui';
import { dateFormatter, dateToISODate } from '@navikt/sif-common-utils';

import { AppText } from '../../../../i18n';
import { DagMedEndretTilsyn } from '../../../../utils';

interface Props {
    dagerMedEndretTilsyn: DagMedEndretTilsyn[];
}

const EndretTilsynTabell = ({ dagerMedEndretTilsyn }: Props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <AppText id="endretTilsynTabell.header.dato" />
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <AppText id="endretTilsynTabell.header.endretTil" />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {dagerMedEndretTilsyn.map((dag) => (
                    <Table.Row key={dateToISODate(dag.dato)}>
                        <Table.DataCell className="capsFirstLetter">
                            {dateFormatter.dayCompactDate(dag.dato)}
                        </Table.DataCell>
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
