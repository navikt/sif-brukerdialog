import { Button, Heading, Radio, RadioGroup, TextField, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';

export interface PersonaliaSkjemadata {
    navn: string;
    harHobby?: 'ja' | 'nei';
}

interface Props {
    hookForm: ReturnType<typeof useForm<PersonaliaSkjemadata>>;
    onSubmit: (data: PersonaliaSkjemadata) => void;
    isPending: boolean;
}

const PersonaliaForm = ({ isPending, onSubmit, hookForm }: Props) => {
    const { register, handleSubmit, watch, setValue } = hookForm;

    const harHobby = watch('harHobby');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="space-16">
                <Heading size="large">Personalia</Heading>
                <TextField label="Navn" {...register('navn')} />
                <RadioGroup legend="Har du hobby?" value={harHobby} onChange={(value) => setValue('harHobby', value)}>
                    <Radio value="ja">Ja</Radio>
                    <Radio value="nei">Nei</Radio>
                </RadioGroup>
                <div>
                    <Button type="submit" disabled={isPending} loading={isPending}>
                        Neste
                    </Button>
                </div>
            </VStack>
        </form>
    );
};

export default PersonaliaForm;
