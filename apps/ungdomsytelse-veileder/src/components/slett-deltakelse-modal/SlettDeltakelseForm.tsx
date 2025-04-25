import { Alert, BodyShort, Button, ConfirmationPanel, HStack, List, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker, formaterNavn, isApiErrorObject } from '@navikt/ung-common';
import { useSlettDeltakelse } from '../../hooks/useSlettDeltakelse';
import { useState } from 'react';
import ApiErrorInfo from '../api-error-info/ApiErrorInfo';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel: () => void;
    onDeltakelseSlettet: () => void;
}

const SlettDeltakelseForm = ({ deltaker, deltakelse, onCancel, onDeltakelseSlettet }: Props) => {
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
                    <HStack gap="4">
                        <Button type="submit" variant="primary" loading={isPending}>
                            Slett deltakelse (kan ikke angres)
                        </Button>
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Avbryt
                        </Button>
                    </HStack>
                    {error ? <Alert variant="error">{getErrorMessage(error)}</Alert> : null}
                </VStack>
            </form>
        </>
    );
};

const getErrorMessage = (error: unknown) => {
    if (isApiErrorObject(error)) {
        return <ApiErrorInfo apiError={error} />;
    } else {
        return 'En feil oppstod ved henting av deltaker';
    }
};

export default SlettDeltakelseForm;
