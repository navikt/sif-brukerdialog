import { Link } from '@navikt/ds-react';
import { FilePdfIcon } from '@navikt/aksel-icons';
import { AppText } from '../../i18n';

interface Props {
    tittel: string;
    href: string;
    target?: string;
}

const PdfLenke = ({ href, tittel, target = 'blank' }: Props) => (
    <Link target={target} href={href}>
        <FilePdfIcon title="Dokumentikon PDF" />
        <span>
            <AppText id="pdfLenke.lenke" values={{ tittel }} />
        </span>
    </Link>
);

export default PdfLenke;
