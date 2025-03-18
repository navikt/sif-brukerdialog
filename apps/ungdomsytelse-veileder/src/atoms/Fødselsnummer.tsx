import { CopyButton, HStack } from '@navikt/ds-react';
import { fødselsnummerFormatter } from '@navikt/ung-common';

interface Props {
    fnr: string;
    copyEnabled?: boolean;
}

const Fødselsnummer = ({ fnr, copyEnabled }: Props) => (
    <HStack gap="2" align={'center'}>
        {fødselsnummerFormatter.applyFormat(fnr)}
        {copyEnabled ? <CopyButton size="small" copyText={fnr} /> : null}
    </HStack>
);

export default Fødselsnummer;
