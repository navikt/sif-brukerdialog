import React from 'react';
import { getArbeidsgiverOrgnrISøknad } from '../../../utils/sakUtils';
import { Pleiepengesøknad } from '../../../server/api-models/SøknadSchema';
import { getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer } from '../../../utils/dokumentUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Heading } from '@navikt/ds-react';
import PdfLenke from '../../pdf-lenke/PdfLenke';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

interface Props {
    søknad: Pleiepengesøknad;
}

const ArbeidsgivereISøknad: React.FunctionComponent<Props> = ({ søknad }) => {
    const arbeidsgivere = getArbeidsgiverOrgnrISøknad(søknad);
    const intl = useIntl();
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
                        <PdfLenke
                            href={getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer(
                                søknad.k9FormatSøknad.søknadId,
                                organisasjon.organisasjonsnummer,
                            )}
                            tittel={intlHelper(intl, 'dokumenterSomKanLastesNed.bekreftelse', {
                                organisasjonsnavn: organisasjon.organisasjonsnummer,
                            })}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default ArbeidsgivereISøknad;
