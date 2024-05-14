import { Box, Heading } from '@navikt/ds-react';
import { Msg } from '../../../i18n';
import { Dokument } from '../../../server/api-models/DokumenetSchema';
import { getDokumentFrontendUrl, getSøknadDokumentFilnavn } from '../../../utils/dokumentUtils';
import PdfLenke from '../../pdf-lenke/PdfLenke';

interface Props {
    tittel?: string;
    dokumenter: Dokument[];
}

const mapDokumenter = (dokument: Dokument) => {
    return (
        <li key={dokument.dokumentInfoId}>
            <PdfLenke
                href={`${getDokumentFrontendUrl(dokument.url)}?dokumentTittel=${getSøknadDokumentFilnavn(dokument)}`}
                tittel={dokument.tittel}
            />
        </li>
    );
};

const Dokumenter = ({ dokumenter, tittel }: Props) => {
    if (dokumenter.length === 0) {
        return (
            <p>
                <Msg id="dokumenter.ingenDokumenter" />
            </p>
        );
    }
    return (
        <Box>
            {tittel ? (
                <Heading size="xsmall" level="4" spacing={true}>
                    {tittel}
                </Heading>
            ) : null}
            {dokumenter && dokumenter.length > 0 && <ul>{dokumenter.map((dokument) => mapDokumenter(dokument))}</ul>}
            {(dokumenter === undefined || dokumenter.length === 0) && (
                <p>
                    <Msg id="dokumenter.ingenDokumenter" />
                </p>
            )}
        </Box>
    );
};

export default Dokumenter;
