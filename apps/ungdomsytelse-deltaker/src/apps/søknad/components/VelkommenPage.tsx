import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import VelkommenPageHeader from '../../../components/velkommen-page-header/VelkommenPageHeader';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useDeltakerContext } from '../../../context/DeltakerContext';

const VelkommenPage = () => {
    const { søker, deltakelse } = useDeltakerContext();
    return (
        <Page title="Søknad om ungdomsytelse">
            <VStack gap="8">
                <VelkommenPageHeader title="Søknad om ungdomsytelse" />
                <Box className="bg-deepblue-50 p-8 rounded-md">
                    <Heading level="1" size="medium" spacing={true}>
                        Hei {søker.fornavn}!
                    </Heading>
                    <BodyLong>
                        Du er meldt på av din veileder til å være med i ungdomsprogrammet fra og med{' '}
                        <strong>{dateFormatter.dateShortMonthYear(deltakelse.programPeriode.from)}</strong>.
                    </BodyLong>
                </Box>
            </VStack>
        </Page>
    );

    /*  */
};

export default VelkommenPage;
