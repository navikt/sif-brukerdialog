import { FileIcon } from '@navikt/aksel-icons';
import { HGrid, Link } from '@navikt/ds-react';

import { AppText } from '../../i18n';

interface Props {
    tittel: string;
    href: string;
    target?: string;
}

const PdfLenke = ({ href, tittel, target = 'blank' }: Props) => (
    <Link target={target} href={href}>
        <HGrid columns="1rem 1fr" gap="4" align="start">
            <FileIcon title="Dokumentikon PDF" style={{ width: '1.5rem', height: '1.5rem' }} />
            <span>
                <AppText id="pdfLenke.lenke" values={{ tittel }} />
            </span>
        </HGrid>
    </Link>
);

export default PdfLenke;
