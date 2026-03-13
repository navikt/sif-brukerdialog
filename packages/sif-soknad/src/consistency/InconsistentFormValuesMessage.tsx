import { Alert, Box, Heading, Link } from '@navikt/ds-react';

interface Props {
    /** StepId som har ugyldige/ulagrede endringer */
    stepId: string;
    /** Funksjon som returnerer visningsnavn for et steg */
    stepTitle: string;
    /** Funksjon som navigerer til et steg */
    onNavigateToStep: () => void;
    /** Valgfri overskrift */
    heading?: string;
    /** Valgfri beskrivelse */
    description?: string;
}

/**
 * Viser en advarsel når bruker har navigert til et steg uten å submitte endringer
 * på et tidligere steg. Ber bruker gå tilbake og bruke skjemaets navigasjonsknapper.
 */
export const InconsistentFormValuesMessage = ({
    stepId,
    stepTitle,
    onNavigateToStep,
    heading = 'Oops, dette stemmer ikke helt',
    description,
}: Props) => {
    if (!stepId) {
        return null;
    }

    const handleClick = (evt: React.MouseEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        onNavigateToStep();
    };

    const defaultDescription = `Vennligst gå tilbake til steget "${stepTitle}", og bruk knappene nederst i skjemaet for å gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.`;

    return (
        <Box marginBlock="space-8">
            <Alert variant="warning">
                <Heading level="2" size="small" spacing>
                    {heading}
                </Heading>
                {description ?? defaultDescription}{' '}
                <Link href="#" onClick={handleClick}>
                    Gå til {stepTitle}
                </Link>
            </Alert>
        </Box>
    );
};
