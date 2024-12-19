import { Heading, ReadMore, VStack } from '@navikt/ds-react';

const KortOmUngdomsytelsen = () => {
    return (
        <VStack>
            <Heading level="2" size="medium" spacing={true}>
                Kort om ungdomsytelsen
            </Heading>
            <ReadMore header="Hva er ungdomsytelsen?">Lorem</ReadMore>
            <ReadMore header="Hva skjer vis a og b og c?">Lorem</ReadMore>
            <ReadMore header="Hvordan tar jeg kontakt med min veileder?">Lorem</ReadMore>
            <ReadMore header="Flere ting kan legges her?">Lorem</ReadMore>
        </VStack>
    );
};

export default KortOmUngdomsytelsen;
