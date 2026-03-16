import { ReactNode, useRef } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { useFocusOnValidationError } from '../hooks/useFocusOnValidationError';
import { SifValidationSummary } from './SifValidationSummary';

interface Props<T extends FieldValues> {
    children: ReactNode;
    methods: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    buttons?: ReactNode;
    noValidate?: boolean;
    autoComplete?: string;
    validationSummaryHeading?: string;
    className?: string;
    id?: string;
}

export function SifForm<T extends FieldValues>({
    children,
    methods,
    onSubmit,
    buttons,
    noValidate = true,
    autoComplete = 'off',
    validationSummaryHeading,
    className,
    id,
}: Props<T>) {
    const summaryRef = useRef<HTMLDivElement>(null);
    useFocusOnValidationError(summaryRef, methods.formState);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                noValidate={noValidate}
                autoComplete={autoComplete}
                className={className}
                id={id}>
                {children}
                <SifValidationSummary ref={summaryRef} heading={validationSummaryHeading} />
                {buttons}
            </form>
        </FormProvider>
    );
}
