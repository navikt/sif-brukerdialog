import { BodyLong, ExpansionCard, Heading, List, VStack } from '@navikt/ds-react';
import { articleList } from './InfoInnhold';
import Article from './components/Article';

const DrawerArticles = () => {
    return (
        <VStack gap="10">
            <VStack gap="4">
                <Heading level="2" size="medium" spacing={true}>
                    Snakk med deltaker om dette
                </Heading>
                <BodyLong spacing={true}>
                    Når en deltaker blir med ungdomsprogrammet, er det noen ting som må på plass før de kan motta
                    ungdomsprogramytelsen. For at de skal få pengene så raskt som mulig, er det lurt å hjelpe dem med
                    dette
                </BodyLong>
                <ExpansionCard aria-label="Fylle ut og sende søknaden" size="small">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Fylle ut og sende søknaden </ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <BodyLong spacing>
                            Når du har registrert en deltaker, vil deltakeren motta en melding om å logge inn på nav.no
                            for å sende inn søknaden om ungdomsprogramytelsen. Oppfordre deltakerne til å sende søknaden
                            om ungdomsprogramytelsen så fort de er registrert som deltaker i ungdomsprogrammet.
                        </BodyLong>
                    </ExpansionCard.Content>
                </ExpansionCard>
                <ExpansionCard aria-label="Bestille skattekort" size="small">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Bestille skattekort</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        Sjekk at deltakerne har bestilt skattekort (frikort eller vanlig skattekort). Hvis de har
                        skattekort fra før, kan det hende at de må endre det nå. Dersom de ikke har skattekort når
                        pengene skal utbetales, kan det bli trukket så mye som 50 prosent skatt. Så det er viktig at de
                        raskt for dette på plass. Husk: første utbetaling er den 12. i måneden etter de ble med i
                        ungdomsprogrammet.
                    </ExpansionCard.Content>
                </ExpansionCard>
                <ExpansionCard aria-label="Registrere kontonummer" size="small">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Registrere kontonummer</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        Sjekk at deltakerne har en bankkonto som de kan få utbetalt pengene på. Kontonummeret må de
                        registrere på Min side på nav.no. Dette får de beskjed om i søknaden. Deltakere som allerede har
                        registrert kontonummeret sitt hos Nav, trenger ikke å gjøre noe.
                    </ExpansionCard.Content>
                </ExpansionCard>
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="medium" spacing={true}>
                    Om ungdomsprogramytelsen
                </Heading>
                {articleList.map((article) => (
                    <ExpansionCard aria-label={article.title} size="small" key={article.id}>
                        <ExpansionCard.Header>
                            <ExpansionCard.Title size="small">{article.title}</ExpansionCard.Title>
                            {article.ingress && (
                                <ExpansionCard.Description>{article.ingress}</ExpansionCard.Description>
                            )}
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <Article article={article} />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                ))}
            </VStack>
            <VStack gap="4">
                <Heading level="2" size="medium" spacing={true}>
                    Oppgaver og forhåndsvarsel
                </Heading>
                {/* <ExpansionCard aria-label="Eksempel på en deltakerreise" size="small">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Eksempel på en deltakerreise</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <Process>
                            <ProcessStep completed={true} icon={<>1</>}>
                                <Heading size="small" level="3" spacing={true}>
                                    Deltaker meldes inn av veileder
                                </Heading>
                                <BodyLong>
                                    Veileder har en kandidat som skal registreres i ungdomsprogrammet. Veileder søker
                                    opp og melder inn deltaker.
                                </BodyLong>
                            </ProcessStep>
                            <ProcessStep completed={true} icon={<>2</>}>
                                <Heading size="small" level="3" spacing={true}>
                                    Deltaker søker på ungdomsprogramytelsen
                                </Heading>
                                <BodyLong>
                                    Deltaker får melding om at de må logge inn på nav.no for å søke om
                                    ungdomsprogramytelsen. Deltakeren gjør dette og sender inn søknaden.
                                </BodyLong>
                            </ProcessStep>
                            <ProcessStep completed={true} icon={<>3</>}>
                                <Heading size="small" level="3" spacing={true}>
                                    Deltaker får oppgave om å rapportere inntekt
                                </Heading>
                                <BodyLong>
                                    Underveis i deltakelsen får deltaker månedlig valgfrie oppgaver om å registrere
                                    inntekt for forrige måned. Hvis deltaker ikke rapporterer noe, vil det bli
                                    registrert som at deltaker har ingen inntekt forrige periode.
                                </BodyLong>
                            </ProcessStep>
                            <ProcessStep completed={true} icon={<>4</>}>
                                <Heading size="small" level="3" spacing={true}>
                                    Deltaker starter å ha inntekt
                                </Heading>
                                <BodyLong>
                                    Hvis deltaker starter å ha inntekt, skal de registrere dette. Nav vil også motta
                                    informasjon om inntekt og ytelser deltaker mottar fra registre, og hvis dette
                                    avviker fra det deltaker har opplyst, vil deltaker bli informert om dette gjennom en
                                    oppgave hvor de kan uttale seg om endringen.
                                </BodyLong>
                            </ProcessStep>
                            <ProcessStep completed={true} icon={<>5</>}>
                                <Heading size="small" level="3" spacing={true}>
                                    Deltaker meldes ut av programmet
                                </Heading>
                                <BodyLong>Veileder melder ut deltaker.</BodyLong>
                            </ProcessStep>
                        </Process>
                    </ExpansionCard.Content>
                </ExpansionCard> */}
                <ExpansionCard aria-label="Deltakeroppgaver" size="small">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Oppgaver deltaker får på Min side</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="6">
                            <BodyLong>
                                Deltakeren vil underveis motta ulike oppgaver knyttet til ungdomsprogramytelsen. Disse
                                varsles via SMS og leder til Min side på nav.no. Derfra kan deltakeren gå videre til
                                deltakerportalen, hvor hele oppgaven vises.
                            </BodyLong>
                            <Heading level="2" size="medium">
                                Enkeltoppgaver
                            </Heading>
                            <VStack gap="4">
                                <Heading level="3" size="small">
                                    Send inn søknad
                                </Heading>
                                <BodyLong>
                                    Når deltaker meldes inn i ungdomsprogrammet, vil hen motta en SMS med beskjed om å
                                    sende inn søknad.
                                </BodyLong>
                            </VStack>
                            <VStack gap="4">
                                <Heading level="3" size="small">
                                    Rapportere inntekt
                                </Heading>
                                <BodyLong>
                                    Hver måned mottar deltakeren en oppgave om å rapportere inntekt for forrige måned
                                    (gjelder ikke måneden deltakeren starter i programmet). For alle andre måneder skal
                                    deltakerne når måneden er slutt rapportere arbeidsinntekt fra og med den 1. og til
                                    og med den 7. i påfølgende måned.
                                </BodyLong>
                                <BodyLong>
                                    Hvis deltakeren ikke rapporterer noe, vil det bli registrert som at hen ikke har
                                    hatt inntekt den måneden.
                                </BodyLong>
                                <BodyLong>
                                    Deltakere som melder fra om riktig inntekt, slipper at kontrollen av inntekt mot
                                    register fører til forhåndsvarsling, som igjen kan resultere i for sen utbetaling.
                                    Det er derfor viktig å motivere deltakere med inntekt til å melde fra om denne.
                                </BodyLong>
                            </VStack>
                            <Heading level="2" size="medium">
                                Oppgaver knyttet til forhåndsvarsling
                            </Heading>
                            <BodyLong>
                                Dersom det er andre enn deltaker som har gitt opplysninger som kan påvirke resultatet av
                                en behandling som gjelder ungdomsprogramytelsen, så blir deltaker forhåndsvarslet jf.
                                forvaltningsloven § 16.{' '}
                            </BodyLong>
                            <VStack gap="4">
                                <Heading level="3" size="small">
                                    Endret start- eller sluttdato
                                </Heading>
                                <BodyLong>
                                    Hvis veileder endrer start- eller sluttdato, vil deltakeren få en oppgave med
                                    mulighet til å uttale seg før vedtak om endring i ungdomsprogramytelsen fattes.
                                    Siden det har vært dialog med veileder før start- eller sluttdato settes er det
                                    forventet at de fleste deltakere ikke har en tilbakemelding. Det er likevel viktig
                                    at de svarer at de ikke vil komme med en uttalelse/tilbakemelding, slik at
                                    behandlingen raskt kan gjennomføres. Slik begrenes antall feilutbetalingssaker.
                                    Ønsker en deltaker å komme med en uttalelse/tilbakemelding, blir de oppfordret til å
                                    snakke med veileder først.
                                </BodyLong>
                            </VStack>
                            <VStack gap="4">
                                <Heading level="3" size="small">
                                    Avvik i inntekt
                                </Heading>
                                <BodyLong>
                                    Hvis inntekten fra arbeidsgiver som mottas fra register for en periode avviker fra
                                    det deltakeren har oppgitt, vil deltakeren få en oppgave der hen kan uttale seg om
                                    avviket. Dersom deltaker kommer med en uttalelse, da hen eksempelvis mener at det er
                                    en annen inntekt som skulle vært lagt til grunn, så skal en saksbehandler vurdere
                                    dette før behandlingen gjennomføres. Dette kan forsinke utbetalingen til deltaker.
                                    Det er derfor viktig at alle deltakere som har arbeidsinntekt oppfordres til å melde
                                    fra om riktig inntekt.
                                </BodyLong>
                            </VStack>
                            <Heading level="2" size="medium">
                                Oppgaver som blir avbrutt eller utløper
                            </Heading>
                            <VStack gap="4">
                                <Heading level="3" size="small">
                                    Avbrutt oppgave
                                </Heading>
                                <BodyLong>
                                    Noen oppgaver kan bli avbrutt hvis de blir utdaterte eller erstattet, for eksempel
                                    ved endring av start- eller sluttdato. Når veileder endrer dato, opprettes det en
                                    oppgave. Gjør veileder en ny endring før deltakeren har svart, blir den første
                                    oppgaven automatisk avbrutt og erstattet med en ny.
                                </BodyLong>
                            </VStack>
                            <VStack gap="4">
                                <Heading level="3" size="small">
                                    Utløpt oppgave
                                </Heading>
                                <BodyLong as="div">
                                    Alle oppgaver har en utløpsdato. Hvis deltakeren ikke svarer innen denne fristen,
                                    blir oppgaven satt som utløpt.
                                    <List>
                                        <List.Item>
                                            For den månedlige inntektsrapporteringen behandles dette som at deltakeren
                                            ikke hadde inntekt den måneden.
                                        </List.Item>
                                        <List.Item>
                                            For andre oppgaver betyr det at deltakeren ikke lenger har mulighet til å gi
                                            tilbakemelding.
                                        </List.Item>
                                    </List>
                                </BodyLong>
                            </VStack>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
            </VStack>
        </VStack>
    );
};

export default DrawerArticles;
