import { Box, Button, Heading } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';
import { FormLayout } from '@navikt/sif-common-ui';
import { RhfForm, RhfSelect, RhfTextField } from '@navikt/sif-hook-form-wrappers';

export interface FormValues {
    fornavn?: string;
    etternavn?: string;
    favorittdyr?: 'cat' | 'dog' | 'cow';
}

const DemoForm = () => {
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fornavn: '',
            etternavn: '',
            favorittdyr: undefined,
        },
    });

    const onSubmit = (values: FormValues) => {
        console.log(values);
    };

    return (
        <>
            <Heading level="2" size="medium" spacing={true}>
                Testskjema
            </Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <FormLayout.Questions>
                    <RhfTextField name="fornavn" control={formMethods.control} label="Fornavn" />
                    <RhfTextField name="etternavn" control={formMethods.control} label="Etternavn" />
                    <RhfSelect name="favorittdyr" control={formMethods.control} label="Favorittdyr">
                        <option value="">Velg et dyr</option>
                        <option value="cat">Katt</option>
                        <option value="dog">Hund</option>
                        <option value="cow">Ku</option>
                    </RhfSelect>
                    <Box>
                        <Button type="submit">Send inn</Button>
                    </Box>
                </FormLayout.Questions>
            </RhfForm>
        </>
    );
};

export default DemoForm;
