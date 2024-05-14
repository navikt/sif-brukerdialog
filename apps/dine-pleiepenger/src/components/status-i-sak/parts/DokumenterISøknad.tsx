import { Box, Heading } from '@navikt/ds-react';
import { Msg } from '../../../i18n';
import { Dokument } from '../../../server/api-models/DokumenetSchema';
import { Innsendelse } from '../../../server/api-models/InnsendelseSchema';
import { getDokumentFrontendUrl, getSøknadDokumentFilnavn } from '../../../utils/dokumentUtils';
import PdfLenke from '../../pdf-lenke/PdfLenke';

interface Props {
    tittel?: string;
    innsendelse: Innsendelse;
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

const DokumenterISøknad = ({ innsendelse, tittel }: Props) => {
    if (innsendelse.dokumenter.length === 0) {
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
            {innsendelse.dokumenter && innsendelse.dokumenter.length > 0 && (
                <ul>{innsendelse.dokumenter.map((dokument) => mapDokumenter(dokument))}</ul>
            )}
            {(innsendelse.dokumenter === undefined || innsendelse.dokumenter.length === 0) && (
                <p>
                    <Msg id="dokumenter.ingenDokumenter" />
                </p>
            )}
        </Box>
    );
};

export default DokumenterISøknad;
