import { BodyShort, VStack } from '@navikt/ds-react';
import FormatertFritekst from '@navikt/ung-common/src/components/formatert-fritekst/FormatertFritekst';

interface Props {
    tekst: string;
    avsender?: string;
}

const MeldingFraVeileder = ({ tekst, avsender }: Props) => (
    <VStack gap="4">
        <BodyShort weight="semibold">Melding fra veileder:</BodyShort>
        <VStack gap="6" className="p-5 bg-gray-50 border border-navGra60 border-dotted rounded-md">
            <FormatertFritekst tekst={tekst} />
            {avsender ? <BodyShort>Fra: {avsender}</BodyShort> : null}
        </VStack>
    </VStack>
);

export default MeldingFraVeileder;
