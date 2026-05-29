import { useUxSignalsLoader, UxSignalsPanel } from '@navikt/sif-surveys';

const UXRapportertInntekt = () => {
    useUxSignalsLoader(true);

    return <UxSignalsPanel panelId="1bmhfberhs" />;
};

export default UXRapportertInntekt;
