import { BodyLong, Box, Heading, List, VStack } from '@navikt/ds-react';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';

import { Organisasjon } from '../../../types';
import { getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer } from '../../../utils/dokumentUtils';
import { getOrganisasjonsnavnEllerOrgNummer } from '../../../utils/sakUtils';
import PdfLenke from '../../pdf-lenke/PdfLenke';

interface Props {
    arbeidsgivere: Organisasjon[];
    søknadId: string;
}

const ArbeidsgivereISøknad = ({ søknadId, arbeidsgivere }: Props) => {
    const intl = useIntl();
    return (
        <Box className="mt-4">
            <Heading size="xsmall" level="3" spacing={true}>
                <FormattedMessage id="bekreftelseTilArbeidsgiver.title" />
            </Heading>
            <VStack gap="4">
                <BodyLong>
                    <FormattedMessage id="bekreftelseTilArbeidsgiver.info" />
                </BodyLong>
                <BodyLong>
                    <FormattedMessage id="bekreftelseTilArbeidsgiver.info.1" />
                </BodyLong>
                <List>
                    {arbeidsgivere.map((organisasjon) => (
                        <li key={organisasjon.organisasjonsnummer}>
                            <Box marginBlock="0 3">
                                <PdfLenke
                                    href={getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer(
                                        søknadId,
                                        organisasjon.organisasjonsnummer,
                                    )}
                                    tittel={intlHelper(intl, 'dokumenterSomKanLastesNed.bekreftelse', {
                                        organisasjonsnavn: getOrganisasjonsnavnEllerOrgNummer(organisasjon),
                                    })}
                                />
                            </Box>
                        </li>
                    ))}
                </List>
            </VStack>
        </Box>
    );
};

export default ArbeidsgivereISøknad;
