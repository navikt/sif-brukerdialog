import { Box, Button, Fieldset, HStack, TextField, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useTextFieldFormatter } from '../hooks/useTextFieldFormatter';
import { fnrFormatter } from '../utils/fnrFormatter';

interface Props {
    initialFnrValue?: string;
    onHentDeltaker: (fnr?: string) => void;
}

const HentDeltakerForm = ({ onHentDeltaker, initialFnrValue }: Props) => {
    const [validationError, setValidationError] = useState<string | undefined>(undefined);
    const [fnrValue, setFnrValue] = useState<string | undefined>(initialFnrValue);
    const fnrValidator = getFødselsnummerValidator({ required: true, allowHnr: true });

    const textFieldFormatter = useTextFieldFormatter(fnrFormatter);

    const hentDeltaker = async () => {
        const error = fnrValidator(fnrValue);
        setValidationError(error);
        if (fnrValue && error === undefined) {
            onHentDeltaker(fnrValue);
        }
        if (fnrValue && error) {
            onHentDeltaker(undefined);
        }
    };

    return (
        <VStack gap="3" className="hentDeltakerForm">
            <form
                onSubmit={(evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    hentDeltaker();
                }}>
                <Fieldset error={validationError} legend="Finn deltakelse" hideLegend={false}>
                    <HStack gap="2" align={'end'} paddingBlock="2 0">
                        <HStack gap="2" align={'end'} paddingBlock="2 0">
                            <TextField
                                name="fnr"
                                value={textFieldFormatter.hasFocus ? fnrValue : fnrFormatter.applyFormat(fnrValue)}
                                label="Deltakers fødselsnumer"
                                onChange={(evt) => {
                                    setFnrValue(evt.target.value);
                                }}
                                size="medium"
                                style={{ width: '11rem' }}
                                maxLength={11}
                                {...textFieldFormatter}
                            />
                            <Box>
                                <Button type="submit" variant="primary">
                                    Hent
                                </Button>
                            </Box>
                        </HStack>
                    </HStack>
                </Fieldset>
            </form>
        </VStack>
    );
};

export default HentDeltakerForm;
