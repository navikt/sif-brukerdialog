import { UxSignalsPanel } from '@navikt/sif-common-core-ds';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import React from 'react';

import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import { harRapportertInntekt } from '../utils/deltakelseUtils';

const UXRapportertInntekt = () => {
    const [visPanel, setVisPanel] = React.useState(false);
    const { deltakelsePeriode } = useDeltakerContext();
    useEffectOnce(() => {
        setVisPanel(harRapportertInntekt(deltakelsePeriode.oppgaver));
    });
    return visPanel ? <UxSignalsPanel panelId="1bmhfberhs" mode="demo" /> : null;
};

export default UXRapportertInntekt;
