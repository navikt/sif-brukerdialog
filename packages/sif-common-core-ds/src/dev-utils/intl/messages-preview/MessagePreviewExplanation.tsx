import { Alert, BodyShort } from '@navikt/ds-react';
import Block from '../../../atoms/block/Block';

const MessagesPreviewExplanation = () => {
    return (
        <Alert variant="info">
            <BodyShort size="large">Tegnforklaring</BodyShort>
            <Block>
                Tekstene inneholder koder som brukes når applikasjonen setter inn verdier, og for å bestemme hvordan
                teksten skal se ut.
            </Block>
            <Block>
                <BodyShort size="medium" weight="semibold">
                    Entall/flertall av en verdi
                </BodyShort>
                <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                    <code>{`{timer, plural, one {# time} other {# timer}}`}</code>
                </blockquote>
                Kun ordene direkte etter # skal oversettes, resten er teknisk kode.
            </Block>
            <Block>
                <BodyShort size="medium" weight="semibold">
                    Sett inn verdi i tekst
                </BodyShort>
                <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                    <code>{`Første gyldige dato er {fom}, og siste gyldige dato er {tom}`}</code>
                </blockquote>
                Ord i klammer, f.eks. <code>{`{fom}`}</code>, blir erstattet med en verdi fra applikasjonen, og skal
                ikke oversettes.
            </Block>
            <Block>
                <BodyShort size="medium" weight="semibold">
                    HTML-formatering
                </BodyShort>
                <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                    <code>{`<Block>En tekst som inneholder HTML kode</Block>`}</code>
                </blockquote>
                All tekst, untatt tegn/ord i {`< >`} skal oversettes.
            </Block>
        </Alert>
    );
};

export default MessagesPreviewExplanation;
