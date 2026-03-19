import { Button, Heading, HStack, VStack } from '@navikt/ds-react';
import {
    getCheckedValidator,
    getDateValidator,
    getListValidator,
    getNumberValidator,
    getRequiredFieldValidator,
    getStringValidator,
    getTimeValidator,
} from '@navikt/sif-validation';
import { createSifFormComponents, SifForm, useSifValidate } from '@sif/rhf';
import { useForm } from 'react-hook-form';

enum Field {
    navn = 'navn',
    epost = 'epost',
    omDeg = 'omDeg',
    bostedsland = 'bostedsland',
    fødselsdato = 'fødselsdato',
    antallBarn = 'antallBarn',
    periodeFra = 'periodeFra',
    periodeTil = 'periodeTil',
    favorittsport = 'favorittsport',
    varighet = 'varighet',
    tidspunkt = 'tidspunkt',
    rolle = 'rolle',
    interesser = 'interesser',
    samtykke = 'samtykke',
}

interface FormValues {
    [Field.navn]: string;
    [Field.epost]: string;
    [Field.omDeg]: string;
    [Field.bostedsland]: string;
    [Field.fødselsdato]: string;
    [Field.antallBarn]: string;
    [Field.periodeFra]: string;
    [Field.periodeTil]: string;
    [Field.favorittsport]: string;
    [Field.varighet]: {
        hours: string;
        minutes: string;
    };
    [Field.tidspunkt]: string;
    [Field.rolle]: string;
    [Field.interesser]: string[];
    [Field.samtykke]: string[];
}

const {
    TextField,
    Textarea,
    NumberInput,
    Select,
    CountrySelect,
    TimeInput,
    RadioGroup,
    CheckboxGroup,
    Datepicker,
    DateRangePicker,
    Combobox,
} = createSifFormComponents<FormValues>();

const defaultValues: FormValues = {
    navn: '',
    epost: '',
    omDeg: '',
    bostedsland: '',
    fødselsdato: '',
    antallBarn: '',
    periodeFra: '',
    periodeTil: '',
    favorittsport: '',
    varighet: {
        hours: '',
        minutes: '',
    },
    tidspunkt: '',
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

                    <Textarea
                        name={Field.omDeg}
                        label="Om deg"
                        minRows={3}
                        maxLength={500}
                        validate={validateField(Field.omDeg, getStringValidator({ required: true }))}
                    />

                    <CountrySelect
                        name={Field.bostedsland}
                        label="Bostedsland"
                        validate={validateField(Field.bostedsland, getRequiredFieldValidator())}
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

                    <NumberInput
                        name={Field.antallBarn}
                        label="Antall barn"
                        integerValue
                        validate={validateField(
                            Field.antallBarn,
                            getNumberValidator({ required: true, min: 1, max: 20 }),
                        )}
                    />

                    <TimeInput
                        name={Field.varighet}
                        label="Varighet"
                        description="Oppgi antall timer og minutter"
                        timeInputLayout={{
                            compact: true,
                            direction: 'vertical',
                        }}
                        validate={validateField(
                            Field.varighet,
                            getTimeValidator({ required: true, min: { hours: 0, minutes: 15 } }),
                        )}
                    />

                    <DateRangePicker
                        legend="Periode"
                        fromInputProps={{
                            name: Field.periodeFra,
                            label: 'Fra dato',
                            validate: validateField(Field.periodeFra, getDateValidator({ required: true })),
                        }}
                        toInputProps={{
                            name: Field.periodeTil,
                            label: 'Til dato',
                            validate: validateField(Field.periodeTil, getDateValidator({ required: true })),
                        }}
                    />

                    <Combobox
                        name={Field.favorittsport}
                        label="Favorittsport"
                        options={['Fotball', 'Håndball', 'Ski', 'Svømming', 'Friidrett', 'Ishockey']}
                        validate={validateField(Field.favorittsport, getRequiredFieldValidator())}
                    />

                    <Select
                        name={Field.tidspunkt}
                        label="Tidspunkt"
                        validate={validateField(Field.tidspunkt, getRequiredFieldValidator())}>
                        <option value="">Velg tidspunkt</option>
                        <option value="morgen">Morgen</option>
                        <option value="middag">Middag</option>
                        <option value="kveld">Kveld</option>
                    </Select>

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
