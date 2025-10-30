import { Link } from '@navikt/ds-react';
import { browserEnv } from '../../utils/env';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

interface Props {
    tekst: string;
}

const DokumentarkivLenke = ({ tekst }: Props) => (
    <Link href={browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL}>
        {tekst} <ExternalLinkIcon className="ml-1" role="presentation" />
    </Link>
);

export default DokumentarkivLenke;
