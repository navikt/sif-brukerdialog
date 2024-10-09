import { Button, Fieldset, Heading, HStack, TextField } from '@navikt/ds-react';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useState } from 'react';

interface Props {
    valgtFnr?: string;
    onDeltakerValgt: (fnr?: string) => void;
}

const VelgDeltaker = ({ onDeltakerValgt, valgtFnr }: Props) => {
    const [validationError, setValidationError] = useState<string | undefined>(undefined);
    const [fnr, setFnr] = useState<string | undefined>(valgtFnr);
    const fnrValidator = getFødselsnummerValidator({ required: true });
    // const fnrRef = useRef<HTMLInputElement>(null);

    const hentSøker = async () => {
        // const fnr = fnrRef.current?.value;
        const error = fnrValidator(fnr);
        setValidationError(error);
        if (fnr && error === undefined) {
            onDeltakerValgt(fnr);
        }
        if (fnr && error) {
            onDeltakerValgt(undefined);
        }
    };

    return (
        <>
            <Heading level="2" size="medium" spacing={true}>
                Deltaker
            </Heading>
            <form
                onSubmit={(evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    hentSøker();
                }}>
                <Fieldset error={validationError} legend="Hent deltaker" hideLegend={true}>
                    <HStack gap="2" align={'end'}>
                        <TextField
                            name="fnr"
                            value={fnr}
                            onChange={(evt) => {
                                setFnr(evt.target.value);
                                if (fnr !== valgtFnr) {
                                    onDeltakerValgt(undefined);
                                }
                            }}
                            label="Fødselsnummer"
                            size="medium"
                            style={{ width: '11rem' }}
                            maxLength={11}
                        />
                        {(!valgtFnr || valgtFnr !== fnr) && (
                            <Button type="submit" variant="secondary">
                                Velg
                            </Button>
                        )}
                    </HStack>
                </Fieldset>
            </form>
        </>
    );
};

export default VelgDeltaker;
