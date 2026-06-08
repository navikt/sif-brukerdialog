import { Bleed, CopyButton, HStack } from '@navikt/ds-react';
import { fødselsnummerFormatter } from '../utils/formaterFødselsnummer';

interface Props {
    fnr: string;
    copyEnabled?: boolean;
}

const Fødselsnummer = ({ fnr, copyEnabled }: Props) => (
    <HStack gap="space-4" align="center">
        {fødselsnummerFormatter.applyFormat(fnr)}
        {copyEnabled ? (
            <Bleed marginBlock="space-12 space-8">
                <CopyButton size="small" copyText={fnr} />
            </Bleed>
        ) : null}
    </HStack>
);

export default Fødselsnummer;
