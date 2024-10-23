import { Alert, Box, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { SoknadVelkommenGuide } from '@navikt/sif-common-soknad-ds/src';
import { deltakerService } from '../../api/services/deltakerService';
import { Deltakelse } from '../../api/types';
import DeltakelseTable from '../../components/deltakelse-table/DeltakelseTable';
import VelkommenPageHeader from '../../pages/velkommen/VelkommenPageHeader';
import { useSøknadContext } from '../hooks/useSøknadContext';
import DeltakelseForm from './DeltakelseForm';

const Forside = () => {
    const {
        data: { søker, deltakelserIkkeSøktFor, deltakelserSøktFor, alleDeltakelser },
        updateDeltakelse,
    } = useSøknadContext();

    const [søktFor, setSøktFor] = useState<string[]>(deltakelserSøktFor.map((d) => d.id));

    const handleSøknadSendt = async (deltakelse: Deltakelse) => {
        setSøktFor([...søktFor, deltakelse.id]);
    };

    const erSøktFor = (deltakelse: Deltakelse): boolean => {
        return søktFor.includes(deltakelse.id);
    };

    const handleOnClose = async () => {
        const data = await deltakerService.getDeltakelser(søker.fødselsnummer);
        const deltakelser = data.map((d) => ({ ...d, søktFor: erSøktFor(d) }));
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
                                            onClose={handleOnClose}
                                            onSøknadSendt={handleSøknadSendt}
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
