import { Alert, BodyShort, Box, Button, ConfirmationPanel, List, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker, formaterNavn } from '@navikt/ung-common';
import { useSlettDeltakelse } from '../../hooks/useSlettDeltakelse';
import { useState } from 'react';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onDeltakelseSlettet: () => void;
}

const SlettDeltakelseForm = ({ deltaker, deltakelse, onDeltakelseSlettet }: Props) => {
    const { error, isPending, mutate } = useSlettDeltakelse(deltaker.id, deltakelse.id);
    const [validationError, setValidationError] = useState<string | undefined>(undefined);
    const [bekrefter, setBekrefter] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidationError(undefined);

        if (!bekrefter) {
            setValidationError('Bekreftelse er påkrevd');
        } else {
            mutate({ deltakelseId: deltakelse.id }, { onSuccess: onDeltakelseSlettet });
        }
    };
    return (
        <>
            <BodyShort spacing>
                Du kan slette en deltakelse frem til deltaker har sendt inn en søknad. Men det er noen viktige punkter
                som du må ivareta hvis du sletter:
            </BodyShort>
            <List>
                <List.Item title="Deltaker må kontaktes">
                    Deltaker er informert om at hen er meldt inn i programmet, og har fått en oppgave på Min side på
                    nav.no om å sende inn en søknad. Du må derfor ta kontakt med deltakeren og informere om at hen kan
                    ignorere denne oppgaven.
                </List.Item>
                <List.Item>
                    En slettet deltakelse vil ikke være synlig i saksbehandlingssystemet for ungdomsytelsen.
                </List.Item>
                <List.Item>
                    En slettet deltakelse vil ikke hindre at deltaker kan meldes inn på et senere tidspunkt.
                </List.Item>
            </List>
            <form onSubmit={handleSubmit}>
                <VStack gap="6">
                    <ConfirmationPanel
                        label={`Jeg bekrefter at deltakelsen for ${formaterNavn(deltaker.navn)} skal slettes`}
                        name="bekreft-sletting"
                        error={validationError}
                        onChange={(evt) => {
                            setBekrefter(evt.target.checked);
                            setValidationError(undefined);
                        }}
                    />
                    <Box>
                        <Button type="submit" variant="primary" loading={isPending}>
                            Slett deltakelse (kan ikke angres)
                        </Button>
                    </Box>
                    {error ? <Alert variant="error">{error.error.message}</Alert> : null}
                </VStack>
            </form>
        </>
    );
};

export default SlettDeltakelseForm;
