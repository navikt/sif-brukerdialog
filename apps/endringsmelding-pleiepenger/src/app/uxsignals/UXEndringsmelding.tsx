import { useUxSignalsLoader, UxSignalsPanel } from '@sif/surveys';

const UXEndringsmelding = () => {
    useUxSignalsLoader(!import.meta.env.IS_PLAYWRIGHT);

    if (import.meta.env.IS_PLAYWRIGHT) {
        return null;
    }

    return <UxSignalsPanel panelId="q1ey0l5yr" />;
};

export default UXEndringsmelding;
