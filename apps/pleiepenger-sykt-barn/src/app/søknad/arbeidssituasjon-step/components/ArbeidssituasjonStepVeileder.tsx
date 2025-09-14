import React from 'react';

import { AppText } from '../../../i18n';

const ArbeidssituasjonStepVeileder: React.FunctionComponent = () => (
    <>
        <p>
            <AppText id="steg.arbeidssituasjon.veileder.1" />
        </p>
        <p>
            <AppText
                id="steg.arbeidssituasjon.veileder.2"
                values={{ strong: (children) => <strong key="strong">{children}</strong> }}
            />
        </p>
        <p>
            <AppText id="steg.arbeidssituasjon.veileder.3" />
        </p>
    </>
);

export default ArbeidssituasjonStepVeileder;
