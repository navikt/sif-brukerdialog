import { FormProvider, useForm } from 'react-hook-form';

interface Props {
    formId: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const TestForm = ({ formId }: Props) => {
    const methods = useForm<any>({ defaultValues: {} });
    const onSubmit = (values: any) => {
        console.log(values);
    };
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    methods.handleSubmit((values) => onSubmit(values))();
                }}
                noValidate
                id={formId}>
                <input type="text" name="test" />
            </form>
        </FormProvider>
    );
};
