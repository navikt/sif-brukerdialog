import { Alert, Box, BoxNew, Button, Checkbox, Fieldset, HStack, TextField, VStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { getFødselsnummerValidator, ValidateFødselsnummerError } from '@navikt/sif-validation';
import {
    Deltakelse,
    Deltaker,
    fødselsnummerFormatter,
    isApiErrorObject,
    UregistrertDeltaker,
} from '@navikt/ung-common';
import { useTextFieldFormatter } from '@navikt/ung-common/src/hooks/useTextFieldFormatter';
import ApiErrorInfo from '../../components/api-error-info/ApiErrorInfo';
import DeltakerKort from '../../components/deltaker-kort/DeltakerKort';
import { useFinnDeltaker } from '../../hooks/useFinnDeltaker';
import MeldInnDeltakerForm from '../meld-inn-deltaker-form/MeldInnDeltakerForm';
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
        <BoxNew
            background="info-moderate"
            borderRadius="medium"
            shadow="dialog"
            className="p-8 pt-8 pb-14 items-center w-full"
            maxWidth="30rem">
            <VStack gap="4" className="hentDeltakerForm w-full">
                <VStack gap="2">
                    <form onSubmit={handleSubmit}>
                        <Fieldset error={validationError} legend="Finn deltaker" hideLegend={false}>
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
                    {error ? <Alert variant="error">{getErrorMessage(error)}</Alert> : null}
                </VStack>

                {nyDeltaker ? (
                    <VStack gap="2">
                        <DeltakerKort deltaker={nyDeltaker} onClose={resetForm} />

                        <Checkbox
                            checked={visRegistrerNySkjema}
                            onChange={(evt) => setVisRegistrerNySkjema(evt.target.checked)}>
                            Registrer som ny deltaker
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
                <DevUserList />
            </VStack>
        </BoxNew>
    );
};

const getErrorMessage = (error: unknown) => {
    if (isApiErrorObject(error)) {
        return <ApiErrorInfo apiError={error} />;
    } else {
        return 'En feil oppstod ved henting av deltaker';
    }
};

export default FinnDeltakerForm;
