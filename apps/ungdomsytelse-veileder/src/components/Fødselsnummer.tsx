import { CopyButton, HStack } from '@navikt/ds-react';
import { fnrFormatter } from '../utils/fnrFormatter';

interface Props {
    fnr: string;
    copyEnabled?: boolean;
}

const Fødselsnummer = ({ fnr, copyEnabled }: Props) => (
    <HStack gap="2" align={'center'}>
        {fnrFormatter.applyFormat(fnr)}
        {copyEnabled ? <CopyButton size="small" copyText={fnr} /> : null}
    </HStack>
);

export default Fødselsnummer;
