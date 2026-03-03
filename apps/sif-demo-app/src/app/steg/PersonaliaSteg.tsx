import { Button, Heading, Radio, RadioGroup, TextField, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';

import { SøknadFooter } from '@rammeverk/components';
import { useStegNavigasjon } from '@rammeverk/state';

import { useFormSubmitGuard } from '../components/FormSubmitGuard';
import { StegId, stegConfig, stegRekkefølge } from '../config/stegConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useStegStatus } from '../hooks/useStegStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';

interface Skjemadata {
    navn: string;
    harKjæledyr?: 'ja' | 'nei';
}

export const PersonaliaSteg = () => {
    const stegId = StegId.PERSONALIA;
    const appState = useSøknadStore((s) => s.søknadState);
    const submitSteg = useSøknadStore((s) => s.submitSteg);
    const setCurrentSteg = useSøknadStore((s) => s.setCurrentSteg);
    const avbrytSøknad = useAvbrytSøknad();

    const stegStatus = useStegStatus();
    const { gåTilNeste } = useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus, setCurrentSteg });

    const { register, handleSubmit, watch, setValue, getValues } = useForm<Skjemadata>({
        defaultValues: {
            navn: appState?.søknadsdata[stegId]?.navn ?? '',
            harKjæledyr: appState?.søknadsdata[stegId]?.harKjæledyr,
        },
    });

    const harKjæledyr = watch('harKjæledyr');

    const { FormSubmitGuardInfo, clearFormValues } = useFormSubmitGuard({ stegId, getValues: () => getValues() });

    const onSubmit = (data: Skjemadata) => {
        if (!data.navn || !data.harKjæledyr) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        submitSteg(
            { [stegId]: { navn: data.navn, harKjæledyr: data.harKjæledyr } },
            {
                onSuccess: () => {
                    clearFormValues();
                    gåTilNeste(stegId);
                },
            },
        );
    };

    return (
        <VStack gap="space-24">
            <FormSubmitGuardInfo />
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="space-16">
                    <Heading size="large">Personalia</Heading>
                    <TextField label="Navn" {...register('navn')} />
                    <RadioGroup
                        legend="Har du kjæledyr?"
                        value={harKjæledyr}
                        onChange={(value) => setValue('harKjæledyr', value)}>
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                    </RadioGroup>
                    <div>
                        <Button type="submit">Neste</Button>
                    </div>
                </VStack>
            </form>
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
};
