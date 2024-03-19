import { Box, Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { Msg } from '../../../i18n';
import { Pleiepengesøknad } from '../../../server/api-models/SøknadSchema';
import { getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer } from '../../../utils/dokumentUtils';
import { getArbeidsgiverOrgnrISøknad } from '../../../utils/sakUtils';
import PdfLenke from '../../pdf-lenke/PdfLenke';

interface Props {
    søknad: Pleiepengesøknad;
}

const ArbeidsgivereISøknad: React.FunctionComponent<Props> = ({ søknad }) => {
    const arbeidsgivere = getArbeidsgiverOrgnrISøknad(søknad);
    const intl = useIntl();
    return (
        <Box className="mt-4">
            <Heading size="xsmall" level="4" spacing={true}>
                <Msg id="bekreftelseTilArbeidsgiver.title" />
            </Heading>
            <p>
                <Msg id="bekreftelseTilArbeidsgiver.info" />
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
