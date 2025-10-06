import { UxSignalsPanel } from '@navikt/sif-common-core-ds';
import useUxSignals from '@navikt/sif-common-core-ds/src/hooks/useUxSignals';

const UXRapportertInntekt = () => {
    useUxSignals(true);

    return <UxSignalsPanel panelId="1bmhfberhs" mode="demo" />;
};

export default UXRapportertInntekt;
