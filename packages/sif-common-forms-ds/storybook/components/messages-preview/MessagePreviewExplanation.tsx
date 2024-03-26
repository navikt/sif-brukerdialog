import { Alert, Heading, Ingress } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';

const MessagesPreviewExplanation = () => (
    <Alert variant="info">
        <Ingress>Tegnforklaring</Ingress>
        <Block>
            Tekstene inneholder koder som brukes når applikasjonen setter inn verdier, og for å bestemme hvordan teksten
            skal se ut.
        </Block>
        <Block>
            <Heading level="3" size="small">
                Entall/flertall av en verdi
            </Heading>
            <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                <code>{`{timer, plural, one {# time} other {# timer}}`}</code>
            </blockquote>
            Kun ordene direkte etter # skal oversettes, resten er teknisk kode.
        </Block>
        <Block>
            <Heading level="3" size="small">
                Sett inn verdi i tekst
            </Heading>
            <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                <code>{`Første gyldige dato er {fom}, og siste gyldige dato er {tom}`}</code>
            </blockquote>
            Ord i klammer, f.eks. <code>{`{fom}`}</code>, blir erstattet med en verdi fra applikasjonen, og skal ikke
            oversettes.
        </Block>
        <Block>
            <Heading level="3" size="small">
                HTML-formatering
            </Heading>
            <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                <code>{`<Block>En tekst som inneholder HTML kode</Block>`}</code>
            </blockquote>
            All tekst, untatt tegn/ord i {`< >`} skal oversettes.
        </Block>
    </Alert>
);

export default MessagesPreviewExplanation;
