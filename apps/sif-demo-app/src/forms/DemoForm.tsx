import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heading, TextField, Select, Button, Box } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import RhfTextField from './react-hook-form-ds/RhfTextfield';

const schema = z.object({
    fornavn: z.string().min(1, 'Fornavn er påkrevd'),
    etternavn: z.string().min(1, 'Etternavn er påkrevd'),
    fodselsdato: z.string(),
    favorittdyr: z.string(),
});

type FormData = z.infer<typeof schema>;

const DemoForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    return (
        <>
            <Heading level="2" size="medium" spacing={true}>
                Testskjema
            </Heading>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormLayout.Questions>
                        <RhfTextField label="Fornavn" {...register('fornavn')} error={errors.fornavn?.message} />
                        <TextField label="Etternavn" {...register('etternavn')} error={errors.etternavn?.message} />
                        <Select label="Favorittdyr" {...register('favorittdyr')}>
                            <option value="">Velg et dyr</option>
                            <option value="cat">Katt</option>
                            <option value="dog">Hund</option>
                            <option value="cow">Ku</option>
                        </Select>

                        <Box>
                            <Button type="submit">Send inn</Button>
                        </Box>
                    </FormLayout.Questions>
                </form>
            </FormProvider>
        </>
    );
};

export default DemoForm;
