import { BodyLong, Button, ConfirmationPanel, HStack, List, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { useSlettNyDeltaker } from '../../hooks/useSlettNyDeltaker';
import { Deltaker } from '../../types/Deltaker';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';

interface Props {
    deltaker: Deltaker;
    onCancel: () => void;
    onDeltakerSlettet: () => void;
}

const SlettNyDeltakerForm = ({ deltaker, onCancel, onDeltakerSlettet }: Props) => {
    const { error, isPending, mutate } = useSlettNyDeltaker(deltaker.id);
    const [validationError, setValidationError] = useState<string | undefined>(undefined);
    const [bekrefter, setBekrefter] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidationError(undefined);

        if (!bekrefter) {
            setValidationError('Bekreftelse er påkrevd');
        } else {
            mutate({ deltakerId: deltaker.id }, { onSuccess: onDeltakerSlettet });
        }
    };
    return (
        <VStack gap="space-24">
            <BodyLong>
                Du kan slette en deltaker frem til deltaker har sendt inn en søknad. Men det er noen viktige punkter som
                du må ivareta hvis du sletter:
            </BodyLong>

            <List>
                <List.Item title="Deltaker må kontaktes">
                    Deltaker er informert om at hen er meldt inn i programmet, og har fått en oppgave på Min side på
                    nav.no om å sende inn en søknad. Du må derfor ta kontakt med deltakeren og informere om at hen kan
                    ignorere denne oppgaven.
                </List.Item>
                <List.Item>
                    En slettet deltaker vil ikke være synlig i saksbehandlingssystemet for ungdomsytelsen.
                </List.Item>
                <List.Item>
                    En slettet deltaker vil ikke hindre at deltaker kan meldes inn på et senere tidspunkt.
                </List.Item>
            </List>
            <form onSubmit={handleSubmit}>
                <VStack gap="space-24">
                    <ConfirmationPanel
                        label={`Jeg bekrefter at ${formatName(deltaker.navn)} skal slettes som deltaker`}
                        name="bekreft-sletting"
                        error={validationError}
                        onChange={(evt) => {
                            setBekrefter(evt.target.checked);
                            setValidationError(undefined);
                        }}
                    />
                    <HStack gap="space-16">
                        <Button type="submit" variant="primary" loading={isPending}>
                            Slett ny deltaker
                        </Button>
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Avbryt
                        </Button>
                    </HStack>
                    {error ? <ApiErrorAlert error={error} /> : null}
                </VStack>
            </form>
        </VStack>
    );
};

export default SlettNyDeltakerForm;
