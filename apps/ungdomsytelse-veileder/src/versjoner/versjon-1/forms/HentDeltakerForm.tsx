import { Box, Button, Checkbox, Fieldset, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { veilederService } from '../../../api/services/veilederService';
import { Deltaker, isDeltaker, NyDeltaker } from '../../../api/types';
import { useTextFieldFormatter } from '../hooks/useTextFieldFormatter';
import { fnrFormatter } from '../utils/fnrFormatter';
import DeltakerKort from '../components/DeltakerKort';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import NyDeltakerForm from './ny-deltaker-form/NyDeltakerForm';

interface Props {
    onDeltakerFetched: (deltaker: Deltaker) => void;
    onNyDeltaker: (deltaker: NyDeltaker) => void;
}

const fnrValidator = getFødselsnummerValidator({ required: true, allowHnr: true });

const HentDeltakerForm = ({ onDeltakerFetched }: Props) => {
    const [validationError, setValidationError] = useState<string | undefined>(undefined);
    const [fnrValue, setFnrValue] = useState<string | undefined>('56857102105');
    const [pending, setPending] = useState<boolean>(false);
    const [nyDeltaker, setNyDeltaker] = useState<NyDeltaker | undefined>();
    const [registrerNy, setRegistrerNy] = useState<boolean>(false);

    const textFieldFormatter = useTextFieldFormatter(fnrFormatter);

    const fetchDeltaker = async () => {
        const error = fnrValidator(fnrValue);
        setValidationError(error);
        if (fnrValue && error === undefined) {
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
                setValidationError('Det oppstod en feil');
            }
        }
    };

    useEffectOnce(() => {
        fetchDeltaker();
    });

    const { hasFocus, ...textFieldFormatterProps } = textFieldFormatter;

    const resetForm = () => {
        setNyDeltaker(undefined);
        setFnrValue(undefined);
        setValidationError(undefined);
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
                                label="Deltakers fødselsnummer"
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
                    <NyDeltakerForm
                        deltaker={nyDeltaker}
                        onCancel={() => setRegistrerNy(false)}
                        onDeltakerRegistrert={onDeltakerFetched}
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
