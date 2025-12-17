import {
    Alert,
    Bleed,
    BodyLong,
    BodyShort,
    Box,
    BoxNew,
    Checkbox,
    Heading,
    List,
    ReadMore,
    VStack,
} from '@navikt/ds-react';
import { usePrevious } from '@navikt/sif-common-hooks';
import { useEffect, useState } from 'react';

enum Krav {
    'alder' = 'alder',
    'behov' = 'behov',
    'avklart' = 'avklart',
    'ytelser' = 'ytelser',
}

type CheckedKrav = {
    [key in Krav]?: boolean;
};

interface KravBoxProps {
    krav: Krav;
    legend: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    children?: React.ReactNode;
}

const KravBox = ({ krav, legend, onChange, children }: KravBoxProps) => {
    return (
        // <Bleed marginInline="4">
        <BoxNew
            // background={checked ? 'success-softA' : undefined}
            // paddingInline="4"
            // paddingBlock="2"
            borderRadius="large">
            <Checkbox
                name={krav}
                onChange={(evt) => onChange && onChange(evt.target.checked)}
                // data-color={checked ? 'success' : undefined}
            >
                <BodyShort weight="semibold">{legend}</BodyShort>
            </Checkbox>
            <Bleed marginBlock="1 0">
                <Box marginInline="8 0">{children}</Box>
            </Bleed>
        </BoxNew>
        // </Bleed>
    );
};

interface Props {
    visResultat?: boolean;
    onChange: (kanMeldesInn: boolean) => void;
}
const GruppertSjekkliste = ({ onChange, visResultat }: Props) => {
    const [kravState, setKravState] = useState<CheckedKrav>({
        alder: false,
        behov: false,
        avklart: false,
        ytelser: false,
    });

    const kanMeldesInn = Object.values(kravState).every((v) => v === true);

    const prev = usePrevious(kanMeldesInn);
    useEffect(() => {
        if (prev !== kanMeldesInn) {
            onChange(kanMeldesInn);
        }
    }, [kanMeldesInn, onChange]);

    return (
        <VStack gap="2">
            <Heading level="3" size="small">
                Sjekkliste
            </Heading>
            <BodyLong>Svar på følgende krav for å se om deltakeren kan meldes inn i ungdomsprogrammet:</BodyLong>
            <KravBox
                krav={Krav.alder}
                legend="Er i riktig aldersgruppe"
                checked={kravState.alder}
                onChange={(checked) => setKravState({ ...kravState, alder: checked })}>
                <List>
                    <List.Item>Har fylt 18 år når deltakelsen starter</List.Item>
                    <List.Item>Har ikke fylt 29 år når deltakelsen starter</List.Item>
                </List>
            </KravBox>
            <KravBox
                krav={Krav.behov}
                legend="Det er behov og nødvendig"
                checked={kravState.behov}
                onChange={(checked) => setKravState({ ...kravState, behov: checked })}>
                <List>
                    <List.Item>Har behov for bistand fra Nav for å komme i arbeid</List.Item>
                    <List.Item>
                        <BodyShort>Deltakelsen er nødvendig og hensiktsmessig for å komme i arbeid</BodyShort>
                        <ReadMore header="Les mer om nødvendighet">
                            <VStack gap="4">
                                <BodyLong>
                                    Punkter som gir eksempler på hvem som ikke kan tas inn (eks: har lån og stipend fra
                                    lånekassen mm mm)
                                </BodyLong>
                                <List>
                                    <List.Item>Har lån og stipend fra lånekassen</List.Item>
                                    <List.Item>Har skjult formue på Barbados</List.Item>
                                </List>
                            </VStack>
                        </ReadMore>
                    </List.Item>
                </List>
            </KravBox>

            <KravBox
                krav={Krav.avklart}
                legend="Deltakelse er avklart"
                checked={kravState.avklart}
                onChange={(checked) => setKravState({ ...kravState, avklart: checked })}>
                <List>
                    <List.Item>Ønsker å delta i programmet</List.Item>
                    <List.Item>Har ikke tidligere deltatt i ungdomsprogrammet</List.Item>
                    <List.Item>
                        <BodyShort>Kan delta på fulltid</BodyShort>
                        <ReadMore header="Les mer om krav til deltakelse">
                            <VStack gap="4" marginBlock="0 4">
                                <BodyLong>
                                    Punkter som gir eksempler på hvem som ikke kan delta på full tid (eks: mottar
                                    sykepenger, pleiepenger)
                                </BodyLong>
                            </VStack>
                        </ReadMore>
                    </List.Item>
                </List>
            </KravBox>

            <KravBox
                krav={Krav.ytelser}
                legend="Mottar ikke andre livsoppholdsytelser som ikke kan kombineres med ungdomsprogrammet"
                checked={kravState.ytelser}
                onChange={(checked) => setKravState({ ...kravState, ytelser: checked })}>
                <>
                    <BodyShort spacing>Dette vil si at deltakeren</BodyShort>
                    <List as="ol">
                        <List.Item>mottar ikke andre livsoppholdsytelser, eller</List.Item>
                        <List.Item>mottar kun økononomisk bistand, eller</List.Item>
                        <List.Item>
                            <BodyLong>
                                mottar annen livsoppholdsytelse som skal stansens slik at fom dato kan settes etter
                                denne er stanset
                            </BodyLong>
                            <ReadMore header="Les mer om andre livsoppholdsytelser">
                                <VStack gap="4" marginBlock="0 4">
                                    <BodyLong>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga atque quo aut modi
                                        in. Nemo expedita necessitatibus porro blanditiis, aliquid iure accusantium
                                        cumque id repudiandae quas cupiditate dolore placeat assumenda.
                                    </BodyLong>
                                </VStack>
                            </ReadMore>
                        </List.Item>
                    </List>
                </>
            </KravBox>

            {visResultat && kanMeldesInn && (
                <Box marginBlock="4 0">
                    <Alert variant="success">Deltaker kan meldes inn</Alert>
                </Box>
            )}
        </VStack>
    );
};

export default GruppertSjekkliste;
