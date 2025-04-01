import { Button, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useForm } from '@tanstack/react-form';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { dateToISOString } from '@navikt/sif-common-formik-ds';
import DateInputAndPicker from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/date-input-and-picker/DateInputAndPicker';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const EndreStartdatoFormTanstack = ({}: Props) => {
    const form = useForm({
        defaultValues: {
            startdato: dateToISOString(new Date()),
            deltakerInformert: '',
        },
        onSubmit: async ({ value }) => {
            console.log(JSON.stringify(value, null, 2));
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}>
            <VStack gap="8">
                <form.Field
                    name="startdato"
                    children={(field) => (
                        <>
                            <DateInputAndPicker name={field.name} label="ABC" onChange={(e) => field.setValue(e)} />
                        </>
                    )}
                />

                <form.Field
                    name="deltakerInformert"
                    children={(field) => (
                        <RadioGroup
                            legend="Er deltaker informert om endringen?"
                            value={field.state.value}
                            onChange={field.handleChange}
                            error={field.state.meta.errors.length > 0 ? field.state.meta.errors[0] : undefined}>
                            <Radio value="ja">Ja</Radio>
                            <Radio value="nei">Nei</Radio>
                        </RadioGroup>
                    )}
                />
                <Button type="submit">Endre</Button>
            </VStack>
        </form>
    );
};

export default EndreStartdatoFormTanstack;
