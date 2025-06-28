import { Box, Button, Checkbox, Fieldset, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { getFødselsnummerValidator, ValidateFødselsnummerError } from '@navikt/sif-validation';
import { Deltakelse, Deltaker, UregistrertDeltaker } from '@navikt/ung-common';
import { isAxiosError } from 'axios';
import DeltakerKort from '../../components/deltaker-kort/DeltakerKort';
import DevUserList from '../../dev-components/DevUserList';
import { useFinnDeltaker } from '../../hooks/useFinnDeltaker';
import { useTextFieldFormatter } from '../../hooks/useTextFieldFormatter';
import { AppHendelse, useAnalyticsInstance } from '../../utils/analytics';
import { fødselsnummerFormatter } from '../../utils/formaterFødselsnummer';
import MeldInnDeltakerForm from '../meld-inn-deltaker-form/MeldInnDeltakerForm';
import FinnDeltakerApiError from './FinnDeltakerApiError';

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
    const [errorHendelseLogget, setErrorHendelseLogget] = useState<boolean>(false);

    const textFieldFormatter = useTextFieldFormatter(fødselsnummerFormatter);
    const { hasFocus, ...textFieldFormatterProps } = textFieldFormatter;
    const { logAppHendelse } = useAnalyticsInstance();

    const { data, error, isLoading, refetch } = useFinnDeltaker(fnrValue || '', false);

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        setValidationError(undefined);
        setErrorHendelseLogget(false);

        const fnrError = fnrValidator(fnrValue);
        setValidationError(fnrError ? fnrValideringsmeldinger[fnrError] : undefined);

        if (fnrValue && fnrError === undefined) {
            setNyDeltaker(undefined);
            await logAppHendelse(AppHendelse.søkerOppDeltaker);
            refetch();
        }
    };

    useEffect(() => {
        if (data) {
            if ('id' in data && data.id !== undefined) {
                logAppHendelse(AppHendelse.registrertDeltakerFunnet);
                onDeltakerFetched(data as Deltaker);
            } else {
                logAppHendelse(AppHendelse.nyDeltakerFunnet);
                setNyDeltaker(data as UregistrertDeltaker);
            }
        }
    }, [data, onDeltakerFetched]);

    useEffect(() => {
        if (!errorHendelseLogget && error && isAxiosError(error.originalError)) {
            if (error.originalError.status === 403) {
                logAppHendelse(AppHendelse.finnDeltakerIkkeTilgang);
            } else if (error.originalError.status === 404) {
                logAppHendelse(AppHendelse.finnDeltakerIkkeFunnet);
            } else if (error.originalError.status === 500) {
                logAppHendelse(AppHendelse.finnDeltakerApiFeil);
            }
            setErrorHendelseLogget(true);
        }
    }, [error, errorHendelseLogget]);

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
                                Registrer eller finn deltaker
                            </Heading>
                        }
                        hideLegend={false}>
                        <HStack gap="2" align="end" paddingBlock="2 0">
                            <HStack gap="2" align="end" paddingBlock="2 0">
                                <TextField
                                    name="fnr"
                                    value={hasFocus ? fnrValue || '' : fødselsnummerFormatter.applyFormat(fnrValue)}
                                    label="Fødselsnummer/d-nummer:"
                                    autoComplete="off"
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
            <DevUserList />
        </VStack>
    );
};

export default FinnDeltakerForm;
