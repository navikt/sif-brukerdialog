import { BodyLong, Box, GuidePanel, Heading, InfoCard, Link, VStack } from '@navikt/ds-react';
import { AppText, useAppIntl } from '@app/i18n';
import { Søker } from '@sif/api/k9-prosessering';
import { TilgjengeligSøknadResponse, TilgjengeligSøknadType } from '@navikt/ung-brukerdialog-api';
import { Todo } from '@app/components/Todo';
import getLenker from '@app/lenker';
import { ApplicationPage, SifSoknadUiText } from '@sif/soknad-ui';
interface Props {
    søker: Søker;
    tilgjengelig: TilgjengeligSøknadResponse;
}

export enum KanIkkeSøkeÅrsak {
    IKKE_INNSYN_UBEHANDLET_SØKNAD = 'IKKE_INNSYN_UBEHANDLET_SØKNAD',
    INNSYN_UBEHANDLET_SØKNAD = 'INNSYN_UBEHANDLET_SØKNAD',
    ANNET = 'ANNET',
}

export const getKanIkkeSøkeÅrsak = (
    harInnsyn: boolean | undefined,
    harUbehandletSøknad: boolean | undefined,
): KanIkkeSøkeÅrsak => {
    if (harUbehandletSøknad && !harInnsyn) {
        return KanIkkeSøkeÅrsak.IKKE_INNSYN_UBEHANDLET_SØKNAD;
    }
    if (!harUbehandletSøknad && harInnsyn) {
        return KanIkkeSøkeÅrsak.INNSYN_UBEHANDLET_SØKNAD;
    }
    return KanIkkeSøkeÅrsak.ANNET;
};

export const KanIkkeSøkePage = ({ søker, tilgjengelig }: Props) => {
    const { text } = useAppIntl();
    const { harInnsyn, harUbehandletSøknad, type } = tilgjengelig;

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
        if (type === TilgjengeligSøknadType.NY_PERIODE_SØKNAD) {
            return (
                <VStack gap="space-20">
                    <Todo>[type === {TilgjengeligSøknadType.NY_PERIODE_SØKNAD}]</Todo>
                    <BodyLong>
                        <AppText id="page.kanIkkeSøke.nyPeriode" />
                    </BodyLong>
                    {innsynLenke}
                </VStack>
            );
        }
        switch (getKanIkkeSøkeÅrsak(harInnsyn, harUbehandletSøknad)) {
            case KanIkkeSøkeÅrsak.IKKE_INNSYN_UBEHANDLET_SØKNAD:
                return (
                    <VStack gap="space-20">
                        <Todo>[harUbehandletSøknad && !harInnsyn]</Todo>
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.ubehandletSøknad" />
                        </BodyLong>
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.ubehandletSøknad.videre" />
                        </BodyLong>
                    </VStack>
                );
            case KanIkkeSøkeÅrsak.INNSYN_UBEHANDLET_SØKNAD:
                return (
                    <VStack gap="space-20">
                        <Todo>[!harUbehandletSøknad && harInnsyn]</Todo>
                        <BodyLong>
                            <AppText id="page.kanIkkeSøke.harInnsyn" />
                        </BodyLong>
                        {innsynLenke}
                    </VStack>
                );
            case KanIkkeSøkeÅrsak.ANNET:
                return (
                    <VStack gap="space-20">
                        <Todo>[annet]</Todo>
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
                        <BodyLong as="div">
                            <BodyLong spacing>
                                <AppText id="page.velkommen.guide.info.2" />
                            </BodyLong>
                            <BodyLong spacing>
                                <AppText id="page.velkommen.guide.info.3" />
                            </BodyLong>
                            <BodyLong spacing>
                                <AppText
                                    id="page.velkommen.guide.info.4"
                                    values={{
                                        Lenke: (children) => <Link href={getLenker().navForside}>{children}</Link>,
                                    }}
                                />
                            </BodyLong>
                        </BodyLong>
                    </Box>
                </GuidePanel>

                <InfoCard data-color="info">
                    <InfoCard.Header>
                        <InfoCard.Title>
                            <AppText id="page.kanIkkeSøke.tittel" />
                        </InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>{renderContent()}</InfoCard.Content>
                </InfoCard>
            </VStack>
        </ApplicationPage>
    );
};
