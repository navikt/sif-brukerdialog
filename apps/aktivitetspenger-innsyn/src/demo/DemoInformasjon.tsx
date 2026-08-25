import { BodyLong, GlobalAlert, List, ReadMore, Theme, VStack } from '@navikt/ds-react';
import { InnsynPageBoundary } from '@sif/ung-innsyn/components';

const DemoInformasjon = () => {
    return (
        <Theme hasBackground={false}>
            <VStack gap="space-40">
                <InnsynPageBoundary>
                    <GlobalAlert status="announcement">
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>Demo</GlobalAlert.Title>
                        </GlobalAlert.Header>
                        <GlobalAlert.Content>
                            <VStack gap="space-8">
                                <BodyLong as="div">Demo - Dine aktivitetspenger</BodyLong>
                                <BodyLong weight="semibold" as="div">
                                    All informasjon og datoer som vises i denne er fiktive demodata.
                                </BodyLong>

                                <ReadMore header="Mer informasjon om bruk av demoen" size="small">
                                    <List>
                                        <List.Item>
                                            Du kan utforske fritt – alt du gjør her påvirker kun demoen, og ingenting
                                            sendes videre til andre systemer.
                                        </List.Item>
                                        <List.Item>
                                            Du velger mellom ulike scenarioer i menyen &quot;Velg scenario&quot; oppe
                                            til høyre
                                        </List.Item>
                                        <List.Item>
                                            Demoen oppfører seg som for en faktisk bruker – for eksempel vil oppgaver du
                                            har besvart vises som besvart etterpå.
                                        </List.Item>
                                        <List.Item>Når du bytter scenario, nullstilles informasjonen.</List.Item>
                                        <List.Item>Lenker til andre sider virker ikke.</List.Item>
                                    </List>
                                </ReadMore>
                            </VStack>
                        </GlobalAlert.Content>
                    </GlobalAlert>
                </InnsynPageBoundary>
            </VStack>
        </Theme>
    );
};

export default DemoInformasjon;
