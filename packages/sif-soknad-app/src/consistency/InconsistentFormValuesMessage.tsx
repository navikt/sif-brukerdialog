import { Box, Link, LocalAlert } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';

interface Props {
    stepId: string;
    stepTitle: string;
    onNavigateToStep: () => void;
    heading?: string;
    description?: string;
}

/**
 * Viser en advarsel når bruker har navigert til et steg uten å submitte
 * endringer på et tidligere steg. Scroller til seg selv og tar fokus.
 */
export const InconsistentFormValuesMessage = ({
    stepId,
    stepTitle,
    onNavigateToStep,
    heading = 'Oops, dette stemmer ikke helt',
    description,
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        requestAnimationFrame(() => {
            ref.current?.scrollIntoView({ behavior: 'auto', block: 'center' });
            ref.current?.focus({ preventScroll: true });
        });
    }, []);

    if (!stepId) return null;

    const handleClick = (evt: React.MouseEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        onNavigateToStep();
    };

    const defaultDescription = `Vennligst gå tilbake til steget "${stepTitle}", og bruk knappene nederst i skjemaet for å gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.`;

    return (
        <Box marginBlock="space-8">
            <LocalAlert ref={ref} status="warning" tabIndex={-1}>
                <LocalAlert.Header>
                    <LocalAlert.Title>{heading}</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                    {description ?? defaultDescription}{' '}
                    <Link href="#" onClick={handleClick}>
                        Gå til {stepTitle}
                    </Link>
                </LocalAlert.Content>
            </LocalAlert>
        </Box>
    );
};
