import { Alert, Box, Heading, Link } from '@navikt/ds-react';

interface InvalidStepInfoProps {
    /** Liste over stepId-er som har ugyldige/ulagrede endringer */
    invalidSteps: string[];
    /** Funksjon som returnerer visningsnavn for et steg */
    getStepTitle: (stepId: string) => string;
    /** Funksjon som navigerer til et steg */
    onNavigateToStep: (stepId: string) => void;
    /** Valgfri overskrift */
    heading?: string;
    /** Valgfri beskrivelse */
    description?: string;
}

/**
 * Viser en advarsel når bruker har navigert til et steg uten å submitte endringer
 * på et tidligere steg. Ber bruker gå tilbake og bruke skjemaets navigasjonsknapper.
 */
export const InvalidStepInfo = ({
    invalidSteps,
    getStepTitle,
    onNavigateToStep,
    heading = 'Oops, dette stemmer ikke helt',
    description,
}: InvalidStepInfoProps) => {
    if (invalidSteps.length === 0) {
        return null;
    }

    const firstInvalidStep = invalidSteps[0];
    const stepTitle = getStepTitle(firstInvalidStep);

    const handleClick = (evt: React.MouseEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        onNavigateToStep(firstInvalidStep);
    };

    const defaultDescription = `Vennligst gå tilbake til steget "${stepTitle}", og bruk knappene nederst i skjemaet for å gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.`;

    return (
        <Box marginBlock="space-8">
            <Alert variant="warning">
                <Heading level="2" size="small" spacing>
                    {heading}
                </Heading>
                {description ?? defaultDescription.replace('${stepTitle}', stepTitle)}{' '}
                <Link href="#" onClick={handleClick}>
                    Gå til {stepTitle}
                </Link>
            </Alert>
        </Box>
    );
};
