import { useUxSignalsLoader, UxSignalsPanel } from '@navikt/sif-common-core-ds';

const UXRapportertInntekt = () => {
    useUxSignalsLoader(true);

    return <UxSignalsPanel panelId="1bmhfberhs" />;
};

export default UXRapportertInntekt;
