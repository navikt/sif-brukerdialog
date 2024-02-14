import React from 'react';
import { getArbeidsgiverOrgnrISøknad } from '../../../utils/sakUtils';
import { Pleiepengesøknad } from '../../../server/api-models/SøknadSchema';
import { getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer } from '../../../utils/dokumentUtils';
import { File } from '@navikt/ds-icons';
import { FormattedMessage } from 'react-intl';
import { Box, Heading, Link } from '@navikt/ds-react';

interface Props {
    søknad: Pleiepengesøknad;
}

const ArbeidsgivereISøknad: React.FunctionComponent<Props> = ({ søknad }) => {
    const arbeidsgivere = getArbeidsgiverOrgnrISøknad(søknad);
    return (
        <Box className="mt-4">
            <Heading size="xsmall" level="4" spacing={true}>
                <FormattedMessage id="bekreftelseTilArbeidsgiver.title" />
            </Heading>
            <p>
                <FormattedMessage id="bekreftelseTilArbeidsgiver.info" />
            </p>

            <ul className="mt-4">
                {arbeidsgivere.map((organisasjon) => (
                    <li key={organisasjon.organisasjonsnummer}>
                        <Link
                            target="_blank"
                            href={getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer(
                                søknad.k9FormatSøknad.søknadId,
                                organisasjon.organisasjonsnummer,
                            )}>
                            <File title="Dokumentikon" />
                            <FormattedMessage
                                id="dokumenterSomKanLastesNed.bekreftelse"
                                values={{
                                    organisasjonsnavn: organisasjon.organisasjonsnummer,
                                }}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default ArbeidsgivereISøknad;
