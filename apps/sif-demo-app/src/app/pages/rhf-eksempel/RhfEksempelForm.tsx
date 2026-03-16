import { Heading, VStack } from '@navikt/ds-react';
import {
    getCheckedValidator,
    getListValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-validation';
import { useIntl } from 'react-intl';

import { createSifFormComponents, sifValidate } from '../../../sif-rhf';

enum Field {
    navn = 'navn',
    epost = 'epost',
    rolle = 'rolle',
    interesser = 'interesser',
    samtykke = 'samtykke',
}

interface FormValues {
    [Field.navn]: string;
    [Field.epost]: string;
    [Field.rolle]: string;
    [Field.interesser]: string[];
    [Field.samtykke]: string[];
}

const { Form, TextField, RadioGroup, CheckboxGroup } = createSifFormComponents<FormValues>();

const defaultValues: FormValues = {
    navn: '',
    epost: '',
    rolle: '',
    interesser: [],
    samtykke: [],
};

export const RhfEksempelForm = () => {
    const intl = useIntl();

    const v = (fieldName: string, validator: (value: any) => string | undefined) =>
        sifValidate(validator, fieldName, intl);

    const handleSubmit = (values: FormValues) => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <VStack gap="space-8" maxWidth="40rem" style={{ margin: '2rem auto' }}>
            <Heading size="large">RHF Eksempel</Heading>
            <Form
                formProps={{ defaultValues }}
                onSubmit={handleSubmit}
                onBack={() => history.back()}
                submitButtonLabel="Send inn"
                isFinalSubmit={true}>
                <VStack gap="space-6">
                    <TextField
                        name={Field.navn}
                        label="Navn"
                        validate={v(Field.navn, getStringValidator({ required: true }))}
                    />

                    <TextField
                        name={Field.epost}
                        label="E-post"
                        validate={v(Field.epost, getStringValidator({ required: true, formatRegExp: /@/ }))}
                    />

                    <RadioGroup
                        name={Field.rolle}
                        legend="Hvilken rolle har du?"
                        validate={v(Field.rolle, getRequiredFieldValidator())}
                        radios={[
                            { label: 'Forelder', value: 'forelder' },
                            { label: 'Fosterforelder', value: 'fosterforelder' },
                            { label: 'Annet', value: 'annet' },
                        ]}
                    />

                    <CheckboxGroup
                        name={Field.interesser}
                        legend="Hva gjelder søknaden?"
                        validate={v(Field.interesser, getListValidator({ required: true }))}
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
                        validate={v(Field.samtykke, getCheckedValidator())}
                        checkboxes={[
                            {
                                label: 'Samtykker du til at vi behandler opplysningene dine?',
                                value: 'samtykke',
                            },
                        ]}
                    />
                </VStack>
            </Form>
        </VStack>
    );
};
