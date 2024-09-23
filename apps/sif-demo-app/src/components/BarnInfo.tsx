import { Heading, Table, VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common';
import ShadowBox from './ShadowBox';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    barn: RegistrertBarn[];
}

const BarnInfo = ({ barn: registrerteBarn }: Props) => {
    return (
        <VStack gap="8">
            {registrerteBarn.map((barn, index) => (
                <ShadowBox key={barn.aktørId}>
                    <VStack gap="2">
                        <Heading level="2" size="medium">
                            Barn {index + 1}
                        </Heading>
                        <Table size="small">
                            <Table.Header>
                                <Table.HeaderCell style={{ width: '20%' }}>Felt</Table.HeaderCell>
                                <Table.HeaderCell>Verdi</Table.HeaderCell>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.HeaderCell>AktørID</Table.HeaderCell>
                                    <Table.DataCell>{barn.aktørId}</Table.DataCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Fødselsdato</Table.HeaderCell>
                                    <Table.DataCell>{dateFormatter.compact(barn.fødselsdato)}</Table.DataCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Fornavn</Table.HeaderCell>
                                    <Table.DataCell>{barn.fornavn}</Table.DataCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Mellomnavn</Table.HeaderCell>
                                    <Table.DataCell>{barn.mellomnavn}</Table.DataCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell>Etternavn</Table.HeaderCell>
                                    <Table.DataCell>{barn.etternavn}</Table.DataCell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </VStack>
                </ShadowBox>
            ))}
        </VStack>
    );
};

export default BarnInfo;
