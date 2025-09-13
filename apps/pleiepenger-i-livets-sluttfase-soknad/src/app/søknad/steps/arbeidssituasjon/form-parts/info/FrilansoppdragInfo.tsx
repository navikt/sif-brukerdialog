import { Heading, VStack } from '@navikt/ds-react';
import { AppText } from '../../../../../i18n';
import { Arbeidsgiver } from '../../../../../types/Arbeidsgiver';
import FrilansoppdragListe from '../frilansoppdrag-liste/FrilansoppdragListe';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

const FrilansoppdragInfo = ({ frilansoppdrag }: Props) => (
    <VStack gap="4">
        <Heading level="2" size="small">
            <AppText id="frilansoppdragInfo.tittel" />
        </Heading>

        <FrilansoppdragListe frilansoppdrag={frilansoppdrag} />

        <AppText id="frilansoppdragInfo.tekst" />
    </VStack>
);

export default FrilansoppdragInfo;
