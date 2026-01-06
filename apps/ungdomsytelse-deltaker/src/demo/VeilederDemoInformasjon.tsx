import { BodyLong, GlobalAlert, List, ReadMore, Theme, VStack } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';

const VeilederDemoInformasjon = () => {
    return (
        <Theme hasBackground={false}>
            <VStack gap="10">
                <PageBoundary>
                    <GlobalAlert status="announcement">
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>Demo</GlobalAlert.Title>
                        </GlobalAlert.Header>
                        <GlobalAlert.Content>
                            <VStack gap="2">
                                <BodyLong as="div">
                                    Dette er en demo av hvordan søknadsskjema og deltakersider ser ut for en deltaker i
                                    ungdomsprogrammet.
                                </BodyLong>
                                <BodyLong weight="semibold" as="div">
                                    All informasjon og datoer som vises i denne er fiktive demodata.
                                </BodyLong>

                                <ReadMore header="Mer informasjon om bruk av demoen" size="small">
                                    <List>
                                        <List.Item>
                                            Denne demoen er en interaktiv løsning der du kan sende inn en søknad og
                                            besvare oppgaver slik en deltaker ville gjort.
                                        </List.Item>
                                        <List.Item>
                                            Du kan utforske fritt – alt du gjør her påvirker kun demoen, og ingenting
                                            sendes videre til andre systemer.
                                        </List.Item>
                                        <List.Item>
                                            I menyen «Velg deltakerscenario» oppe til høyre kan du bytte mellom
                                            søknadsskjemaet og deltakersidene.
                                        </List.Item>
                                        <List.Item>
                                            Demoen oppfører seg som for en faktisk deltaker – for eksempel vil oppgaver
                                            du har besvart vises som besvart etterpå.
                                        </List.Item>
                                        <List.Item>Når du bytter scenario, nullstilles informasjonen.</List.Item>
                                        <List.Item>Lenker til andre sider virker ikke.</List.Item>
                                    </List>
                                </ReadMore>
                            </VStack>
                        </GlobalAlert.Content>
                    </GlobalAlert>
                </PageBoundary>
            </VStack>
        </Theme>
    );
};

export default VeilederDemoInformasjon;
