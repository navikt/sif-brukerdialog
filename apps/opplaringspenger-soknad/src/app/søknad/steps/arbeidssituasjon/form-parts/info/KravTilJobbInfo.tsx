import { Alert, BodyLong, Heading, Link, List } from '@navikt/ds-react';

import { AppText, useAppIntl } from '../../../../../i18n';
import getLenker from '../../../../../lenker';

const KravTilJobbInfo = () => {
    const { locale } = useAppIntl();
    return (
        <Alert variant="warning">
            <Heading level="2" size="small" spacing>
                <AppText id="steg.arbeidssituasjon.jobbInfo.tittel" />
            </Heading>
            <BodyLong spacing>
                <AppText id="steg.arbeidssituasjon.jobbInfo.1" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="steg.arbeidssituasjon.jobbInfo.2" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="steg.arbeidssituasjon.jobbInfo.3" />
            </BodyLong>
            <List>
                <List.Item>
                    <AppText id="steg.arbeidssituasjon.jobbInfo.3.1" />
                </List.Item>
                <List.Item>
                    <AppText id="steg.arbeidssituasjon.jobbInfo.3.2" />
                </List.Item>
                <List.Item>
                    <AppText id="steg.arbeidssituasjon.jobbInfo.3.3" />
                </List.Item>
                <List.Item>
                    <AppText id="steg.arbeidssituasjon.jobbInfo.3.4" />
                </List.Item>
            </List>
            <BodyLong>
                <Link
                    href={getLenker(locale).opplæringspengerNavNo}
                    data-color="neutral"
                    target="_blank"
                    rel="noopener noreferrer">
                    <AppText id="steg.arbeidssituasjon.jobbInfo.4" />
                </Link>
            </BodyLong>
        </Alert>
    );
};

export default KravTilJobbInfo;
