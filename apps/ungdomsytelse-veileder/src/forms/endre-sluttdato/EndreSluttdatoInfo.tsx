import { BodyLong, Heading, ReadMore, VStack } from '@navikt/ds-react';

const EndreSluttdatoInfo = () => {
    return (
        <VStack>
            <Heading level="3" size="medium" spacing={true}>
                Om å endre avslutte/endre sluttdato
            </Heading>
            <VStack gap="2">
                <ReadMore header="Hva skjer når jeg endrer sluttdato?">
                    <BodyLong>
                        Når sluttdato endres, opprettes en oppgave til deltaker hvor hen må bekrefte den nye
                        sluttdatoen. Oppgaven vil også bli synlig for deg under fanen "Oppgaver til deltaker".
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

export default EndreSluttdatoInfo;
