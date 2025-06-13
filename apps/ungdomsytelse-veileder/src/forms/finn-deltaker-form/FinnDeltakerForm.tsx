/* eslint-disable no-constant-binary-expression */
import { Box, Button, Checkbox, Fieldset, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { getFødselsnummerValidator, ValidateFødselsnummerError } from '@navikt/sif-validation';
import { Deltakelse, Deltaker, fødselsnummerFormatter, UregistrertDeltaker } from '@navikt/ung-common';
import { useTextFieldFormatter } from '@navikt/ung-common/src/hooks/useTextFieldFormatter';
import DeltakerKort from '../../components/deltaker-kort/DeltakerKort';
import { useFinnDeltaker } from '../../hooks/useFinnDeltaker';
import MeldInnDeltakerForm from '../meld-inn-deltaker-form/MeldInnDeltakerForm';
import FinnDeltakerApiError from './FinnDeltakerApiError';
import DevUserList from '../../dev-components/DevUserList';

interface Props {
    onDeltakerFetched: (deltaker: Deltaker) => void;
    onDeltakelseRegistrert: (deltakelse: Deltakelse) => void;
}

const fnrValidator = getFødselsnummerValidator({ required: true, allowHnr: true });

const fnrValideringsmeldinger = {
    [ValidateFødselsnummerError.fødselsnummerHasNoValue]: 'Fødselsnummer har ikke verdi',
    [ValidateFødselsnummerError.fødselsnummerIsNot11Chars]: 'Fødselsnummer må være 11 tegn',
    [ValidateFødselsnummerError.fødselsnummerIsInvalid]: 'Fødselsnummer er ugyldig',
    [ValidateFødselsnummerError.fødselsnummerAsHnrIsNotAllowed]: 'Fødselsnummer kan ikke være HNR',
    [ValidateFødselsnummerError.fødselsnummerIsNotAllowed]: 'Fødselsnummeret er ikke tillatt',
};

const FinnDeltakerForm = ({ onDeltakerFetched, onDeltakelseRegistrert }: Props) => {
    const [validationError, setValidationError] = useState<string | undefined>(undefined);
    const [fnrValue, setFnrValue] = useState<string | undefined>();
    const [nyDeltaker, setNyDeltaker] = useState<UregistrertDeltaker | undefined>();
    const [visRegistrerNySkjema, setVisRegistrerNySkjema] = useState<boolean>(false);

    const textFieldFormatter = useTextFieldFormatter(fødselsnummerFormatter);
    const { hasFocus, ...textFieldFormatterProps } = textFieldFormatter;

    const { data, error, isLoading, refetch } = useFinnDeltaker(fnrValue || '', false);

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        setValidationError(undefined);

        const fnrError = fnrValidator(fnrValue);
        setValidationError(fnrError ? fnrValideringsmeldinger[fnrError] : undefined);

        if (fnrValue && fnrError === undefined) {
            setNyDeltaker(undefined);
            refetch();
        }
    };

    useEffect(() => {
        if (data) {
            if ('id' in data && data.id !== undefined) {
                onDeltakerFetched(data as Deltaker);
            } else {
                setNyDeltaker(data as UregistrertDeltaker);
            }
        }
    }, [data, onDeltakerFetched]);

    useEffect(() => {
        if (validationError) {
            const fnrError = fnrValidator(fnrValue);
            setValidationError(fnrError ? fnrValideringsmeldinger[fnrError] : undefined);
        }
    }, [validationError, fnrValue]);

    const resetForm = () => {
        setNyDeltaker(undefined);
        setFnrValue(undefined);
        setValidationError(undefined);
    };

    return (
        <VStack gap="4" className="hentDeltakerForm w-full">
            <VStack gap="2">
                <form onSubmit={handleSubmit}>
                    <Fieldset
                        error={validationError}
                        legend={
                            <Heading level="2" size="medium">
                                Registrer ny/finn deltaker
                            </Heading>
                        }
                        hideLegend={false}>
                        <HStack gap="2" align="end" paddingBlock="2 0">
                            <HStack gap="2" align="end" paddingBlock="2 0">
                                <TextField
                                    name="fnr"
                                    value={hasFocus ? fnrValue || '' : fødselsnummerFormatter.applyFormat(fnrValue)}
                                    label="Fødselsnummer/d-nummer:"
                                    onChange={(evt) => {
                                        setFnrValue(evt.target.value);
                                        setNyDeltaker(undefined);
                                    }}
                                    size="medium"
                                    maxLength={11}
                                    {...textFieldFormatterProps}
                                />
                                <Box>
                                    <Button type="submit" variant="primary" loading={isLoading}>
                                        Søk
                                    </Button>
                                </Box>
                            </HStack>
                        </HStack>
                    </Fieldset>
                </form>
                {error && fnrValue ? <FinnDeltakerApiError error={error} fnr={fnrValue} /> : null}
            </VStack>

            {nyDeltaker ? (
                <VStack gap="2">
                    <DeltakerKort deltaker={nyDeltaker} onClose={resetForm} />

                    <Checkbox
                        checked={visRegistrerNySkjema}
                        onChange={(evt) => setVisRegistrerNySkjema(evt.target.checked)}>
                        Registrer som ny deltaker i ungdomsprogrammet
                    </Checkbox>
                </VStack>
            ) : null}

            {visRegistrerNySkjema && nyDeltaker ? (
                <MeldInnDeltakerForm
                    deltaker={nyDeltaker}
                    onCancel={() => {
                        setVisRegistrerNySkjema(false);
                    }}
                    onDeltakelseRegistrert={onDeltakelseRegistrert}
                />
            ) : null}
            {1 + 1 === 2 && <DevUserList />}
        </VStack>
    );
};

export default FinnDeltakerForm;
