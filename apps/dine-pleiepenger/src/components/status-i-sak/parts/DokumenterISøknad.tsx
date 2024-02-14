import React from 'react';
import { Søknad } from '../../../server/api-models/SøknadSchema';
import { Box, Heading, Link } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { Dokument } from '../../../server/api-models/DokumenetSchema';
import { File } from '@navikt/ds-icons';
import { getDokumentFrontendUrl, getSøknadDokumentFilnavn } from '../../../utils/dokumentUtils';

interface Props {
    søknad: Søknad;
}

const mapDokumenter = (dokument: Dokument) => {
    return (
        <li key={dokument.dokumentInfoId}>
            <Link
                target="_blank"
                href={`${getDokumentFrontendUrl(dokument.url)}?dokumentTittel=${getSøknadDokumentFilnavn(dokument)}`}>
                <File title="Dokumentikon" />
                <span>{`${dokument.tittel} (PDF)`}</span>
            </Link>
        </li>
    );
};

const DokumenterISøknad: React.FunctionComponent<Props> = ({ søknad }) => {
    if (søknad.dokumenter.length === 0) {
        return (
            <p>
                <FormattedMessage id="dokumenter.ingenDokumenter" />
            </p>
        );
    }
    return (
        <Box>
            <Heading size="xsmall" level="4" spacing={true}>
                <FormattedMessage id={`dokumenterTittel.${søknad.søknadstype}`} />
            </Heading>
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
