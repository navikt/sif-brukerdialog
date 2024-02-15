import React from 'react';
import { Søknad } from '../../../server/api-models/SøknadSchema';
import { Box, Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { Dokument } from '../../../server/api-models/DokumenetSchema';
import { getDokumentFrontendUrl, getSøknadDokumentFilnavn } from '../../../utils/dokumentUtils';
import PdfLenke from '../../pdf-lenke/PdfLenke';

interface Props {
    tittel?: string;
    søknad: Søknad;
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

const DokumenterISøknad: React.FunctionComponent<Props> = ({ søknad, tittel }) => {
    if (søknad.dokumenter.length === 0) {
        return (
            <p>
                <FormattedMessage id="dokumenter.ingenDokumenter" />
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
            {søknad.dokumenter && søknad.dokumenter.length > 0 && (
                <ul>{søknad.dokumenter.map((dokument) => mapDokumenter(dokument))}</ul>
            )}
            {(søknad.dokumenter === undefined || søknad.dokumenter.length === 0) && (
                <p>
                    <FormattedMessage id="dokumenter.ingenDokumenter" />
                </p>
            )}
        </Box>
    );
};

export default DokumenterISøknad;
