import { Accordion, Alert, Heading, HStack, Page, VStack } from '@navikt/ds-react';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useDeltaker } from '../context/DeltakerContext';
import EndreDeltakelseperiode from '../forms/EndreDeltakelseperiode';
import MeldeInnDeltakerPåNyttForm from '../forms/MeldeInnDeltakerPåNyttForm';
import DeltakelseTable from './deltakelse-table/DeltakelseTable';
import AktivDeltakelse from './aktiv-deltakelse/AktivDeltakelse';

const DeltakerPageContent = () => {
    const { deltaker, deltakelser = [], refetchDeltakelser } = useDeltaker();
    const aktivDeltakelse = deltakelser?.find((d) => d.erAktiv);
    const aktiveDeltakelser = deltakelser?.filter((d) => d.erAktiv);

    const handleOnDeltakelseChange = () => {
        refetchDeltakelser();
    };

    if (aktiveDeltakelser && aktiveDeltakelser.length > 1) {
        return (
            <VStack maxWidth={'30rem'}>
                <Alert variant="warning">Deltaker har flere aktive perioder</Alert>
            </VStack>
        );
    }
    if (!deltaker) {
        return (
            <HStack paddingBlock={'10'} paddingInline={'6'} justify="center">
                <LoadingSpinner size="3xlarge" />
            </HStack>
        );
    }

    if (!deltakelser) {
        return <p>Ingen deltakelser funnet</p>;
    }

    if (aktivDeltakelse || deltakelser.length === 1) {
        return (
            <Page.Block width="xl" gutters={true}>
                <AktivDeltakelse
                    deltakelse={aktivDeltakelse || deltakelser[0]}
                    deltaker={deltaker}
                    alleDeltakelser={deltakelser}
                    onChange={handleOnDeltakelseChange}
                />
            </Page.Block>
        );
    }

    return (
        <VStack gap="8">
            <VStack gap="2">
                <Heading level="2" size="medium">
                    Deltakelseperioder
                </Heading>
                {deltakelser.length === 0 ? (
                    <Alert variant="info">Ingen deltakelser registrert</Alert>
                ) : (
                    <DeltakelseTable deltakelser={deltakelser} />
                )}
            </VStack>
            <Heading level="2" size="medium">
                Testoperasjoner
            </Heading>
            {deltakelser.length > 0 && (
                <Accordion>
                    {/* <Accordion.Item>
                        <Accordion.Header>1. Avslutt deltakelse</Accordion.Header>
                        <Accordion.Content>
                            <AvsluttDeltakelseForm onDeltakelseAvsluttet={() => console.log('avsluttet')} />
                        </Accordion.Content>
                    </Accordion.Item> */}
                    <Accordion.Item>
                        <Accordion.Header>2. Melde inn deltaker på nytt</Accordion.Header>
                        <Accordion.Content>
                            <MeldeInnDeltakerPåNyttForm deltakerFnr={deltaker.deltakerIdent} />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>3. Oppdater deltakelse</Accordion.Header>
                        <Accordion.Content>
                            <EndreDeltakelseperiode deltakelser={deltakelser} deltakerFnr={deltaker.deltakerIdent} />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            )}
        </VStack>
    );
};

export default DeltakerPageContent;
