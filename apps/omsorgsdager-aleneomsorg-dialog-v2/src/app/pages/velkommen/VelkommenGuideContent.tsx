import { AppText } from '@app/i18n';
import { BodyLong, Heading, Link, List } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import { ReactNode } from 'react';

import { getAppEnv } from '../../setup/appEnv';

export const VelkommenGuideContent = () => (
    <BodyLong as="div">
        <BodyLong size="large">
            <AppText id="page.velkommen.guide.ingress" />
        </BodyLong>
        <p>
            <AppText id="page.velkommen.guide.tekst.1.1" />
        </p>
        <List>
            <ListItem>
                <AppText id="page.velkommen.guide.tekst.1.1.a" />
            </ListItem>
            <ListItem>
                <AppText id="page.velkommen.guide.tekst.1.1.b" />
            </ListItem>
            <ListItem>
                <AppText id="page.velkommen.guide.tekst.1.1.c" />
            </ListItem>
        </List>
        <p>
            <AppText id="page.velkommen.guide.tekst.3" />
        </p>
        <Heading level="2" size="small">
            <AppText id="page.velkommen.guide.tekst.1.2.tittel" />
        </Heading>
        <p>
            <AppText
                id="page.velkommen.guide.tekst.1.2"
                values={{
                    Lenke: (children: ReactNode) => (
                        <Link href={getAppEnv().SIF_PUBLIC_OMS_IKKE_TILSYN_URL} inlineText={true}>
                            {children}
                        </Link>
                    ),
                }}
            />
        </p>
        <p>
            <AppText id="page.velkommen.guide.tekst.2" />
        </p>
    </BodyLong>
);
