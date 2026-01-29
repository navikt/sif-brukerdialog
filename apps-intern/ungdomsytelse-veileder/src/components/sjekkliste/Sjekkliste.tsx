/* eslint-disable max-len */
import {
    Alert,
    BodyLong,
    Box,
    Button,
    Heading,
    HStack,
    List,
    Radio,
    RadioGroup,
    ReadMore,
    VStack,
} from '@navikt/ds-react';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ReactNode, useEffect, useState } from 'react';
import { getSjekklisteStatus, JaNei, SjekklisteValues, spørsmål } from './sjekklisteUtils';
import ExternalLink from '../external-link/ExternalLink';
import { ParagraphIcon, RecycleIcon } from '@navikt/aksel-icons';

interface SpørsmålInnhold {
    legend: string;
    description: ReactNode;
}

/** Innhold for hvert spørsmål - legend og description */
const spørsmålInnhold: SpørsmålInnhold[] = [
    {
        legend: '1. Tilhører den unge et kontor som deltar i forsøket?',
        description: (
            <ReadMore header="Vis mer om forsøkskontorene">
                <VStack gap="space-8">
                    <BodyLong>
                        Deltakere i ungdomsprogrammet må tilhøre et av følgende kontor som deltar i forsøket: Arendal,
                        Bergen Sør, Bergen Vest, Kristiansand, Porsgrunn, Sandefjord eller Skien.
                    </BodyLong>
                    <List>
                        <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
                            <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-3">
                                Les mer om § 2 i rundskriv til forskrift om forsøk med ungdomsprogram og
                                ungdomsprogramytelse.
                            </ExternalLink>
                        </List.Item>
                    </List>
                </VStack>
            </ReadMore>
        ),
    },
    {
        legend: '2. Mottar den unge andre livsoppholdsytelser?',
        description: (
            <ReadMore header="Vis mer om livsoppholdsytelser">
                <VStack gap="space-8">
                    <BodyLong>
                        Den unge kan ikke motta ungdomsprogramytelsen samtidig som hen mottar andre livsoppholdsytelser,
                        med noen unntak.
                    </BodyLong>
                    <List>
                        <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
                            <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_4-6">
                                Les mer om § 12 i rundskriv til forskrift om forsøk med ungdomsprogram og
                                ungdomsprogramytelse.
                            </ExternalLink>
                        </List.Item>
                        <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
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
            <ReadMore header="Vis mer om alder, bistandsbehov og tidligere deltakelse">
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
                        <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
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
            <ReadMore header="Vis mer om ønsket om å delta">
                <VStack gap="space-8">
                    <BodyLong>
                        Den unge må ha gitt uttrykk for å at hen ønsker å delta i programmet. Hen må også ha fått god
                        informasjon om hvilke forventninger vi stiller, og hvilke aktiviteter som kan inngå, og
                        egeninnsatsen det krever av den unge.
                    </BodyLong>
                    <List>
                        <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
                            <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                                Les mer om § 3 første ledd bokstav d i rundskriv til forskrift om forsøk med
                                ungdomsprogram og ungdomsprogramytelse.
                            </ExternalLink>
                        </List.Item>
                    </List>
                </VStack>
            </ReadMore>
        ),
    },
    {
        legend: '5. Er den unge i stand til å delta i programmet på fulltid, vil den unge kunne bli i stand til å komme i arbeid eller utdanning gjennom å delta i programmet, og vil det være hensiktsmessig og nødvendig for den unge å delta?',
        description: (
            <VStack gap="space-6">
                <ReadMore header="Vis mer om det å være i stand til å delta på fulltid">
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
                            <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
                                <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                                    Les mer om § 3 første ledd bokstav e i rundskriv til forskrift om forsøk med
                                    ungdomsprogram og ungdomsprogramytelse.
                                </ExternalLink>
                            </List.Item>
                        </List>
                    </VStack>
                </ReadMore>
                <ReadMore header="Vis mer om det å kunne bli i stand til å komme i arbeid eller utdanning ">
                    <VStack gap="space-8">
                        <BodyLong>
                            Det må være sannsynlig at den unge gjennom programmet får den oppfølgingen og
                            kvalifiseringen som er nødvendig for å kunne delta i ordinært arbeid eller utdanning.{' '}
                        </BodyLong>

                        <BodyLong>
                            Ordinær utdanning betyr at den unge kan gjennomføre utdanning uten oppfølging og ytelser fra
                            Nav.
                        </BodyLong>

                        <BodyLong>
                            I ordinært arbeid kan hjelpemidler og tilrettelegging fremdeles være nødvendig, og det er
                            ikke en forutsetning at den unge skal jobbe/studere på heltid umiddelbart etter avsluttet
                            program.
                        </BodyLong>
                        <List>
                            <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
                                <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                                    Les mer om § 3 første ledd bokstav e i rundskriv til forskrift om forsøk med
                                    ungdomsprogram og ungdomsprogramytelse.
                                </ExternalLink>
                            </List.Item>
                        </List>
                    </VStack>
                </ReadMore>
                <ReadMore header="Vis mer om det at det er hensiktsmessig og nødvendig å delta">
                    <VStack gap="space-8">
                        <BodyLong>
                            Vilkåret om at programmet skal være «nødvendig og hensiktsmessig» betyr at den unge må ha et
                            så stort behov for bistand at situasjonen tilsier deltakekse i et fulltidsprogram.
                        </BodyLong>
                        <BodyLong>
                            Som veileder vurderer du først hvilke mål den unge har om arbeid eller utdanning, og
                            deretter om ungdomsprogrammet kan hjelpe hen å nå disse målene.
                        </BodyLong>

                        <BodyLong>
                            Programmet anses som nødvendig og hensiktsmessig når det kan bidra til å redusere gapet
                            mellom den unges forutsetninger og arbeidslivets krav, jf. tiltaksforskriften § 1–3.
                        </BodyLong>
                        <List>
                            <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
                                <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram#KAPITTEL_2-4">
                                    Les mer om § 3 andre ledd i rundskriv til forskrift om forsøk med ungdomsprogram og
                                    ungdomsprogramytelse.
                                </ExternalLink>
                            </List.Item>
                        </List>
                    </VStack>
                </ReadMore>
            </VStack>
        ),
    },
];

interface Props {
    visResultat?: boolean;
    onChange?: (kanMeldesInn: boolean) => void;
}

const Sjekkliste = ({ onChange, visResultat }: Props) => {
    const [values, setValues] = useState<SjekklisteValues>({});

    const setValue = (id: string, value: JaNei) => {
        setValues((prev) => ({ ...prev, [id]: value }));
    };

    const status = getSjekklisteStatus(values);
    const prev = usePrevious(status.kanMeldesInn);

    useEffect(() => {
        if (!onChange) {
            return;
        }
        if (prev !== status.kanMeldesInn) {
            onChange(status.kanMeldesInn);
        }
    }, [status.kanMeldesInn, onChange, prev]);

    const harFeilSvar = status.førsteFeilIndex !== undefined;

    const resetSjekkliste = () => {
        setValues({});
    };

    return (
        <VStack gap="space-32">
            <VStack gap="space-16">
                <Heading level="2" size="large">
                    Sjekk om den unge kan meldes inn i ungdomsprogrammet
                </Heading>
                <BodyLong>
                    Svar på spørsmålene nedenfor for å se om den unge kan meldes inn i ungdomsprogrammet.
                </BodyLong>
                <List>
                    <List.Item icon={<ParagraphIcon role="presentation" fontSize="1.25rem" />}>
                        <ExternalLink href="https://lovdata.no/nav/rundskriv/r76-13-04-for?q=Ungdomsprogram">
                            Rundskriv til forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse
                        </ExternalLink>
                    </List.Item>
                </List>
            </VStack>

            <VStack gap="space-12">
                <Heading level="3" size="small">
                    Sjekkliste
                </Heading>
                <Box>
                    <Button
                        title="Nullstiller registrerte svar i listen"
                        variant="tertiary"
                        size="small"
                        onClick={resetSjekkliste}
                        icon={<RecycleIcon role="presentation" />}>
                        Nullstill sjekkliste
                    </Button>
                </Box>

                <VStack gap="space-4">
                    {spørsmål.map((sp, index) => {
                        if (!status.synligeSpørsmål.includes(index)) {
                            return null;
                        }
                        const innhold = spørsmålInnhold[index];
                        return (
                            <Box
                                background="neutral-softA"
                                borderRadius="8"
                                padding="space-24"
                                paddingInline="space-32"
                                key={sp.id}>
                                <RadioGroup
                                    name={sp.id}
                                    legend={innhold.legend}
                                    value={values[sp.id] || ''}
                                    onChange={(val: JaNei) => setValue(sp.id, val)}
                                    description={<Box marginBlock="space-4">{innhold.description}</Box>}>
                                    <HStack gap="space-40">
                                        <Radio value="ja">Ja</Radio>
                                        <Radio value="nei">Nei</Radio>
                                    </HStack>
                                </RadioGroup>
                            </Box>
                        );
                    })}
                </VStack>
                {visResultat && status.kanMeldesInn && (
                    <Alert variant="success">Ja, den unge kan meldes inn i ungdomsprogrammet</Alert>
                )}
                {visResultat && harFeilSvar && (
                    <Alert variant="error">Nei, den unge kan ikke meldes inn i ungdomsprogrammet</Alert>
                )}
            </VStack>
        </VStack>
    );
};

export default Sjekkliste;
