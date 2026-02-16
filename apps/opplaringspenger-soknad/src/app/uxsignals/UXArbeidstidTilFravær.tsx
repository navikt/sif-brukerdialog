import { useUxSignalsLoader, UxSignalsPanel } from '@navikt/sif-common-core-ds';

const UXArbeidstidTilFravær = () => {
    useUxSignalsLoader(true);

    return <UxSignalsPanel panelId="t7e75vzq0" />;
};

export default UXArbeidstidTilFravær;
