import { BodyLong } from '@navikt/ds-react';
import { AppText } from '../../i18n';

const VelkommenGuideContent = () => (
    <BodyLong as="div">
        <p>
            <AppText id="page.velkommen.guide.ingress" />
        </p>
        <p>
            <AppText id="page.velkommen.guide.tekst.1" />
        </p>
    </BodyLong>
);

export default VelkommenGuideContent;
