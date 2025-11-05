import { Box, Heading, List } from '@navikt/ds-react';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';

import { Organisasjon } from '../../../types/Organisasjon';
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
            <p>
                <FormattedMessage id="bekreftelseTilArbeidsgiver.info" />
            </p>

            <p className="mt-4">
                <FormattedMessage id="bekreftelseTilArbeidsgiver.info.1" />
            </p>

            <List className="mt-4">
                {arbeidsgivere.map((organisasjon) => (
                    <li key={organisasjon.organisasjonsnummer}>
                        <PdfLenke
                            href={getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer(
                                søknadId,
                                organisasjon.organisasjonsnummer,
                            )}
                            tittel={intlHelper(intl, 'dokumenterSomKanLastesNed.bekreftelse', {
                                organisasjonsnavn: getOrganisasjonsnavnEllerOrgNummer(organisasjon),
                            })}
                        />
                    </li>
                ))}
            </List>
        </Box>
    );
};

export default ArbeidsgivereISøknad;
