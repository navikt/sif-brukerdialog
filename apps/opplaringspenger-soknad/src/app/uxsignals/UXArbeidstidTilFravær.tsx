import { useUxSignalsLoader, UxSignalsPanel } from '@navikt/sif-common-core-ds';

const UXArbeidstidTilFravær = () => {
    useUxSignalsLoader(true);

    if (import.meta.env.IS_PLAYWRIGHT) {
        return;
    }

    return <UxSignalsPanel panelId="t7e75vzq0" />;
};

export default UXArbeidstidTilFravær;
