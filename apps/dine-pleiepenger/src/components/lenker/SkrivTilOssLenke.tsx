import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { HStack, Link } from '@navikt/ds-react';

import { browserEnv } from '../../utils/env';

interface Props {
    tekst: string;
}

const SkrivTilOssLenke = ({ tekst }: Props) => (
    <Link href={browserEnv.NEXT_PUBLIC_SKRIV_TIL_OSS_URL}>
        <HStack gap="space-8">
            <span>{tekst}</span> <ExternalLinkIcon role="presentation" />
        </HStack>
    </Link>
);

export default SkrivTilOssLenke;
