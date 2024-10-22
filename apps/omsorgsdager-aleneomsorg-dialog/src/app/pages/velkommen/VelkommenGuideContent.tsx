import { BodyLong, Heading, Link, List } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import React from 'react';
import { AppText } from '../../i18n';
import { appEnv } from '../../utils/appEnv';

const { SIF_PUBLIC_OMS_IKKE_TILSYN_URL } = appEnv;

const VelkommenGuideContent = () => (
    <>
        <BodyLong as="div">
            <BodyLong size="large">
                <AppText id="page.velkommen.guide.ingress" />
            </BodyLong>

            <p>
                <AppText
                    id="page.velkommen.guide.tekst.1.1"
                    values={{
                        Lenke: (children: React.ReactNode) => (
                            <Link href={SIF_PUBLIC_OMS_IKKE_TILSYN_URL} inlineText={true}>
                                {children}
                            </Link>
                        ),
                    }}
                />
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
                        Lenke: (children: React.ReactNode) => (
                            <Link href={SIF_PUBLIC_OMS_IKKE_TILSYN_URL} inlineText={true}>
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
    </>
);

export default VelkommenGuideContent;
