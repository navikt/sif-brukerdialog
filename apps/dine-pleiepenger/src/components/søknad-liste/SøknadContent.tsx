import { Box, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { File } from '@navikt/ds-icons';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import { Dokument } from '../../types/Document';
import { Organisasjon } from '../../types/Organisasjon';
import { Søknad, Søknadstype } from '../../types/Søknad';
import { browserEnv } from '../../utils/env';

interface Props {
    søknad: Søknad;
}

export const getSøknadDokumentFilnavn = (dokument: Dokument): string => {
    const filnavn = `${encodeURIComponent(dokument.tittel.toLowerCase())}`;
    return `${filnavn}.${dokument.filtype.toLowerCase()}`;
};

const getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer = (soknadID: string, organisasjonsnummer: string): string => {
    return `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soknad/${soknadID}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`;
};

const getDokumentFrontendUrl = (url: string): string => {
    // Split the URL into an array of segments using ‘/’ as the separator
    const segments = url.split('/');
    // Extract the desired paths from the array and join them together using ‘/’
    const paths = segments.slice(4, 7).join('/');

    return `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/dokument/${paths}`;
};

const SøknadContent: React.FunctionComponent<Props> = ({ søknad }) => {
    const intl = useIntl();

    const harArbeidsgiver = () => {
        if (søknad.søknadstype === Søknadstype.PP_SYKT_BARN) {
            const { arbeidsgivere } = søknad.søknad;
            if (!Array.isArray(arbeidsgivere)) {
                return arbeidsgivere.organisasjoner && arbeidsgivere.organisasjoner.length > 0;
            } else {
                return (
                    arbeidsgivere.length > 0 &&
                    arbeidsgivere.some((arbeidsgiver) => !arbeidsgiver.sluttetFørSøknadsperiode)
                );
            }
        }
        return false;
    };

    const mapOrganisasjoner = (organisasjon: Organisasjon | Arbeidsgiver) => {
        return (
            <li key={organisasjon.organisasjonsnummer}>
                <Link
                    target="_blank"
                    href={getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer(
                        søknad.søknadId,
                        organisasjon.organisasjonsnummer,
                    )}>
                    <File title="Dokumentikon" />
                    <FormattedMessage
                        id="dokumenterSomKanLastesNed.bekreftelse"
                        values={{
                            organisasjonsnavn: organisasjon.navn,
                        }}
                    />
                </Link>
            </li>
        );
    };

    const mapDokumenter = (dokument: Dokument) => {
        return (
            <li key={dokument.dokumentInfoId}>
                <Link
                    target="_blank"
                    href={`${getDokumentFrontendUrl(dokument.url)}?dokumentTittel=${getSøknadDokumentFilnavn(
                        dokument,
                    )}`}>
                    <File title="Dokumentikon" />
                    <span>{`${dokument.tittel} (PDF)`}</span>
                </Link>
            </li>
        );
    };

    return (
        <>
            <Box>
                <Heading size="xsmall" level="4" spacing={true}>
                    <FormattedMessage id={`dokumenterTittel.${søknad.søknadstype}`} />
                </Heading>
                {søknad.dokumenter && søknad.dokumenter.length > 0 && (
                    <ul>{søknad.dokumenter.map((dokument) => mapDokumenter(dokument))}</ul>
                )}
                {(søknad.dokumenter === undefined || søknad.dokumenter.length === 0) && (
                    <p>{intlHelper(intl, 'dokumenter.ingenDokumenter')}</p>
                )}
            </Box>

            {søknad.søknadstype === Søknadstype.PP_SYKT_BARN && harArbeidsgiver() && (
                <Box className="mt-8">
                    <Heading size="xsmall" level="4" spacing={true}>
                        <FormattedMessage id="bekreftelseTilArbeidsgiver.title" />
                    </Heading>
                    <p>
                        <FormattedMessage id="bekreftelseTilArbeidsgiver.info" />
                    </p>
                    {'arbeidsgivere' in søknad.søknad &&
                        'organisasjoner' in søknad.søknad.arbeidsgivere &&
                        søknad.søknad.arbeidsgivere.organisasjoner.length > 0 && (
                            <ul className="mt-4">
                                {søknad.søknad.arbeidsgivere.organisasjoner.map((organisasjon) =>
                                    mapOrganisasjoner(organisasjon),
                                )}
                            </ul>
                        )}
                    {'arbeidsgivere' in søknad.søknad &&
                        Array.isArray(søknad.søknad.arbeidsgivere) &&
                        søknad.søknad.arbeidsgivere.length > 0 && (
                            <ul className="mt-4">
                                {søknad.søknad.arbeidsgivere.map(
                                    (organisasjon) =>
                                        !organisasjon.sluttetFørSøknadsperiode && mapOrganisasjoner(organisasjon),
                                )}
                            </ul>
                        )}
                </Box>
            )}
        </>
    );
};

export default SøknadContent;
