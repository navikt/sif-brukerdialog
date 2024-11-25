import { CopyButton, HStack } from '@navikt/ds-react';
import { fnrFormatter } from '../utils/fnrFormatter';

interface Props {
    fnr: string;
}

const Fødselsnummer = ({ fnr }: Props) => (
    <HStack gap="2" align={'center'}>
        {fnrFormatter.applyFormat(fnr)}
        <CopyButton size="small" copyText={fnr} />
    </HStack>
);

export default Fødselsnummer;
