import { Alert, BodyLong, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import VelkommenPageHeader from '@components/velkommen-page-header/VelkommenPageHeader';
import { useDeltakerContext } from '@context/DeltakerContext';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { dateFormatter } from '@navikt/sif-common-utils';
import KortOmUngdomsytelsen from '../../components/KortOmUngdomsytelsen';
import { SøknadRoutes } from '../../types/SøknadRoutes';

const IntroPage = () => {
    const {
        data: { søker, deltakelserIkkeSøktFor },
    } = useDeltakerContext();
    const navigate = useNavigate();

    if (deltakelserIkkeSøktFor.length !== 1) {
        return (
            <Page title="Ungdomsytelse">
                <VStack gap="8">
                    <VelkommenPageHeader title="Ungdomsytelse" />
                    <Alert variant="error">
                        <Heading level="1" size="small" spacing={true}>
                            Scenario som ikke støttes
                        </Heading>
                        {deltakelserIkkeSøktFor.length === 0
                            ? 'Ingen deltakelse som det ikke er søkt for'
                            : 'Det finnes flere deltakelser som ikke er søkt for'}
                    </Alert>
                </VStack>
            </Page>
        );
    }

    const { programPeriode } = deltakelserIkkeSøktFor[0];

    const handleStartSøknad = () => {
        navigate(SøknadRoutes.VELKOMMEN);
    };

    return (
        <Page title="Ungdomsytelse">
            <VStack gap="8">
                <VelkommenPageHeader title="Ungdomsytelsen" />
                <Box className="bg-deepblue-50 p-8 rounded-md">
                    <Heading level="1" size="medium" spacing={true}>
                        Hei {søker.fornavn}
                    </Heading>
                    <BodyLong>
                        Du er meldt på av din veileder til å være med i ungdomsytelse-programmet fra og med{' '}
                        <strong>{dateFormatter.dateShortMonthYear(programPeriode.from)}</strong>. For å starte
                        programmet, må du sende inn en kort søknad.
                    </BodyLong>
                    <Box className="mt-5">
                        <Button variant="primary" onClick={handleStartSøknad} type="button">
                            Gå til søknaden
                        </Button>
                    </Box>
                </Box>
                <KortOmUngdomsytelsen />
            </VStack>
        </Page>
    );
};

export default IntroPage;
