import { FileIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Heading, Link, List, VStack } from '@navikt/ds-react';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

import { AppText } from '../../i18n';
import { Dokument, InnsendtSøknad, InnsendtSøknadstype, Organisasjon } from '../../types';
import { getDokumentFrontendUrl, getSøknadDokumentFilnavn } from '../../utils/dokumentUtils';
import { browserEnv } from '../../utils/env';
import { getOrganisasjonsnavnEllerOrgNummer } from '../../utils/sakUtils';

interface Props {
    søknad: InnsendtSøknad;
}

const getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer = (soknadID: string, organisasjonsnummer: string): string => {
    return `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soknad/${soknadID}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`;
};

const InnsendtSøknadContent = ({ søknad }: Props) => {
    const intl = useIntl();

    const harArbeidsgiver = () => {
        if (søknad.søknadstype === InnsendtSøknadstype.PP_SYKT_BARN) {
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

    const mapOrganisasjoner = (organisasjon: Organisasjon) => {
        return (
            <li key={organisasjon.organisasjonsnummer}>
                <Link
                    target="_blank"
                    href={getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer(
                        søknad.søknadId,
                        organisasjon.organisasjonsnummer,
                    )}>
                    <FileIcon title="Dokumentikon" />
                    <AppText
                        id="dokumenterSomKanLastesNed.bekreftelse"
                        values={{
                            organisasjonsnavn: getOrganisasjonsnavnEllerOrgNummer(organisasjon),
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
                    <FileIcon title="Dokumentikon" />
                    <span>{`${dokument.tittel} (PDF)`}</span>
                </Link>
            </li>
        );
    };

    return (
        <VStack gap="space-24">
            <Box>
                <Heading size="xsmall" level="3" spacing>
                    <AppText id={`dokumenterTittel.${søknad.søknadstype}`} />
                </Heading>
                {søknad.dokumenter && søknad.dokumenter.length > 0 && (
                    <List>{søknad.dokumenter.map((dokument) => mapDokumenter(dokument))}</List>
                )}
                {(søknad.dokumenter === undefined || søknad.dokumenter.length === 0) && (
                    <BodyLong>{intlHelper(intl, 'dokumenter.ingenDokumenter')}</BodyLong>
                )}
            </Box>

            {søknad.søknadstype === InnsendtSøknadstype.PP_SYKT_BARN && harArbeidsgiver() && (
                <Box>
                    <Heading size="xsmall" level="3" spacing>
                        <AppText id="bekreftelseTilArbeidsgiver.title" />
                    </Heading>
                    <VStack gap="space-16" marginBlock="space-0 space-16">
                        <BodyLong>
                            <AppText id="bekreftelseTilArbeidsgiver.info" />
                        </BodyLong>
                        <BodyLong>
                            <AppText id="bekreftelseTilArbeidsgiver.info.1" />
                        </BodyLong>

                        {'arbeidsgivere' in søknad.søknad &&
                            'organisasjoner' in søknad.søknad.arbeidsgivere &&
                            søknad.søknad.arbeidsgivere.organisasjoner.length > 0 && (
                                <List>
                                    {søknad.søknad.arbeidsgivere.organisasjoner.map((organisasjon) =>
                                        mapOrganisasjoner(organisasjon),
                                    )}
                                </List>
                            )}
                        {'arbeidsgivere' in søknad.søknad &&
                            Array.isArray(søknad.søknad.arbeidsgivere) &&
                            søknad.søknad.arbeidsgivere.length > 0 && (
                                <List>
                                    {søknad.søknad.arbeidsgivere.map(
                                        (organisasjon) =>
                                            !organisasjon.sluttetFørSøknadsperiode && mapOrganisasjoner(organisasjon),
                                    )}
                                </List>
                            )}
                    </VStack>
                </Box>
            )}
        </VStack>
    );
};

export default InnsendtSøknadContent;
