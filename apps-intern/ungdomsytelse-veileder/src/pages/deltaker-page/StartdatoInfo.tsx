import { BodyLong, ReadMore, VStack } from '@navikt/ds-react';

const StartdatoInfo = () => {
    return (
        <ReadMore header="Les om å endre startdato">
            <VStack gap="space-16">
                <BodyLong>
                    Når startdatoen endres før deltakeren har søkt, får deltakeren den nye datoen i søknaden. Dermed
                    blir denne datoen benyttet i behandlinga.
                </BodyLong>

                <BodyLong>
                    Når startdatoen endres frem i tid etter at deltakeren har søkt, kan det føre til en feilutbetaling.
                </BodyLong>

                <BodyLong>
                    Når startdatoen endres tilbake i tid etter at deltakeren har søkt, får deltakeren en etterbetaling.
                </BodyLong>
            </VStack>
        </ReadMore>
    );
};

export default StartdatoInfo;
