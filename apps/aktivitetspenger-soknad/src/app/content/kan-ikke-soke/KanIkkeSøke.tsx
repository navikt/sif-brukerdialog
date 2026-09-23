import { AppText, useAppIntl } from '@app/i18n';
import getLenker from '@app/lenker';
import { BodyLong, Box, GuidePanel, Heading, Link, VStack } from '@navikt/ds-react';
import { TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';
import { Søker } from '@sif/api/k9-prosessering';
import { ApplicationPage, SifSoknadUiText } from '@sif/soknad-ui';

import { getKanIkkeSøkeÅrsak, KanIkkeSøkeÅrsak } from './kanIkkeSøkeUtils';

interface Props {
    søker: Søker;
    tilgjengelig: TilgjengeligSøknadResponse;
}

export const KanIkkeSøkePage = ({ søker, tilgjengelig }: Props) => {
    const { text } = useAppIntl();
    const { harInnsyn, harUbehandletSøknad } = tilgjengelig;

    const renderContent = () => {
        const årsak = getKanIkkeSøkeÅrsak(harInnsyn, harUbehandletSøknad);
        switch (årsak) {
            case KanIkkeSøkeÅrsak.UBEHANDLET_FØRSTEGANGSSØKNAD:
            case KanIkkeSøkeÅrsak.UBEHANDLET_ANDREGANGSSØKNAD:
                return (
                    <VStack gap="space-20">
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.ubehandletSøknad.1" />
                        </BodyLong>
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.ubehandletSøknad.2" />
                        </BodyLong>
                        <BodyLong>
                            <AppText
                                id="page.kanIkkeSøke.ubehandletSøknad.sendBeskjed"
                                values={{
                                    Lenke: (children) => <Link href={getLenker().sendBeskjed}>{children}</Link>,
                                }}
                            />
                        </BodyLong>
                        {harInnsyn && (
                            <BodyLong>
                                <AppText
                                    id="page.kanIkkeSøke.innsynLenke"
                                    values={{
                                        Lenke: (children) => (
                                            <Link href={getLenker().aktivitetspengerInnsyn}>{children}</Link>
                                        ),
                                    }}
                                />
                            </BodyLong>
                        )}
                    </VStack>
                );
            case KanIkkeSøkeÅrsak.UTENFOR_SØKNADSVINDU:
                return (
                    <VStack gap="space-20">
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.utenforSøknadsvindu.1" />
                        </BodyLong>
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.utenforSøknadsvindu.2" />
                        </BodyLong>
                        <BodyLong>
                            <AppText
                                id="page.kanIkkeSøke.innsynLenke"
                                values={{
                                    Lenke: (children) => (
                                        <Link href={getLenker().aktivitetspengerInnsyn}>{children}</Link>
                                    ),
                                }}
                            />
                        </BodyLong>
                        <BodyLong>
                            <AppText
                                id="page.kanIkkeSøke.utenforSøknadsvindu.sendBeskjed"
                                values={{
                                    Lenke: (children) => <Link href={getLenker().sendBeskjed}>{children}</Link>,
                                }}
                            />
                        </BodyLong>
                    </VStack>
                );
            case KanIkkeSøkeÅrsak.ANNET:
                return (
                    <VStack gap="space-20">
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.annet" />
                        </BodyLong>
                    </VStack>
                );
        }
    };
    return (
        <ApplicationPage applicationTitle={text('application.title')} headerLevel="1">
            <VStack gap="space-32">
                <GuidePanel poster={true}>
                    <Box paddingBlock="space-8 space-0">
                        <Heading level="2" size="medium" spacing={true}>
                            <SifSoknadUiText
                                id="@sifSoknadUi.startPage.guide.greeting"
                                values={{ navn: søker.fornavn }}
                            />
                        </Heading>
                        {renderContent()}
                    </Box>
                </GuidePanel>
            </VStack>
        </ApplicationPage>
    );
};
