import { BodyLong, ExpansionCard, Heading, List, VStack } from '@navikt/ds-react';
import { articleList } from './InfoInnhold';
import Article from './components/Article';
import { Process } from '../../components/process';
import ProcessStep from '../../components/process/ProcessStep';

const DrawerArticles = () => {
    return (
        <VStack gap="10">
            <VStack gap="2">
                <Heading level="2" size="medium" spacing={true}>
                    Om ungdomsprogramytelsen
                </Heading>
                {articleList.map((article) => (
                    <ExpansionCard aria-label="Demo med bare tittel" size="small" key={article.id}>
                        <ExpansionCard.Header>
                            <ExpansionCard.Title size="small">{article.title}</ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <Article article={article} />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                ))}
            </VStack>
            <VStack gap="2">
                <Heading level="2" size="medium" spacing={true}>
                    Deltaker, deltakelse og oppgaver
                </Heading>
                <ExpansionCard aria-label="Demo med bare tittel" size="small">
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
                </ExpansionCard>
                <ExpansionCard aria-label="Demo med bare tittel" size="small">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Deltakeroppgaver</ExpansionCard.Title>
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
                            <VStack gap="2">
                                <Heading level="3" size="small">
                                    Send inn søknad
                                </Heading>
                                <BodyLong>
                                    Når deltaker meldes inn i ungdomsprogrammet, vil hen motta en SMS med beskjed om å
                                    sende inn søknad.
                                </BodyLong>
                            </VStack>
                            <VStack gap="2">
                                <Heading level="3" size="small">
                                    Rapportere inntekt
                                </Heading>
                                <BodyLong>
                                    Hver måned mottar deltakeren en oppgave om å rapportere inntekt for forrige måned
                                    (gjelder ikke måneden deltakeren starter i programmet). Hvis deltakeren ikke
                                    rapporterer noe, vil det bli registrert som at hen ikke har hatt inntekt den
                                    måneden.
                                </BodyLong>
                            </VStack>
                            <Heading level="2" size="medium">
                                Tilbakemeldingsoppgaver
                            </Heading>
                            <VStack gap="2">
                                <Heading level="3" size="small">
                                    Endret start- eller sluttdato
                                </Heading>
                                <BodyLong>
                                    Hvis veileder endrer start- eller sluttdato, vil deltakeren få en oppgave med
                                    mulighet til å gi en tilbakemelding på endringen. Tilbakemeldingen vil ikke påvirke
                                    selve endringen.
                                </BodyLong>
                            </VStack>
                            <VStack gap="2">
                                <Heading level="3" size="small">
                                    Avvik i inntekt
                                </Heading>
                                <BodyLong>
                                    Hvis inntekten fra registre for en periode avviker fra det deltakeren har oppgitt,
                                    vil deltakeren få en oppgave der hen kan uttale seg om avviket. Registerført inntekt
                                    vil alltid legges til grunn, og deltakernes tilbakemelding vil ikke endre dette.
                                </BodyLong>
                            </VStack>
                            <Heading level="2" size="medium">
                                Oppgaver som blir avbrutt eller utløper
                            </Heading>
                            <VStack gap="2">
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
                            <VStack gap="2">
                                <Heading level="3" size="small">
                                    Utløpt oppgave
                                </Heading>
                                <BodyLong>
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
