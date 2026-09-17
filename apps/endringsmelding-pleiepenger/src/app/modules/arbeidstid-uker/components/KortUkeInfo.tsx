import { Box } from '@navikt/ds-react';

import { AppText } from '../../../i18n';
import { Arbeidsuke } from '../../../types';
import { getDagerTekst } from '../../../utils';

interface Props {
    arbeidsuke: Arbeidsuke;
}

const KortUkeInfo = ({ arbeidsuke }: Props) => (
    <Box>
        <AppText id="endreArbeidstidForm.kortUke.info" values={{ dager: getDagerTekst(arbeidsuke.periode) }} />
    </Box>
);

export default KortUkeInfo;
