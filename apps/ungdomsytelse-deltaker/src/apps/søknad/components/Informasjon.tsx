import { Heading, ReadMore, VStack } from '@navikt/ds-react';

const InformasjonOmUngdomsytelsen = () => {
    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                Spørsmål og svar om ungdomsytelsen
            </Heading>

            <VStack gap="2">
                <ReadMore header="Hva er ungdomsytelsen?">Les mer om ungdomsytelsen</ReadMore>
                <ReadMore header="Hvordan kontakter jeg veilederen min?">Les mer om ungdomsytelsen</ReadMore>
                <ReadMore header="Hvor mye får jeg utbetalt?">Les mer om ungdomsytelsen</ReadMore>
                <ReadMore header="Hvor mye kan jeg ha i inntekt?">Les mer om ungdomsytelsen</ReadMore>
                <ReadMore header="Hva skjer når jeg mottar andre ytelser fra Nav?">Les mer om ungdomsytelsen</ReadMore>
            </VStack>
        </VStack>
    );
};

export default InformasjonOmUngdomsytelsen;
