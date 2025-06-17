import { ExpansionCard, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { articleList } from './InfoInnhold';
import Article from './components/Article';

const DrawerArticles = () => {
    return (
        <VStack gap="10">
            <VStack gap="2">
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
            {/* <VStack gap="2">
                <Heading level="2" size="medium" className="mb-4">
                    Om funksjoner i deltakerregistrering
                </Heading>
                <ReadMore header="Registrere eller finne deltaker">TODO</ReadMore>
                <ReadMore header="Melde inn deltaker">TODO</ReadMore>
                <ReadMore header="Endre startdato">TODO</ReadMore>
                <ReadMore header="Melde ut deltaker eller endre sluttdato">TODO</ReadMore>
                <ReadMore header="Slette deltaker">
                    Veileder kan slette en deltaker frem til deltaker har søkt.
                </ReadMore>
            </VStack> */}
            <VStack gap="2">
                <Heading level="2" size="medium" className="mb-4">
                    Eksempel på en deltakerreise
                </Heading>
                <ReadMore header="1. Deltaker meldes inn av veileder">
                    Veileder har en deltaker som skal registreres i ungdomsprogrammet. Veileder søker opp og melder inn
                    deltaker.
                </ReadMore>
                <ReadMore header="2. Deltaker søker på ungdomsprogramytelsen">
                    Deltaker får melding om at de må logge inn på nav.no for å søke om ungdomsprogramytelsen. Deltakeren
                    gjør dette og sender inn søknad.
                </ReadMore>
                <ReadMore header="3. Deltaker får månedlig oppgave om å rapportere inntekt">
                    Underveis i deltakelsen mottar deltaker månedlig valgfrie oppgaver om å registrere inntekt for
                    forrige måned. Hvis deltaker ikke rapporterer noe, vil det bli registrert som at deltaker har ingen
                    inntekt forrige periode.
                </ReadMore>
                <ReadMore header="4. Deltaker starter å ha inntekt">
                    Hvis deltaker starter å få inntekt, skal de registrere dette. Nav vil også motta informasjon om
                    inntekt og ytelser deltaker mottar , og hvis dette avviker fra det deltaker har opplyst, vil
                    deltaker bli informert om dette.
                </ReadMore>
                <ReadMore header="5. Deltaker meldes ut av programmet">Veileder melder ut deltaker.</ReadMore>
            </VStack>
        </VStack>
    );
};

export default DrawerArticles;
