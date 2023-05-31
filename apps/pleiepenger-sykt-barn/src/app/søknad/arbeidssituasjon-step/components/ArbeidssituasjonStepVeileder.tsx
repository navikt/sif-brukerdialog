import React from 'react';
import { FormattedMessage } from 'react-intl';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/lib/atoms/formatted-html-message/FormattedHtmlMessage';

const ArbeidssituasjonStepVeileder: React.FunctionComponent = () => (
    <SifGuidePanel>
        <p>
            <FormattedMessage id="steg.arbeidssituasjon.veileder.1" />
        </p>
        <p>
            <FormattedHtmlMessage id="steg.arbeidssituasjon.veileder.2" />
        </p>
        <p>
            <FormattedHtmlMessage id="steg.arbeidssituasjon.veileder.3" />
        </p>
    </SifGuidePanel>
);

export default ArbeidssituasjonStepVeileder;
