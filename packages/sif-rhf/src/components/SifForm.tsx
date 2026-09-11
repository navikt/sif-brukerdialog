import { VStack } from '@navikt/ds-react';
import { ReactNode, useRef } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { useFocusOnValidationError } from '../hooks/useFocusOnValidationError';
import { SifValidationSummary } from './SifValidationSummary';

interface Props<T extends FieldValues> {
    children: ReactNode;
    methods: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    buttons?: ReactNode;
    validationSummaryHeading?: string;
    className?: string;
    id?: string;
}

export function SifForm<T extends FieldValues>({
    children,
    methods,
    onSubmit,
    buttons,
    validationSummaryHeading,
    className,
    id,
}: Props<T>) {
    const summaryRef = useRef<HTMLDivElement>(null);
    useFocusOnValidationError(summaryRef, methods.formState);

    // RHF sin handleSubmit fanger ikke feil fra asynkrone submit-handlere. Uten denne
    // catchen ender feilen som en unhandled rejection. Forventede feil håndteres og
    // vises av skjemaet selv — her fanges bare restene.
    const handleSubmit: SubmitHandler<T> = async (values, event) => {
        try {
            await onSubmit(values, event);
        } catch {
            // Ingen rapportering her — se kommentar over.
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate className={className} id={id}>
                <VStack gap="space-32">
                    {children}
                    <SifValidationSummary ref={summaryRef} heading={validationSummaryHeading} />
                    {buttons}
                </VStack>
            </form>
        </FormProvider>
    );
}
