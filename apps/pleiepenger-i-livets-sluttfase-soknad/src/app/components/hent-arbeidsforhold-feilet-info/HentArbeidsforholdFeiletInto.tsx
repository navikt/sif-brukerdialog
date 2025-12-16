import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { AppText } from '../../i18n';

const HentArbeidsforholdFeiletInfo = () => (
    <Alert variant="warning">
        <Heading level="3" size="small" spacing>
            <AppText id="hentArbeidsforholdFeiletInfo.tittel" />
        </Heading>
        <BodyLong>
            <AppText id="hentArbeidsforholdFeiletInfo.tekst.1" />
        </BodyLong>

        <BodyLong>
            <AppText id="hentArbeidsforholdFeiletInfo.tekst.2" />
        </BodyLong>
        <BodyLong>
            <AppText id="hentArbeidsforholdFeiletInfo.tekst.3" />
        </BodyLong>
    </Alert>
);

export default HentArbeidsforholdFeiletInfo;
