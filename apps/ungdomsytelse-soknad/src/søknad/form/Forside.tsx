import { Alert, Box, Heading, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { SoknadVelkommenGuide } from '@navikt/sif-common-soknad-ds/src';
import VelkommenPageHeader from '../../pages/velkommen/VelkommenPageHeader';
import { useSøknadContext } from '../hooks/useSøknadContext';
import DeltakelseTable from '../../components/deltakelse-table/DeltakelseTable';
import DeltakelseForm from './DeltakelseForm';
import { deltakerService } from '../../api/services/deltakerService';

const Forside = () => {
    const {
        data: { søker, deltakelserIkkeSøktFor, alleDeltakelser },
        updateDeltakelse,
    } = useSøknadContext();

    const handleSøknadSendt = async () => {
        const deltakelser = await deltakerService.getDeltakelser(søker.fødselsnummer);
        updateDeltakelse(deltakelser);
    };

    return (
        <Page title="Ungdomsytelse">
            <VStack gap="8">
                <>
                    <VelkommenPageHeader title="Ungdomsytelse" />

                    <SoknadVelkommenGuide title={`Hei ${søker.fornavn}`}>
                        <VStack gap="8">
                            {alleDeltakelser.length === 0 ? (
                                <Alert variant="info">
                                    Vi kan ikke se at du er registrert for å kunne delta i dette programmet. Hvis du
                                    mener dette ikke stemmer, ta kontakt med din NAV veileder.
                                </Alert>
                            ) : (
                                <>Dette er en MVP-app for innsending av data til søknad om ny ungdomsytelse.</>
                            )}
                        </VStack>
                    </SoknadVelkommenGuide>

                    {deltakelserIkkeSøktFor.length > 0 && (
                        <VStack gap="4">
                            {deltakelserIkkeSøktFor.map((deltakelse) => {
                                return (
                                    <Box key={deltakelse.id}>
                                        <DeltakelseForm
                                            søker={søker}
                                            deltakelse={deltakelse}
                                            onSøknadSendt={handleSøknadSendt}
                                            onClose={handleSøknadSendt}
                                        />
                                    </Box>
                                );
                            })}
                        </VStack>
                    )}
                    {alleDeltakelser.length > 0 && (
                        <>
                            <Heading level="2" size="medium">
                                Alle deltakelser
                            </Heading>
                            <DeltakelseTable deltakelser={alleDeltakelser} />
                        </>
                    )}
                </>
            </VStack>
        </Page>
    );
};

export default Forside;
