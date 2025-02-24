import { BodyLong, Heading, ReadMore, VStack } from '@navikt/ds-react';

const EndreStartdatoInfo = () => {
    return (
        <VStack>
            <Heading level="3" size="medium" spacing={true}>
                Om å endre startdato
            </Heading>
            <BodyLong spacing={true}>Her kan det ligge litt kort info om det å endre startdato.</BodyLong>
            <VStack gap="2">
                <ReadMore header="Hva skjer når jeg endrer startdato?">
                    <BodyLong>
                        Når startdato endres, opprettes en oppgave til deltaker hvor hen må bekrefte den nye
                        startdatoen. Oppgaven vil også bli synlig for deg under fanen "Oppgaver til deltaker".
                    </BodyLong>
                </ReadMore>
                <ReadMore header="Hva bør jeg skrive i melding til deltaker?">
                    <BodyLong>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere error, aliquam sint ipsa nulla
                        nesciunt doloribus iste est asperiores eaque laudantium iusto. Necessitatibus esse officia dolor
                        itaque, ipsum tenetur alias!
                    </BodyLong>
                </ReadMore>
                <ReadMore header="Kan jeg endre flere ganger?">
                    <BodyLong>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere error, aliquam sint ipsa nulla
                        nesciunt doloribus iste est asperiores eaque laudantium iusto. Necessitatibus esse officia dolor
                        itaque, ipsum tenetur alias!
                    </BodyLong>
                </ReadMore>
                <ReadMore header="Hva skjer når deltaker ikke svarer?">
                    <BodyLong>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere error, aliquam sint ipsa nulla
                        nesciunt doloribus iste est asperiores eaque laudantium iusto. Necessitatibus esse officia dolor
                        itaque, ipsum tenetur alias!
                    </BodyLong>
                </ReadMore>
            </VStack>
        </VStack>
    );
};

export default EndreStartdatoInfo;
