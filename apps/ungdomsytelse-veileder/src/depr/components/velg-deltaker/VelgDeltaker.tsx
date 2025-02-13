import { PersonIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, Heading, HStack, TextField } from '@navikt/ds-react';
import { getFødselsnummerValidator } from '@navikt/sif-validation';
import { useState } from 'react';

interface Props {
    valgtFnr?: string;
    onDeltakerValgt: (fnr?: string) => void;
}

const VelgDeltaker = ({ onDeltakerValgt, valgtFnr }: Props) => {
    const [validationError, setValidationError] = useState<string | undefined>(undefined);
    const [fnr, setFnr] = useState<string | undefined>(valgtFnr);
    const fnrValidator = getFødselsnummerValidator({ required: true, allowHnr: true });

    const hentSøker = async () => {
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
                <HStack align={'center'} gap="2">
                    <PersonIcon width="2.5rem" height={'2.5rem'} />
                    Deltaker
                </HStack>
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
