import { BodyShort, VStack } from '@navikt/ds-react';
import FormatertFritekst from '@navikt/ung-common/src/components/formatert-fritekst/FormatertFritekst';

interface Props {
    tekst: string;
    avsender?: string;
}

const MeldingFraVeileder = ({ tekst, avsender }: Props) => (
    <VStack gap="6" className="p-5 bg-orange-100 border border-navGra60 border-dotted rounded-md">
        <FormatertFritekst tekst={tekst} />
        {avsender ? <BodyShort>Fra: {avsender}</BodyShort> : null}
    </VStack>
);

export default MeldingFraVeileder;
