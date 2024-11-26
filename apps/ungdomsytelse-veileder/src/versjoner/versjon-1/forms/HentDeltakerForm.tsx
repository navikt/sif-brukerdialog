import { Box, Button, Fieldset, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { veilederService } from '../../../api/services/veilederService';
import { useTextFieldFormatter } from '../hooks/useTextFieldFormatter';
import { Deltaker } from '../types/Deltaker';
import { fnrFormatter } from '../utils/fnrFormatter';

interface Props {
    onDeltakerFetched: (deltaker: Deltaker) => void;
}

const fnrValidator = getFødselsnummerValidator({ required: true, allowHnr: true });

const HentDeltakerForm = ({ onDeltakerFetched }: Props) => {
    const [validationError, setValidationError] = useState<string | undefined>(undefined);
    const [fnrValue, setFnrValue] = useState<string | undefined>();
    const [pending, setPending] = useState<boolean>(false);

    const textFieldFormatter = useTextFieldFormatter(fnrFormatter);

    const fetchDeltaker = async () => {
        const error = fnrValidator(fnrValue);
        setValidationError(error);
        if (fnrValue && error === undefined) {
            setPending(true);
            const deltaker = await veilederService.getDeltaker(fnrValue);
            if (deltaker) {
                setPending(false);
                onDeltakerFetched(deltaker);
            } else {
                setValidationError('Deltaker ikke funnet');
            }
        }
    };

    const quickFetch = (fnr: string) => {
        setValidationError(undefined);
        setFnrValue(fnr);
    };

    const { hasFocus, ...textFieldFormatterProps } = textFieldFormatter;

    return (
        <VStack gap="3" className="hentDeltakerForm">
            <form
                onSubmit={(evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    fetchDeltaker();
                }}>
                <Fieldset error={validationError} legend="Finn deltakelse" hideLegend={false}>
                    <HStack gap="2" align={'end'} paddingBlock="2 0">
                        <HStack gap="1" align={'end'} paddingBlock="2 0">
                            <TextField
                                name="fnr"
                                value={hasFocus ? fnrValue || '' : fnrFormatter.applyFormat(fnrValue)}
                                label="Deltakers fødselsnumer"
                                onChange={(evt) => {
                                    setFnrValue(evt.target.value);
                                }}
                                size="medium"
                                style={{ width: '11rem' }}
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
            <VStack gap="2">
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
            </VStack>
        </VStack>
    );
};

export default HentDeltakerForm;
