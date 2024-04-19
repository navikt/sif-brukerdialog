import { Link } from '@navikt/ds-react';
import React from 'react';
import { ExternalLink } from '@navikt/ds-icons';
import { browserEnv } from '../../utils/env';

interface Props {
    tekst: string;
}

const SkrivTilOssLenke: React.FunctionComponent<Props> = ({ tekst }) => (
    <Link href={browserEnv.NEXT_PUBLIC_SKRIV_TIL_OSS_URL}>
        {tekst} <ExternalLink className="ml-1" role="presentation" />
    </Link>
);

export default SkrivTilOssLenke;
