import { BodyLong, Box, GuidePanel, Heading, InfoCard, Link, VStack } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../i18n';
import { Søker } from '@sif/api/k9-prosessering';
import { TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';
import { Todo } from '../../components/Todo';
import getLenker from '../../lenker';
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
    const { harInnsyn, harUbehandletSøknad } = tilgjengelig;

    const renderContent = () => {
        switch (getKanIkkeSøkeÅrsak(harInnsyn, harUbehandletSøknad)) {
            case KanIkkeSøkeÅrsak.IKKE_INNSYN_UBEHANDLET_SØKNAD:
                return (
                    <VStack gap="space-20">
                        <Todo>[harUbehandletSøknad && !harInnsyn]</Todo>
                        <BodyLong>
                            Vi har mottatt din søknad og den er under behandling. Du trenger ikke sende inn ny søknad.
                        </BodyLong>
                        <BodyLong>Du vil høre fra oss ...</BodyLong>
                    </VStack>
                );
            case KanIkkeSøkeÅrsak.INNSYN_UBEHANDLET_SØKNAD:
                return (
                    <VStack gap="space-20">
                        <Todo>[!harUbehandletSøknad && harInnsyn]</Todo>
                        <BodyLong>
                            Når du har fått innvilget aktivitetspenger trenger du ikke søke på nytt før ...
                        </BodyLong>
                        <BodyLong>
                            Gå til <Link href="/innsyn">Dine aktivitetspenger</Link> for mer informasjon.
                        </BodyLong>
                    </VStack>
                );
            case KanIkkeSøkeÅrsak.ANNET:
                return (
                    <VStack gap="space-20">
                        <Todo>[annet]</Todo>
                        <BodyLong>Du kan ikke sende inn ny søknad på dette tidspunktet.</BodyLong>
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
                        <InfoCard.Title>Søknad er ikke tilgjengelig for deg nå</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>{renderContent()}</InfoCard.Content>
                </InfoCard>
            </VStack>
        </ApplicationPage>
    );
};
