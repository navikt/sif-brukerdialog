import { Heading, Table, VStack } from '@navikt/ds-react';
import { Arbeidsgivere, ArbeidsgiverOrganisasjon } from '@navikt/sif-common';
import ShadowBox from './ShadowBox';

interface Props {
    arbeidsgivere: Arbeidsgivere;
}

const Organisasjon = ({ organisasjon }: { organisasjon: ArbeidsgiverOrganisasjon }) => {
    return (
        <ShadowBox>
            <VStack gap="2">
                <Heading level="2" size="medium">
                    {organisasjon.navn}
                </Heading>
                <Table size="small">
                    <Table.Header>
                        <Table.HeaderCell style={{ width: '20%' }}>Felt</Table.HeaderCell>
                        <Table.HeaderCell>Verdi</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.HeaderCell>Navn</Table.HeaderCell>
                            <Table.DataCell>{organisasjon.navn}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Orgnr</Table.HeaderCell>
                            <Table.DataCell>{organisasjon.organisasjonsnummer}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Ansatt fra og med</Table.HeaderCell>
                            <Table.DataCell>
                                <>{organisasjon.ansattFom}</>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Navn</Table.HeaderCell>
                            <Table.DataCell>
                                <>{organisasjon.ansattTom}</>
                            </Table.DataCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </VStack>
        </ShadowBox>
    );
};

const ArbeidsgiverInfo = ({ arbeidsgivere: { organisasjoner } }: Props) => {
    return (
        <VStack gap="8">
            {organisasjoner.length > 0 ? (
                organisasjoner.map((o) => <Organisasjon key={o.organisasjonsnummer} organisasjon={o} />)
            ) : (
                <ShadowBox>Ingen arbeidsgiver registrert</ShadowBox>
            )}
        </VStack>
    );
};

export default ArbeidsgiverInfo;