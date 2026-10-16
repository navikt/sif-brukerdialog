import { InlineMessage } from '@navikt/ds-react';
import React from 'react';

import { AppText } from '../../../i18n';

const ArbeidssituasjonStepVeileder: React.FunctionComponent = () => (
    <>
        <p>
            <AppText id="steg.arbeidssituasjon.veileder.1" />
        </p>
        <p>
            <AppText id="steg.arbeidssituasjon.veileder.2" />
        </p>
        <InlineMessage status="info">
            <AppText id="steg.arbeidssituasjon.veileder.3" />
        </InlineMessage>
    </>
);

export default ArbeidssituasjonStepVeileder;
