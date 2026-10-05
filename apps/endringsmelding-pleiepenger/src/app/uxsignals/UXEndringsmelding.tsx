import { useUxSignalsLoader, UxSignalsPanel } from '@sif/surveys';

const UXEndringsmelding = () => {
    useUxSignalsLoader(true);

    if (import.meta.env.IS_PLAYWRIGHT) {
        return null;
    }

    return <UxSignalsPanel panelId="q1ey0l5yr" />;
};

export default UXEndringsmelding;
