import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';

import { browserEnv } from '../../utils/env';

interface Props {
    tekst: string;
}

const SkrivTilOssLenke = ({ tekst }: Props) => (
    <Link href={browserEnv.NEXT_PUBLIC_SKRIV_TIL_OSS_URL}>
        {tekst} <ExternalLinkIcon className="ml-1" role="presentation" />
    </Link>
);

export default SkrivTilOssLenke;
