import { Box } from '@navikt/ds-react';
import { getDagerTekst } from '../../../utils';
import { Arbeidsuke } from '../../../types';
import { AppText } from '../../../i18n';

interface Props {
    arbeidsuke: Arbeidsuke;
}

const KortUkeInfo = ({ arbeidsuke }: Props) => (
    <Box>
        <AppText id="endreArbeidstidForm.kortUke.info" values={{ dager: getDagerTekst(arbeidsuke.periode) }} />
    </Box>
);

export default KortUkeInfo;
