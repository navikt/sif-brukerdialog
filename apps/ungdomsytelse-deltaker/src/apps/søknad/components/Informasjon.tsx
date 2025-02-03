import { Accordion, BodyShort, Box, Heading, VStack } from '@navikt/ds-react';

const InformasjonOmUngdomsytelsen = () => {
    return (
        <Box className="bg-green-50 p-8 pb-4 rounded-md">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Spørsmål og svar om ungdomsytelsen
                </Heading>
                <BodyShort>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, exercitationem laborum blanditiis
                    quasi officiis nesciunt assumenda sunt alias voluptatem? Accusantium esse et perferendis alias. Fuga
                    delectus placeat magnam velit amet.
                </BodyShort>

                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>Hva er ungdomsytelsen?</Accordion.Header>
                        <Accordion.Content>asdf</Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Hvordan kontakter jeg veilederen min?</Accordion.Header>
                        <Accordion.Content>asdf</Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Hvor mye får jeg utbetalt?</Accordion.Header>
                        <Accordion.Content>asdf</Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Hvor mye kan jeg ha i inntekt?</Accordion.Header>
                        <Accordion.Content>asdf</Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Hva skjer når jeg mottar andre ytelser fra Nav?</Accordion.Header>
                        <Accordion.Content>asdf</Accordion.Content>
                    </Accordion.Item>
                </Accordion>

                {/* <VStack gap="2">
                    <ReadMore header="Hva er ungdomsytelsen?">Les mer om ungdomsytelsen</ReadMore>
                    <ReadMore header="Hvordan kontakter jeg veilederen min?">Les mer om ungdomsytelsen</ReadMore>
                    <ReadMore header="Hvor mye får jeg utbetalt?">Les mer om ungdomsytelsen</ReadMore>
                    <ReadMore header="Hvor mye kan jeg ha i inntekt?">Les mer om ungdomsytelsen</ReadMore>
                    <ReadMore header="Hva skjer når jeg mottar andre ytelser fra Nav?">
                        Les mer om ungdomsytelsen
                    </ReadMore>
                </VStack> */}
            </VStack>
        </Box>
    );
};

export default InformasjonOmUngdomsytelsen;
