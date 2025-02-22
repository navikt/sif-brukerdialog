import { BodyShort, VStack } from '@navikt/ds-react';
import FormatertFritekst from '../FormatertFritekst';

interface Props {
    tekst: string;
    avsender?: string;
}

const Melding = ({ tekst, avsender }: Props) => (
    <VStack gap="6" className="p-5 bg-orange-100 border border-navGra60 border-dotted rounded-md">
        <BodyShort weight="semibold">Melding fra veileder:</BodyShort>
        <FormatertFritekst tekst={tekst} />
        {avsender ? <BodyShort>- {avsender}</BodyShort> : null}
    </VStack>
);

export default Melding;
