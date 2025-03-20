import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react';
import { AppText } from '../../../i18n';

const InfoRetningslinjerSøskensaker = () => (
    <Alert variant="info">
        <Heading level="3" size="xsmall" spacing={true} className="mt-1">
            <AppText id="infoSøskensaker.tittel" />
        </Heading>
        <BodyShort spacing>
            <AppText id="infoSøskensaker.info.1" />
        </BodyShort>
        <Link href="https://www.nav.no/pleiepenger-barn#flere-barn">
            <AppText id="infoSøskensaker.lenke" />
        </Link>
    </Alert>
);

export default InfoRetningslinjerSøskensaker;
