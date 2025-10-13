import { Alert, List, ReadMore, VStack } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';

const VeilederDemoInformasjon = () => (
    <VStack gap="10">
        <PageBoundary>
            <Alert variant="warning" fullWidth={true} className="w-full">
                Demo av søknadsskjema og deltakersider for ungdomsprogrammet
                <ReadMore header="Mer informasjon" size="small">
                    <List>
                        <List.Item>
                            Denne demoen er en interaktiv løsning der du kan sende inn en søknad og besvare oppgaver
                            slik en deltaker ville gjort.
                        </List.Item>
                        <List.Item>
                            Du kan utforske fritt – alt du gjør her påvirker kun demoen, og ingenting sendes videre til
                            andre systemer.
                        </List.Item>
                        <List.Item>
                            I menyen «Velg deltakerscenario» oppe til høyre kan du bytte mellom søknadsskjemaet og
                            deltakersidene.
                        </List.Item>
                        <List.Item>
                            Demoen husker midlertidig det du gjør, slik at den oppfører seg som for en faktisk deltaker
                            – for eksempel vil oppgaver du har besvart vises som besvart etterpå.
                        </List.Item>
                        <List.Item>Når du bytter scenario, nullstilles demoen.</List.Item>
                        <List.Item>Lenker til andre sider virker ikke i denne demoen.</List.Item>
                        <List.Item>Datoer i demoen er ikke korrekte, og kan være inkonsekvente.</List.Item>
                    </List>
                </ReadMore>
            </Alert>
        </PageBoundary>
    </VStack>
);

export default VeilederDemoInformasjon;
