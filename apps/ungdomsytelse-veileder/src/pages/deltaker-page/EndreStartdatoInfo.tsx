import { BodyLong, ReadMore } from '@navikt/ds-react';

const EndreStartdatoInfo = () => {
    return (
        <ReadMore header="Les mer om å endre startdato">
            <BodyLong spacing>
                Når startdatoen endres før deltakeren har søkt, får deltakeren den nye datoen i søknaden. Dermed blir
                denne datoen benyttet i behandlinga.
            </BodyLong>

            <BodyLong spacing>
                Når startdatoen endres frem i tid etter at deltakeren har søkt, kan det føre til en feilutbetaling.
            </BodyLong>

            <BodyLong spacing>
                Når startdatoen endres tilbake i tid etter at deltakeren har søkt, får deltakeren en etterbetaling.
            </BodyLong>
        </ReadMore>
    );
};

export default EndreStartdatoInfo;
