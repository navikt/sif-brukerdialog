import { Link } from '@navikt/ds-react';
import { FileIcon } from '@navikt/aksel-icons';
import { AppText } from '../../i18n';

interface Props {
    tittel: string;
    href: string;
    target?: string;
}

const PdfLenke = ({ href, tittel, target = 'blank' }: Props) => (
    <Link target={target} href={href}>
        <FileIcon title="Dokumentikon PDF" style={{ width: '1.5rem', height: '1.5rem' }} />
        <span>
            <AppText id="pdfLenke.lenke" values={{ tittel }} />
        </span>
    </Link>
);

export default PdfLenke;
