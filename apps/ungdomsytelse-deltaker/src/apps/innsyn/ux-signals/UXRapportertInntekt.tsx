import { useUxSignalsLoader, UxSignalsPanel } from '@sif/surveys';

const UXRapportertInntekt = () => {
    useUxSignalsLoader(true);

    return <UxSignalsPanel panelId="1bmhfberhs" />;
};

export default UXRapportertInntekt;
