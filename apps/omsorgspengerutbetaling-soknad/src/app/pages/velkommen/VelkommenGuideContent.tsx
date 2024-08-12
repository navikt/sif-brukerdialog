import { BodyLong, Link } from '@navikt/ds-react';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';

const VelkommenGuideContent = () => (
    <>
        <BodyLong size="large">
            <AppText id="page.velkommen.guide.ingress" />
        </BodyLong>
        <p>
            <AppText id="page.velkommen.guide.tekst.1" values={{ Strong: (children) => <strong>{children}</strong> }} />
        </p>
        <p>
            <AppText
                id="page.velkommen.guide.tekst.2"
                values={{ Lenke: (children) => <Link href={getLenker().inntektsmelding}>{children}</Link> }}
            />
        </p>
    </>
);

export default VelkommenGuideContent;
