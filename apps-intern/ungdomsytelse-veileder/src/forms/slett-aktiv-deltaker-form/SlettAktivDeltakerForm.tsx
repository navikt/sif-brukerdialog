import { BodyLong, Box, Button, Checkbox, Fieldset, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { useSlettDeltaker } from '../../hooks/useSlettDeltaker';
import { Deltaker } from '../../types/Deltaker';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import BorderBox from '../../atoms/BorderBox';
import { fødselsnummerFormatter } from '../../utils/formaterFødselsnummer';
import { useTextFieldFormatter } from '../../hooks/useTextFieldFormatter';
import Fødselsnummer from '../../atoms/Fødselsnummer';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../types/Deltakelse';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel: () => void;
    onDeltakerSlettet: () => void;
}

type Validations = {
    fnr?: string;
    bekreftelse?: string;
};

const SlettAktivDeltakerForm = ({ deltaker, deltakelse, onCancel, onDeltakerSlettet }: Props) => {
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
                architecto fugiat dolores iusto deserunt odio blanditiis.
            </BodyLong>

            <form onSubmit={handleSubmit}>
                <VStack gap="4">
                    <BorderBox className="p-6 items-center w-full">
                        <VStack gap="4">
                            <Heading level="2" size="small">
                                Deltaker som skal slettes
                            </Heading>

                            <Box marginBlock="0 4">
                                <dl className="ungDefinitionList">
                                    <dt>Navn:</dt>
                                    <dd>{formatName(deltaker.navn)}</dd>
                                    <dt>Fødselsdato:</dt>
                                    <dd>{dateFormatter.compact(deltaker.fødselsdato)}</dd>
                                    <dt>Fødselsnummer:</dt>
                                    <dd>
                                        <Fødselsnummer fnr={deltaker.deltakerIdent} copyEnabled={false} />
                                    </dd>
                                    <dt>Startdato:</dt>
                                    <dd>{dateFormatter.compact(deltakelse.fraOgMed)}</dd>
                                    <dt>Sluttdato:</dt>
                                    <dd>{deltakelse.tilOgMed ? dateFormatter.compact(deltakelse.tilOgMed) : '-'}</dd>
                                </dl>
                            </Box>

                            <TextField
                                name="bekreft-fodselsnummer"
                                label="Skriv inn deltakers fødselsnummer for å verifisere deltaker som skal slettes"
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
                    </BorderBox>
                </VStack>
            </form>
        </VStack>
    );
};

export default SlettAktivDeltakerForm;
