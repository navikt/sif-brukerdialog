import { Link } from '@navikt/ds-react';
import React from 'react';
import { FilePdfIcon } from '@navikt/aksel-icons';

interface Props {
    tittel: string;
    href: string;
    target?: string;
}

const PdfLenke: React.FunctionComponent<Props> = ({ href, tittel, target = 'blank' }) => (
    <Link target={target} href={href}>
        <FilePdfIcon title="Dokumentikon PDF" />
        <span>{`${tittel} (PDF)`}</span>
    </Link>
);

export default PdfLenke;
