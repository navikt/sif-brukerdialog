import React from 'react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { AppText } from '../../../i18n';

const ArbeidssituasjonStepVeileder: React.FunctionComponent = () => (
    <SifGuidePanel>
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
    </SifGuidePanel>
);

export default ArbeidssituasjonStepVeileder;
