import { Alert, BodyShort, Box } from '@navikt/ds-react';

const MessagesPreviewExplanation = () => {
    return (
        <Alert variant="info">
            <BodyShort size="large">Tegnforklaring</BodyShort>
            <Box marginBlock="space-24">
                Tekstene inneholder koder som brukes når applikasjonen setter inn verdier, og for å bestemme hvordan
                teksten skal se ut.
            </Box>
            <Box marginBlock="space-24">
                <BodyShort size="medium" weight="semibold">
                    Entall/flertall av en verdi
                </BodyShort>
                <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                    <code>{`{timer, plural, one {# time} other {# timer}}`}</code>
                </blockquote>
                Kun ordene direkte etter # skal oversettes, resten er teknisk kode.
            </Box>
            <Box marginBlock="space-24">
                <BodyShort size="medium" weight="semibold">
                    Sett inn verdi i tekst
                </BodyShort>
                <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                    <code>{`Første gyldige dato er {fom}, og siste gyldige dato er {tom}`}</code>
                </blockquote>
                Ord i klammer, f.eks. <code>{`{fom}`}</code>, blir erstattet med en verdi fra applikasjonen, og skal
                ikke oversettes.
            </Box>
            <Box marginBlock="space-24">
                <BodyShort size="medium" weight="semibold">
                    HTML-formatering
                </BodyShort>
                <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                    <code>{`<Box>En tekst som inneholder HTML kode</Box>`}</code>
                </blockquote>
                All tekst, untatt tegn/ord i {`< >`} skal oversettes.
            </Box>
        </Alert>
    );
};

export default MessagesPreviewExplanation;
