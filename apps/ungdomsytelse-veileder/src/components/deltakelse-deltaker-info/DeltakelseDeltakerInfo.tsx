import { Alert, Heading, Table, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '../../api/types';
import { FormattedNumber } from 'react-intl';

interface Props {
    deltakelse: Deltakelse;
    deltaker: Deltaker;
}

const DeltakelseDeltakerInfo = ({}: Props) => {
    return (
        <VStack gap="4" maxWidth={'40rem'} width={'100%'}>
            <Heading level="2" size="medium">
                Informasjon fra deltaker
            </Heading>
            <Alert variant="info" size="small">
                Kun eksempel gitt bruker er midt i perioden
            </Alert>
            <Heading level="3" size="small">
                Rapportert inntekt
            </Heading>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Måned</Table.HeaderCell>
                        <Table.HeaderCell>Rapportert inntekt</Table.HeaderCell>
                        <Table.HeaderCell>Utbetalt</Table.HeaderCell>
                        <Table.HeaderCell>Utbetalingsdato</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.DataCell>2024 - Desember</Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.DataCell>2024 - November</Table.DataCell>
                        <Table.DataCell>
                            <FormattedNumber value={12050} />
                        </Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.DataCell>2024 - Oktober</Table.DataCell>
                        <Table.DataCell>
                            <FormattedNumber value={5230} />
                        </Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.DataCell>2024 - September</Table.DataCell>
                        <Table.DataCell>
                            <FormattedNumber value={5230} />
                        </Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </VStack>
    );
};

export default DeltakelseDeltakerInfo;
