import { BodyLong, Heading, InfoCard, Link, LinkCard, VStack } from '@navikt/ds-react';

import { AppText, useAppIntl } from '../../i18n';
import { browserEnv } from '../../utils/env';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';

const IngenSakEllerSøknadPage = () => {
    const { text } = useAppIntl();
    return (
        <DefaultPageLayout documentTitle={text('forside.dokumentTittel')}>
            <VStack gap="space-32">
                <InfoCard data-color="info">
                    <InfoCard.Header>
                        <InfoCard.Title>
                            <AppText id="ingeSakPage.melding.tittel" />
                        </InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        <BodyLong spacing={true}>
                            <AppText id="ingeSakPage.melding.tekst" />
                        </BodyLong>

                        <Heading level="3" size="xsmall" spacing>
                            <AppText id="ingeSakPage.melding.andreYtelser.tittel" />
                        </Heading>
                        <BodyLong spacing>
                            <AppText id="ingeSakPage.melding.andreYtelser.tekst.avsnitt.1" />
                        </BodyLong>

                        <BodyLong spacing>
                            <AppText
                                id="ingeSakPage.melding.andreYtelser.tekst.avsnitt.2"
                                values={{
                                    lenkeMinSide: (children: any) => (
                                        <Link href={browserEnv.NEXT_PUBLIC_MIN_SIDE_URL}>{children}</Link>
                                    ),
                                    lenkeInnboksen: (children: any) => (
                                        <Link href={browserEnv.NEXT_PUBLIC_INNBOKS_URL}>{children}</Link>
                                    ),
                                }}
                            />
                        </BodyLong>
                        <BodyLong spacing>
                            <AppText
                                id="ingeSakPage.melding.andreYtelser.tekst.avsnitt.3"
                                values={{
                                    Lenke: (children: any) => (
                                        <Link href={browserEnv.NEXT_PUBLIC_NAV_URL}>{children}</Link>
                                    ),
                                }}
                            />
                        </BodyLong>
                    </InfoCard.Content>
                </InfoCard>

                <div>
                    <Heading level="2" size="medium" spacing>
                        <AppText id="ingeSakPage.snarveier.tittel" />
                    </Heading>
                    <VStack gap="space-12">
                        <LinkCard>
                            <LinkCard.Title>
                                <LinkCard.Anchor href={browserEnv.NEXT_PUBLIC_PLEIEPENGER_INFO_URL}>
                                    <AppText id="snarveier.omPleiepenger" />
                                </LinkCard.Anchor>
                            </LinkCard.Title>
                        </LinkCard>
                        <LinkCard>
                            <LinkCard.Title>
                                <LinkCard.Anchor href={browserEnv.NEXT_PUBLIC_SKJEMA_PLEIEPENGER_URL}>
                                    <AppText id="snarveier.søkOmPleiepenger" />
                                </LinkCard.Anchor>
                            </LinkCard.Title>
                        </LinkCard>
                    </VStack>
                </div>
            </VStack>
        </DefaultPageLayout>
    );
};

export default IngenSakEllerSøknadPage;
