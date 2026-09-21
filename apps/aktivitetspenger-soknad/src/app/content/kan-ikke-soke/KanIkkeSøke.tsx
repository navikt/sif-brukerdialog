import { BodyLong, Box, GuidePanel, Heading, Link, VStack } from '@navikt/ds-react';
import { AppText, useAppIntl } from '@app/i18n';
import { Søker } from '@sif/api/k9-prosessering';
import { TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';
import getLenker from '@app/lenker';
import { ApplicationPage, SifSoknadUiText } from '@sif/soknad-ui';

import { getKanIkkeSøkeÅrsak, KanIkkeSøkeÅrsak } from './kanIkkeSøkeUtils';

interface Props {
    søker: Søker;
    tilgjengelig: TilgjengeligSøknadResponse;
}

export const KanIkkeSøkePage = ({ søker, tilgjengelig }: Props) => {
    const { text } = useAppIntl();
    const { harInnsyn, harUbehandletSøknad } = tilgjengelig;

    const innsynLenke = harInnsyn ? (
        <BodyLong>
            <AppText
                id="page.kanIkkeSøke.innsynLenke"
                values={{
                    InnsynLenke: (children) => <Link href={getLenker().aktivitetspengerInnsyn}>{children}</Link>,
                }}
            />
        </BodyLong>
    ) : null;

    const renderContent = () => {
        switch (getKanIkkeSøkeÅrsak(harInnsyn, harUbehandletSøknad)) {
            case KanIkkeSøkeÅrsak.UBEHANDLET_FØRSTEGANGSSØKNAD:
                return (
                    <VStack gap="space-20">
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.ubehandletFørstegangssøknad" />
                        </BodyLong>
                    </VStack>
                );
            case KanIkkeSøkeÅrsak.UBEHANDLET_ANDREGANGSSØKNAD:
                return (
                    <VStack gap="space-20">
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.ubehandletAndregangssøknad" />
                        </BodyLong>
                        {innsynLenke}
                    </VStack>
                );
            case KanIkkeSøkeÅrsak.UTENFOR_SØKNADSVINDU:
                return (
                    <VStack gap="space-20">
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.utenforSøknadsvindu" />
                        </BodyLong>
                        {innsynLenke}
                    </VStack>
                );
            case KanIkkeSøkeÅrsak.ANNET:
                return (
                    <VStack gap="space-20">
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.annet" />
                        </BodyLong>
                        {innsynLenke}
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
