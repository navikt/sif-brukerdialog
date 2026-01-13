import { BodyLong, Button, Checkbox, Fieldset, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { useSlettDeltaker } from '../../hooks/useSlettDeltaker';
import { Deltaker } from '../../types/Deltaker';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import DeltakerInfo from '../../pages/deltaker-page/parts/DeltakerInfo';
import BorderBox from '../../atoms/BorderBox';
import { fødselsnummerFormatter } from '../../utils/formaterFødselsnummer';
import { useTextFieldFormatter } from '../../hooks/useTextFieldFormatter';

interface Props {
    deltaker: Deltaker;
    onCancel: () => void;
    onDeltakerSlettet: () => void;
}

type Validations = {
    fnr?: string;
    bekreftelse?: string;
};

const SlettAktivDeltakerForm = ({ deltaker, onCancel, onDeltakerSlettet }: Props) => {
    const { error, isPending, mutate } = useSlettDeltaker(deltaker.id);
    const [validationError, setValidationError] = useState<Validations | undefined>(undefined);
    const [bekrefter, setBekrefter] = useState<boolean>(false);
    const [fnrValue, setFnrValue] = useState<string>('');

    const textFieldFormatter = useTextFieldFormatter(fødselsnummerFormatter);
    const { hasFocus, ...textFieldFormatterProps } = textFieldFormatter;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidationError(undefined);

        const fnrErValid = fnrValue === deltaker.deltakerIdent;
        if (!fnrErValid || !bekrefter) {
            const validations: Validations = {};
            if (!fnrErValid) {
                validations.fnr = 'Fødselsnummeret stemmer ikke';
            }
            if (!bekrefter) {
                validations.bekreftelse = 'Bekreftelse er påkrevd';
            }
            setValidationError(validations);
        } else {
            mutate({ deltakerId: deltaker.id }, { onSuccess: onDeltakerSlettet });
        }
    };
    return (
        <VStack gap="4">
            <BodyLong>
                Informasjon før skjema for sletting. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                architecto fugiat dolores iusto deserunt odio blanditiis eligendi unde, odit suscipit perspiciatis
                tempora voluptate nobis sed quam, atque aperiam. Beatae, laboriosam!
            </BodyLong>

            <VStack gap="4">
                <Heading level="2" size="small">
                    Deltaker
                </Heading>
                <DeltakerInfo deltaker={deltaker} skjulHeader={true} copyFnrEnabled={false} />
            </VStack>

            <form onSubmit={handleSubmit}>
                <VStack gap="4">
                    <BorderBox className="p-6 items-center w-full">
                        <VStack gap="4">
                            <Heading level="2" size="small">
                                Skjema for slett deltaker
                            </Heading>
                            <TextField
                                name="bekreft-fodselsnummer"
                                label="Fødselsnummer/d-nummer:"
                                autoComplete="off"
                                onChange={(evt) => {
                                    setFnrValue(evt.target.value);
                                }}
                                value={hasFocus ? fnrValue || '' : fødselsnummerFormatter.applyFormat(fnrValue)}
                                size="medium"
                                maxLength={11}
                                htmlSize={15}
                                width="10rem"
                                error={validationError?.fnr}
                                description="Skriv inn deltakers fødselsnummer for å bekrefte slettingen"
                                {...textFieldFormatterProps}
                            />
                            <Fieldset
                                error={validationError?.bekreftelse}
                                legend="Skjema for å slette deltaker"
                                hideLegend={true}>
                                <Checkbox
                                    name="bekreft-sletting"
                                    onChange={(evt) => {
                                        setBekrefter(evt.target.checked);
                                        setValidationError(undefined);
                                    }}>
                                    Jeg bekrefter at {formatName(deltaker.navn)} skal slettes som deltaker
                                </Checkbox>
                            </Fieldset>
                        </VStack>
                    </BorderBox>
                    <HStack gap="4">
                        <Button type="submit" variant="primary" loading={isPending}>
                            Slett deltaker
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

export default SlettAktivDeltakerForm;
