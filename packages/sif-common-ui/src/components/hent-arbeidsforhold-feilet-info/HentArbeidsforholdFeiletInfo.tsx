import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { SifAppKeys } from '@navikt/sif-app-register';

import { UiText } from '../../i18n/ui.messages';

interface Props {
    app?: SifAppKeys;
}

const HentArbeidsforholdFeiletInfo = ({ app }: Props) => (
    <Alert variant="warning">
        <Heading level="3" size="small" spacing>
            <UiText id="hentArbeidsforholdFeiletInfo.tittel" />
        </Heading>
        <BodyLong>
            <UiText id="hentArbeidsforholdFeiletInfo.tekst.1" />
        </BodyLong>
        {app &&
            [
                SifAppKeys.PleiepengerLivetsSlutt,
                SifAppKeys.OpplæringspengerApp,
                SifAppKeys.PleiepengerSyktBarn,
            ].includes(app) && (
                <>
                    <BodyLong>
                        <UiText id="hentArbeidsforholdFeiletInfo.tekst.2" />
                    </BodyLong>
                    <BodyLong>
                        <UiText id="hentArbeidsforholdFeiletInfo.tekst.3" />
                    </BodyLong>
                </>
            )}
    </Alert>
);

export default HentArbeidsforholdFeiletInfo;
