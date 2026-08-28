import { Alert, BodyLong, Heading } from '@navikt/ds-react';

import { UiText } from '../../i18n/ui.messages';

interface Props {
    visFortsettInfo?: boolean;
}

const HentArbeidsforholdFeiletInfo = ({ visFortsettInfo: visEkstraInfo }: Props) => (
    <Alert variant="warning">
        <Heading level="3" size="small" spacing>
            <UiText id="hentArbeidsforholdFeiletInfo.tittel" />
        </Heading>
        <BodyLong>
            <UiText id="hentArbeidsforholdFeiletInfo.tekst.1" />
        </BodyLong>
        {visEkstraInfo && (
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
