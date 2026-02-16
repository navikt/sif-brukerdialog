import { useUxSignalsLoader, UxSignalsPanel } from '@navikt/sif-common-core-ds';

const UXArbeidstidTilFravær = () => {
    useUxSignalsLoader(true);

    if (!import.meta.env.INJECT_DECORATOR) {
        return;
    }

    return <UxSignalsPanel panelId="t7e75vzq0" />;
};

export default UXArbeidstidTilFravær;
