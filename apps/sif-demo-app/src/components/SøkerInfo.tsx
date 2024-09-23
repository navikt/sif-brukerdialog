import { Heading, Table, VStack } from '@navikt/ds-react';
import { Søker } from '@navikt/sif-common';
import ShadowBox from './ShadowBox';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    søker: Søker;
}

const SøkerInfo = ({ søker }: Props) => {
    return (
        <ShadowBox>
            <VStack gap="2">
                <Heading level="2" size="medium">
                    Søker
                </Heading>
                <Table size="small">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{ width: '20%' }}>Felt</Table.HeaderCell>
                            <Table.HeaderCell>Verdi</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.HeaderCell>AktørID</Table.HeaderCell>
                            <Table.DataCell>{søker.aktørId}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Fødselsnummer</Table.HeaderCell>
                            <Table.DataCell>{søker.fødselsnummer}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Fødselsdato</Table.HeaderCell>
                            <Table.DataCell>{dateFormatter.compact(søker.fødselsdato)}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Fornavn</Table.HeaderCell>
                            <Table.DataCell>{søker.fornavn}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Mellomnavn</Table.HeaderCell>
                            <Table.DataCell>{søker.mellomnavn}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Etternavn</Table.HeaderCell>
                            <Table.DataCell>{søker.etternavn}</Table.DataCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </VStack>
        </ShadowBox>
    );
};

export default SøkerInfo;
