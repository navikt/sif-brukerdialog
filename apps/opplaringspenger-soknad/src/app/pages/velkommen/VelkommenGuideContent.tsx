import { BodyLong } from '@navikt/ds-react';
import { AppText } from '../../i18n';

const VelkommenGuideContent = () => (
    <>
        <BodyLong size="large">
            <AppText id="page.velkommen.guide.ingress" />
        </BodyLong>
        <p>
            <AppText id="page.velkommen.guide.tekst.1" />
        </p>
    </>
);

export default VelkommenGuideContent;
