import { Bleed, CopyButton, HStack } from '@navikt/ds-react';
import { fødselsnummerFormatter } from '../utils/formaterFødselsnummer';

interface Props {
    fnr: string;
    copyEnabled?: boolean;
}

const Fødselsnummer = ({ fnr, copyEnabled }: Props) => (
    <HStack gap="1" align="center">
        {fødselsnummerFormatter.applyFormat(fnr)}
        {copyEnabled ? (
            <Bleed marginBlock="3 2">
                <CopyButton size="small" copyText={fnr} />
            </Bleed>
        ) : null}
    </HStack>
);

export default Fødselsnummer;
