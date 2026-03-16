import { Button, Heading, HStack, VStack } from '@navikt/ds-react';
import {
    getCheckedValidator,
    getDateValidator,
    getListValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-validation';
import { useForm } from 'react-hook-form';

import { createSifFormComponents, SifForm, useSifValidate } from '../../../sif-rhf';

enum Field {
    navn = 'navn',
    epost = 'epost',
    fødselsdato = 'fødselsdato',
    rolle = 'rolle',
    interesser = 'interesser',
    samtykke = 'samtykke',
}

interface FormValues {
    [Field.navn]: string;
    [Field.epost]: string;
    [Field.fødselsdato]: string;
    [Field.rolle]: string;
    [Field.interesser]: string[];
    [Field.samtykke]: string[];
}

const { TextField, RadioGroup, CheckboxGroup, Datepicker } = createSifFormComponents<FormValues>();

const defaultValues: FormValues = {
    navn: '',
    epost: '',
    fødselsdato: '',
    rolle: '',
    interesser: [],
    samtykke: [],
};

export const RhfEksempelForm = () => {
    const { validateField } = useSifValidate();

    const methods = useForm<FormValues>({
        defaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    const handleSubmit = (values: FormValues) => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <VStack gap="space-8" maxWidth="40rem" style={{ margin: '2rem auto' }}>
            <Heading size="large">RHF Eksempel</Heading>
            <SifForm methods={methods} onSubmit={handleSubmit}>
                <VStack gap="space-6">
                    <TextField
                        name={Field.navn}
                        label="Navn"
                        validate={validateField(Field.navn, getStringValidator({ required: true }))}
                    />

                    <TextField
                        name={Field.epost}
                        label="E-post"
                        validate={validateField(Field.epost, getStringValidator({ required: true, formatRegExp: /@/ }))}
                    />

                    <Datepicker
                        name={Field.fødselsdato}
                        label="Fødselsdato"
                        maxDate={new Date()}
                        validate={validateField(
                            Field.fødselsdato,
                            getDateValidator({ required: true, max: new Date() }),
                        )}
                    />

                    <RadioGroup
                        name={Field.rolle}
                        legend="Hvilken rolle har du?"
                        validate={validateField(Field.rolle, getRequiredFieldValidator())}
                        radios={[
                            { label: 'Forelder', value: 'forelder' },
                            { label: 'Fosterforelder', value: 'fosterforelder' },
                            { label: 'Annet', value: 'annet' },
                        ]}
                    />

                    <CheckboxGroup
                        name={Field.interesser}
                        legend="Hva gjelder søknaden?"
                        validate={validateField(Field.interesser, getListValidator({ required: true }))}
                        checkboxes={[
                            { label: 'Omsorgspenger', value: 'omsorgspenger' },
                            { label: 'Pleiepenger', value: 'pleiepenger' },
                            { label: 'Opplæringspenger', value: 'opplaeringspenger' },
                        ]}
                    />

                    <CheckboxGroup
                        name={Field.samtykke}
                        legend="Samtykke"
                        hideLegend
                        validate={validateField(Field.samtykke, getCheckedValidator())}
                        checkboxes={[
                            {
                                label: 'Samtykker du til at vi behandler opplysningene dine?',
                                value: 'samtykke',
                            },
                        ]}
                    />

                    <HStack gap="space-4">
                        <Button variant="secondary" type="button" onClick={() => history.back()}>
                            Forrige steg
                        </Button>
                        <Button variant="primary" type="submit">
                            Send inn
                        </Button>
                    </HStack>
                </VStack>
            </SifForm>
        </VStack>
    );
};
