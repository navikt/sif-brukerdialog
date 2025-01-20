import { BodyLong, Link } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';

const VelkommenGuideContent = () => {
    const { locale } = useAppIntl();
    return (
        <BodyLong as="div">
            <p>
                <AppText id="page.velkommen.guide.ingress" />
            </p>
            <p>
                <AppText id="page.velkommen.guide.tekst.1" />
            </p>
            <p>
                <AppText
                    id="page.velkommen.guide.tekst.2"
                    values={{ Lenke: (text) => <Link href={getLenker(locale).opplæringspengerNavNo}>{text}</Link> }}
                />
            </p>
        </BodyLong>
    );
};
export default VelkommenGuideContent;
