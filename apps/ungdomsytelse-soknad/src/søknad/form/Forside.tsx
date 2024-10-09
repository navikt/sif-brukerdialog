import { Alert, Heading, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { SoknadVelkommenGuide } from '@navikt/sif-common-soknad-ds/src';
import VelkommenPageHeader from '../../pages/velkommen/VelkommenPageHeader';
import { useSøknadContext } from '../hooks/useSøknadContext';
import DeltakelseTable from '../../components/deltakelse-table/DeltakelseTable';
import DeltakelseForm from './DeltakelseForm';
import { deltakerService } from '../../api/services/deltakerService';

const Forside = () => {
    const {
        data: { søker, deltakelserSøktFor, deltakelserIkkeSøktFor, alleDeltakelser },
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
                        <DeltakelseForm
                            søker={søker}
                            deltakelse={deltakelserIkkeSøktFor[0]}
                            onSøknadSendt={handleSøknadSendt}
                        />
                    )}
                    {deltakelserSøktFor.length > 0 && (
                        <>
                            <Heading level="2" size="medium">
                                Deltakelsesperiode det allerede er søkt for
                            </Heading>
                            <DeltakelseTable deltakelser={deltakelserSøktFor} />
                        </>
                    )}
                </>
            </VStack>
        </Page>
    );
};

export default Forside;
