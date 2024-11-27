import { Alert, BodyShort, Box, Button, Checkbox, Fieldset, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { veilederService } from '../../../api/services/veilederService';
import { Deltakelse, Deltaker, isDeltaker, NyDeltaker } from '../../../api/types';
import { useTextFieldFormatter } from '../hooks/useTextFieldFormatter';
import { fnrFormatter } from '../utils/fnrFormatter';
import DeltakerKort from '../components/DeltakerKort';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import MeldInnDeltakerForm from './meld-inn-deltaker-form/MeldInnDeltakerForm';
import { isAxiosError } from 'axios';

interface Props {
    onDeltakerFetched: (deltaker: Deltaker) => void;
    onDeltakelseRegistrert: (deltakelse: Deltakelse) => void;
}

const fnrValidator = getFødselsnummerValidator({ required: true, allowHnr: true });

const HentDeltakerForm = ({ onDeltakerFetched, onDeltakelseRegistrert }: Props) => {
    const [validationError, setValidationError] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | JSX.Element | undefined>(undefined);
    const [fnrValue, setFnrValue] = useState<string | undefined>();
    const [pending, setPending] = useState<boolean>(false);
    const [nyDeltaker, setNyDeltaker] = useState<NyDeltaker | undefined>();
    const [registrerNy, setRegistrerNy] = useState<boolean>(false);

    const textFieldFormatter = useTextFieldFormatter(fnrFormatter);

    const fetchDeltaker = async () => {
        setError(undefined);
        const fnrError = fnrValidator(fnrValue);
        setValidationError(fnrError);
        if (fnrValue && fnrError === undefined) {
            setPending(true);
            setNyDeltaker(undefined);
            try {
                const deltaker = await veilederService.getDeltakerByFnr(fnrValue);
                if (isDeltaker(deltaker)) {
                    setPending(false);
                    onDeltakerFetched(deltaker);
                } else {
                    setPending(false);
                    setNyDeltaker(deltaker);
                }
            } catch (e) {
                setPending(false);
                if (isAxiosError(e)) {
                    setError(
                        <VStack gap="6">
                            <BodyShort>En feil oppstod ved henting av deltaker. Vennligst prøv på nytt</BodyShort>
                            <BodyShort size="small">
                                {e.code}: {e.message}
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

    useEffectOnce(() => {
        if (fnrValue) {
            fetchDeltaker();
        }
    });

    const { hasFocus, ...textFieldFormatterProps } = textFieldFormatter;

    const resetForm = () => {
        setNyDeltaker(undefined);
        setFnrValue(undefined);
        setValidationError(undefined);
        setError(undefined);
    };

    return (
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
                                value={hasFocus ? fnrValue || '' : fnrFormatter.applyFormat(fnrValue)}
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
            {/* <VStack gap="2">
                Testbrukere lokalt:
                <Box>
                    <Button variant="secondary" size="xsmall" onClick={() => quickFetch('03867198392')}>
                        03867198392
                    </Button>
                </Box>
                <Box>
                    <Button variant="secondary" size="xsmall" onClick={() => quickFetch('56857102105')}>
                        56857102105 (ny)
                    </Button>
                </Box>
            </VStack> */}
        </VStack>
    );
};

export default HentDeltakerForm;
