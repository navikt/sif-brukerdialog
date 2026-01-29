/* eslint-disable max-len */
import { Alert, BodyLong, Box, Heading, HStack, List, Radio, RadioGroup, ReadMore, VStack } from '@navikt/ds-react';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ReactNode, useEffect, useState } from 'react';
import { getSjekklisteStatus, JaNei, SjekklisteValues, spørsmål } from './sjekklisteUtils';
import ExternalLink from '../external-link/ExternalLink';

interface SpørsmålInnhold {
    legend: string;
    description: ReactNode;
}

/** Innhold for hvert spørsmål - legend og description */
const spørsmålInnhold: SpørsmålInnhold[] = [
    {
        legend: '1. Tilhører den unge et kontor som deltar i forsøket?',
        description: (
            <ReadMore header="Les mer om forsøkskontorene">
                <BodyLong>
                    Deltakere i ungdomsprogrammet må tilhøre et av følgende kontor som deltar i forsøket: Arendal,
                    Bergen Sør, Bergen Vest, Kristiansand, Porsgrunn, Sandefjord eller Skien.
                </BodyLong>
                <List>
                    <List.Item>
                        <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-3">
                            Les mer om § 2 i rundskriv til forskrift om forsøk med ungdomsprogram og
                            ungdomsprogramytelse.
                        </ExternalLink>
                    </List.Item>
                </List>
            </ReadMore>
        ),
    },
    {
        legend: '2. Mottar den unge andre livsoppholdsytelser?',
        description: (
            <ReadMore header="Les mer om livsoppholdsytelser">
                <VStack gap="space-8">
                    <BodyLong>
                        Den unge kan ikke motta ungdomsprogramytelsen samtidig som hen mottar andre livsoppholdsytelser,
                        med noen unntak.
                    </BodyLong>
                    <List>
                        <List.Item>
                            <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_4-6">
                                Les mer om § 12 i rundskriv til forskrift om forsøk med ungdomsprogram og
                                ungdomsprogramytelse.
                            </ExternalLink>
                        </List.Item>
                        <List.Item>
                            <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                                Les mer om § 3 i rundskriv til forskrift om forsøk med ungdomsprogram og
                                ungdomsprogramytelse.
                            </ExternalLink>
                        </List.Item>
                    </List>
                </VStack>
            </ReadMore>
        ),
    },
    {
        legend: '3. Er den unge mellom 18 og 29 år ved oppstart, har hen et fastsatt bistandsbehov fra Nav, og har hen ikke tidligere deltatt i ungdomsprogrammet?',
        description: (
            <ReadMore header="Les mer om alder, bistandsbehov og tidligere deltakelse">
                <VStack gap="space-8">
                    <BodyLong>
                        Den unge kan tidligst starte i programmet den dagen hen fyller 18 år, og senest dagen før hen
                        fyller 29 år.
                    </BodyLong>
                    <BodyLong>
                        Den unge må ha fått en vurdering fra Nav om at hen trenger veiledning og støtte for å komme i
                        jobb, i henhold til ungdomsgarantien.
                    </BodyLong>
                    <BodyLong>Den unge kan ikke ha deltatt i ungdomsprogrammet tidligere.</BodyLong>
                    <List>
                        <List.Item>
                            <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                                Les mer om § 3 første ledd bokstav a, b og c i rundskriv til forskrift om forsøk med
                                ungdomsprogram og ungdomsprogramytelse.
                            </ExternalLink>
                        </List.Item>
                    </List>
                </VStack>
            </ReadMore>
        ),
    },
    {
        legend: '4. Ønsker den unge å delta i ungdomsprogrammet?',
        description: (
            <ReadMore header="Les mer om ønsket om å delta">
                <BodyLong>
                    Den unge må ha gitt uttrykk for å at hen ønsker å delta i programmet. Hen må også ha fått god
                    informasjon om hvilke forventninger vi stiller, og hvilke aktiviteter som kan inngå, og
                    egeninnsatsen det krever av den unge.
                </BodyLong>
                <List>
                    <List.Item>
                        <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                            Les mer om § 3 første ledd bokstav d i rundskriv til forskrift om forsøk med ungdomsprogram
                            og ungdomsprogramytelse.
                        </ExternalLink>
                    </List.Item>
                </List>
            </ReadMore>
        ),
    },
    {
        legend: '5. Er den unge i stand til å delta i programmet på fulltid, vil den unge kunne bli i stand til å komme i arbeid eller utdanning gjennom å delta i programmet, og vil det være hensiktsmessig og nødvendig for den unge å delta?',
        description: (
            <VStack gap="space-6">
                <ReadMore header="Les mer om det å være i stand til å delta på fulltid">
                    <VStack gap="space-8">
                        <BodyLong>
                            Aktivitetene i planen til den unge skal være individuelt tilpasset, og planen er noe du og
                            den unge skal finne ut av sammen. Når du som veileder skal vurdere om den unge er i stand
                            til å delta i et fulltidsprogram, er det viktig å huske på dette. Planen kan for eksempel
                            tilpasses med en større grad av egenaktivitet i den første perioden, med gradvis opptrapping
                            og tilvenning.
                        </BodyLong>
                        <BodyLong>
                            Aktivitetene kan være for eksempel kartlegging, karriereveiledning, individuell oppfølging,
                            egentrening, medisinsk behandling, sosial trening eller deltakelse på lavterskeltilbud.
                        </BodyLong>
                        <List>
                            <List.Item>
                                <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                                    Les mer om § 3 første ledd bokstav e i rundskriv til forskrift om forsøk med
                                    ungdomsprogram og ungdomsprogramytelse.
                                </ExternalLink>
                            </List.Item>
                        </List>
                    </VStack>
                </ReadMore>
                <ReadMore header="Les mer om det å kunne bli i stand til å komme i arbeid eller utdanning ">
                    <BodyLong>
                        Det må være sannsynlig at den unge gjennom programmet får den oppfølgingen og kvalifiseringen
                        som er nødvendig for å kunne delta i ordinært arbeid eller utdanning.{' '}
                    </BodyLong>

                    <BodyLong>
                        Ordinær utdanning betyr at den unge kan gjennomføre utdanning uten oppfølging og ytelser fra
                        Nav.
                    </BodyLong>

                    <BodyLong>
                        I ordinært arbeid kan hjelpemidler og tilrettelegging fremdeles være nødvendig, og det er ikke
                        en forutsetning at den unge skal jobbe/studere på heltid umiddelbart etter avsluttet program.
                    </BodyLong>
                    <List>
                        <List.Item>
                            <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                                Les mer om § 3 første ledd bokstav e i rundskriv til forskrift om forsøk med
                                ungdomsprogram og ungdomsprogramytelse.
                            </ExternalLink>
                        </List.Item>
                    </List>
                </ReadMore>
                <ReadMore header="Les mer om det at det er hensiktsmessig og nødvendig å delta">
                    <BodyLong>
                        Vilkåret om at programmet skal være «nødvendig og hensiktsmessig» betyr at den unge må ha et så
                        stort behov for bistand at situasjonen tilsier deltakekse i et fulltidsprogram.
                    </BodyLong>
                    <BodyLong>
                        Som veileder vurderer du først hvilke mål den unge har om arbeid eller utdanning, og deretter om
                        ungdomsprogrammet kan hjelpe hen å nå disse målene.
                    </BodyLong>

                    <BodyLong>
                        Programmet anses som nødvendig og hensiktsmessig når det kan bidra til å redusere gapet mellom
                        den unges forutsetninger og arbeidslivets krav, jf. tiltaksforskriften § 1–3.
                    </BodyLong>
                    <List>
                        <List.Item>
                            <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                                Les mer om § 3 andre ledd i rundskriv til forskrift om forsøk med ungdomsprogram og
                                ungdomsprogramytelse.
                            </ExternalLink>
                        </List.Item>
                    </List>
                </ReadMore>
            </VStack>
        ),
    },
];

interface Props {
    visResultat?: boolean;
    showHeader?: boolean;
    onChange: (kanMeldesInn: boolean) => void;
}

const Sjekkliste = ({ onChange, visResultat, showHeader = true }: Props) => {
    const [values, setValues] = useState<SjekklisteValues>({});

    const setValue = (id: string, value: JaNei) => {
        setValues((prev) => ({ ...prev, [id]: value }));
    };

    const status = getSjekklisteStatus(values);
    const prev = usePrevious(status.kanMeldesInn);

    useEffect(() => {
        if (prev !== status.kanMeldesInn) {
            onChange(status.kanMeldesInn);
        }
    }, [status.kanMeldesInn, onChange, prev]);

    const harFeilSvar = status.førsteFeilIndex !== undefined;

    return (
        <VStack gap="space-8">
            {showHeader && (
                <Heading level="3" size="small" spacing>
                    Sjekkliste for om deltaker kan meldes inn i ungdoms&shy;programmet
                </Heading>
            )}
            <VStack gap="space-40">
                {spørsmål.map((sp, index) => {
                    if (!status.synligeSpørsmål.includes(index)) {
                        return null;
                    }
                    const innhold = spørsmålInnhold[index];
                    return (
                        <RadioGroup
                            key={sp.id}
                            name={sp.id}
                            legend={innhold.legend}
                            value={values[sp.id] || ''}
                            onChange={(val: JaNei) => setValue(sp.id, val)}
                            description={innhold.description}>
                            <HStack gap="space-40">
                                <Radio value="ja">Ja</Radio>
                                <Radio value="nei">Nei</Radio>
                            </HStack>
                        </RadioGroup>
                    );
                })}
            </VStack>
            {visResultat && status.kanMeldesInn && (
                <Box marginBlock="space-16 space-0">
                    <Alert variant="success">Deltaker kan meldes inn</Alert>
                </Box>
            )}
            {visResultat && harFeilSvar && (
                <Box marginBlock="space-16 space-0">
                    <Alert variant="error">Deltaker kan ikke meldes inn.</Alert>
                </Box>
            )}
        </VStack>
    );
};

export default Sjekkliste;
