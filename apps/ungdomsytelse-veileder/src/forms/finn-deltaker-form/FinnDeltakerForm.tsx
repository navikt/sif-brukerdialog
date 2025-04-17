import {
    Alert,
    BodyShort,
    Box,
    Button,
    Checkbox,
    CopyButton,
    Fieldset,
    HStack,
    TextField,
    VStack,
} from '@navikt/ds-react';
import { ReactElement, useEffect, useState } from 'react';
import { getFødselsnummerValidator, ValidateFødselsnummerError } from '@navikt/sif-validation';
import {
    Deltakelse,
    Deltaker,
    fødselsnummerFormatter,
    isApiErrorObject,
    UregistrertDeltaker,
} from '@navikt/ung-common';
import { useTextFieldFormatter } from '@navikt/ung-common/src/hooks/useTextFieldFormatter';
import DeltakerKort from '../../components/deltaker-kort/DeltakerKort';
import { getAppEnv } from '../../utils/appEnv';
import MeldInnDeltakerForm from '../meld-inn-deltaker-form/MeldInnDeltakerForm';
import { findDeltakerByIdent, isFindDeltakerError } from '../../api/deltaker/findDeltaker';

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
    const [error, setError] = useState<string | ReactElement | undefined>(undefined);
    const [fnrValue, setFnrValue] = useState<string | undefined>();
    const [pending, setPending] = useState<boolean>(false);
    const [nyDeltaker, setNyDeltaker] = useState<UregistrertDeltaker | undefined>();
    const [registrerNy, setRegistrerNy] = useState<boolean>(false);

    const textFieldFormatter = useTextFieldFormatter(fødselsnummerFormatter);

    const fetchDeltaker = async () => {
        setError(undefined);
        const fnrError = fnrValidator(fnrValue);
        setValidationError(fnrError ? fnrValideringsmeldinger[fnrError] : undefined);
        if (fnrValue && fnrError === undefined) {
            setPending(true);
            setNyDeltaker(undefined);
            try {
                const deltakerEllerKandidat = await findDeltakerByIdent(fnrValue);
                if (deltakerEllerKandidat.id !== undefined) {
                    setPending(false);
                    onDeltakerFetched(deltakerEllerKandidat);
                } else {
                    setPending(false);
                    setNyDeltaker(deltakerEllerKandidat);
                }
            } catch (e) {
                setPending(false);
                if (isFindDeltakerError(e)) {
                    setError(e.message);
                } else if (isApiErrorObject(e)) {
                    setError(
                        <VStack gap="6">
                            <BodyShort>En feil oppstod ved henting av deltaker. Vennligst prøv på nytt</BodyShort>
                            <BodyShort size="small">
                                {e.error.code}: {e.error.message}
                            </BodyShort>
                        </VStack>,
                    );
                    console.error(e);
                } else {
                    console.error(e);
                    setError('En feil oppstod ved henting av deltaker');
                }
            }
        }
    };

    const { hasFocus, ...textFieldFormatterProps } = textFieldFormatter;

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
        setError(undefined);
    };

    return (
        <VStack className="rounded-md bg-gray-50 p-8 pt-8 pb-8 items-center w-full drop-shadow-2xl" maxWidth={'30rem'}>
            <VStack gap="3" className="hentDeltakerForm w-full">
                <form
                    onSubmit={(evt) => {
                        evt.stopPropagation();
                        evt.preventDefault();
                        fetchDeltaker();
                    }}>
                    <Fieldset error={validationError} legend="Finn deltaker" hideLegend={false}>
                        <HStack gap="2" align={'end'} paddingBlock="2 0">
                            <HStack gap="2" align={'end'} paddingBlock="2 0">
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
                                    <Button type="submit" variant="primary" loading={pending}>
                                        Hent
                                    </Button>
                                </Box>
                            </HStack>
                        </HStack>
                    </Fieldset>
                </form>
                {error ? <Alert variant="error">{error}</Alert> : null}
                {nyDeltaker ? (
                    <VStack gap="2">
                        <Box className="rounded-md bg-surface-default p-4 items-center w-full">
                            <DeltakerKort deltaker={nyDeltaker} onClose={resetForm} />
                        </Box>
                        <Checkbox checked={registrerNy} onChange={(evt) => setRegistrerNy(evt.target.checked)}>
                            Registrer som ny deltaker
                        </Checkbox>
                    </VStack>
                ) : (
                    <Box height={'1rem'} />
                )}
                {registrerNy && nyDeltaker ? (
                    <Box marginBlock="4 0">
                        <MeldInnDeltakerForm
                            deltaker={nyDeltaker}
                            onCancel={() => setRegistrerNy(false)}
                            onDeltakelseRegistrert={onDeltakelseRegistrert}
                        />
                    </Box>
                ) : null}
                {getAppEnv().isLocal ? (
                    <VStack>
                        Testbrukere lokalt:
                        <HStack gap="2" align={'center'}>
                            <CopyButton copyText="03867198392" size="small" /> 03867198392
                        </HStack>
                        <HStack gap="2" align={'center'}>
                            <CopyButton copyText="56857102105" size="small" /> 56857102105
                        </HStack>
                    </VStack>
                ) : null}
            </VStack>
        </VStack>
    );
};

export default FinnDeltakerForm;
