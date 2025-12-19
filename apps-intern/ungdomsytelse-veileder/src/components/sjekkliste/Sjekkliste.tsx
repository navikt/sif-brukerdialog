import { Alert, BodyLong, Box, Heading, HStack, List, Radio, RadioGroup, ReadMore, VStack } from '@navikt/ds-react';
import { usePrevious } from '@navikt/sif-common-hooks';
import { useEffect, useState } from 'react';
import {
    alleSpørsmålBesvart,
    getAvslagÅrsak,
    getSjekklisteVisning,
    JaNei,
    SjekklisteValues,
    TypeLivsoppholdsytelse,
} from './sjekklisteUtils';

interface Props {
    visResultat?: boolean;
    onChange: (kanMeldesInn: boolean) => void;
}

const Sjekkliste = ({ onChange, visResultat }: Props) => {
    const [values, setValues] = useState<SjekklisteValues>({});

    const setValue = <K extends keyof SjekklisteValues>(key: K, value: SjekklisteValues[K]) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const visning = getSjekklisteVisning(values);
    const avslagÅrsak = getAvslagÅrsak(values, visning);
    const kanMeldesInn = alleSpørsmålBesvart(values, visning) && avslagÅrsak === undefined;
    const prev = usePrevious(kanMeldesInn);

    useEffect(() => {
        if (prev !== kanMeldesInn) {
            onChange(kanMeldesInn);
        }
    }, [kanMeldesInn, onChange, prev]);

    return (
        <VStack gap="2">
            <Heading level="3" size="small" spacing>
                Sjekkliste for om deltaker kan meldes inn i ungdoms&shy;programmet
            </Heading>
            <VStack gap="10">
                <RadioGroup
                    name="alder"
                    legend="Er deltaker mellom 18 og 29 år ved oppstart?"
                    value={values.alder || ''}
                    onChange={(val: JaNei) => setValue('alder', val)}>
                    <HStack gap="10">
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                    </HStack>
                </RadioGroup>

                {visning.visBehov && (
                    <RadioGroup
                        name="behov"
                        value={values.behov || ''}
                        onChange={(val: JaNei) => setValue('behov', val)}
                        legend="Har deltaker behov for bistand fra Nav og er deltakelsen nødvendig og hensiktsmessig for å komme i arbeid?"
                        description={
                            <ReadMore header="Les mer om nødvendighet">
                                <VStack gap="4">
                                    <BodyLong>
                                        Punkter som gir eksempler på hvem som ikke kan tas inn (eks: har lån og stipend
                                        fra lånekassen mm mm)
                                    </BodyLong>
                                    <List>
                                        <List.Item>Har lån og stipend fra lånekassen</List.Item>
                                        <List.Item>Har skjult formue på Barbados</List.Item>
                                    </List>
                                </VStack>
                            </ReadMore>
                        }>
                        <HStack gap="10">
                            <Radio value="ja">Ja</Radio>
                            <Radio value="nei">Nei</Radio>
                        </HStack>
                    </RadioGroup>
                )}

                {visning.visAvklart && (
                    <RadioGroup
                        name="avklart"
                        value={values.avklart || ''}
                        onChange={(val: JaNei) => setValue('avklart', val)}
                        legend="Ønsker deltaker å være med, kan delta på fulltid og har ikke tidligere vært med i ungdomsprogrammet?"
                        description={
                            <ReadMore header="Les mer om krav til deltakelse på fulltid">
                                <VStack gap="4" marginBlock="0 4">
                                    <BodyLong>
                                        Punkter som gir eksempler på hvem som ikke kan delta på full tid (eks: mottar
                                        sykepenger, pleiepenger)
                                    </BodyLong>
                                </VStack>
                            </ReadMore>
                        }>
                        <HStack gap="10">
                            <Radio value="ja">Ja</Radio>
                            <Radio value="nei">Nei</Radio>
                        </HStack>
                    </RadioGroup>
                )}

                {visning.visMottarYtelser && (
                    <RadioGroup
                        name="livsoppholdsytelser"
                        legend="Mottar deltakeren andre livsoppholdsytelser fra Nav?"
                        value={values.mottarYtelser || ''}
                        onChange={(val: JaNei) => setValue('mottarYtelser', val)}>
                        <HStack gap="10">
                            <Radio value="ja">Ja</Radio>
                            <Radio value="nei">Nei</Radio>
                        </HStack>
                    </RadioGroup>
                )}

                {visning.visTypeLivsoppholdsytelse && (
                    <RadioGroup
                        name="typeLivsoppholdsytelse"
                        legend="Hvilken form for livsoppholdsytelse er dette?"
                        value={values.typeLivsoppholdsytelse || ''}
                        onChange={(val: TypeLivsoppholdsytelse) => setValue('typeLivsoppholdsytelse', val)}>
                        <Radio value="økonomisk">Økonomisk bistand</Radio>
                        <Radio value="annen">Annen livsoppholdsytelse</Radio>
                    </RadioGroup>
                )}

                {visning.visSkalStanses && (
                    <RadioGroup
                        name="skalStanses"
                        legend="Skal denne livsoppholdsytelsen stanses?"
                        value={values.skalStanses || ''}
                        onChange={(val: JaNei) => setValue('skalStanses', val)}
                        description={
                            <ReadMore header="Les mer om krav til deltakelse på fulltid">
                                <VStack gap="4" marginBlock="0 4">
                                    <BodyLong>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quia,
                                        nesciunt rerum temporibus vitae molestias vel ad eligendi vero ex eos officiis
                                        magni, libero alias nostrum in dolorem mollitia tenetur?
                                    </BodyLong>
                                </VStack>
                            </ReadMore>
                        }>
                        <HStack gap="10">
                            <Radio value="ja">Ja</Radio>
                            <Radio value="nei">Nei</Radio>
                        </HStack>
                    </RadioGroup>
                )}
            </VStack>

            {visResultat && kanMeldesInn && (
                <Box marginBlock="4 0">
                    <Alert variant="success">Deltaker kan meldes inn</Alert>
                </Box>
            )}
            {visResultat && !kanMeldesInn && avslagÅrsak && (
                <Box marginBlock="4 0">
                    <Alert variant="error">
                        Deltaker kan ikke meldes inn fordi ... tekst avhengig av årsak ({avslagÅrsak})
                    </Alert>
                </Box>
            )}
        </VStack>
    );
};

export default Sjekkliste;
