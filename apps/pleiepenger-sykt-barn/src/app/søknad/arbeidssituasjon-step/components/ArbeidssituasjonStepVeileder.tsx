import FormattedHtmlMessage from '@navikt/sif-common-core-ds/src/atoms/formatted-html-message/FormattedHtmlMessage';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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
