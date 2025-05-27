import { Table } from '@navikt/ds-react';
import { DeltakelseHistorikkInnslag } from '../../pages/deltaker-page/parts/DeltakelseHistorikk';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api';

interface Props {
    historikkInnslag?: DeltakelseHistorikkInnslag[];
}

const getRevisjonstypeTekst = (type: Revisjonstype): string => {
    switch (type) {
        case Revisjonstype.OPPRETTET:
            return 'Deltakelse opprettet';
        case Revisjonstype.ENDRET:
            return 'Endret periode';
        case Revisjonstype.SLETTET:
            return 'Slettet';
        default:
            return 'Ukjent';
    }
};

const DeltakelseHistorikkListe = ({ historikkInnslag: historikk = [] }: Props) => {
    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Tidspunkt</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Endring</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Kilde</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {historikk.map(({ revisjonstype, tidspunkt, utfører }, i) => {
                    return (
                        <Table.Row key={i}>
                            <Table.DataCell width="200">{dateFormatter.compactWithTime(tidspunkt)}</Table.DataCell>
                            <Table.DataCell>{getRevisjonstypeTekst(revisjonstype)}</Table.DataCell>
                            <Table.DataCell>{utfører}</Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default DeltakelseHistorikkListe;
