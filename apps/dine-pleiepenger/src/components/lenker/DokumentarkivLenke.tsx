import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { HStack, Link } from '@navikt/ds-react';

import { browserEnv } from '../../utils/env';

interface Props {
    tekst: string;
}

const DokumentarkivLenke = ({ tekst }: Props) => (
    <Link href={browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL}>
        <HStack gap="space-8">
            <span>{tekst}</span> <ExternalLinkIcon role="presentation" />
        </HStack>
    </Link>
);

export default DokumentarkivLenke;
