import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';
import { ReactNode, useRef } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps } from 'react-hook-form';

import { SifValidationSummary } from './SifValidationSummary';

interface Props<T extends FieldValues> {
    children: ReactNode;
    formProps?: Omit<UseFormProps<T>, 'mode' | 'reValidateMode'>;
    onSubmit: SubmitHandler<T>;
    onBack?: () => void;
    includeValidationSummary?: boolean;
    submitPending?: boolean;
    submitDisabled?: boolean;
    submitButtonLabel?: string;
    backButtonLabel?: string;
    isFinalSubmit?: boolean;
    showButtonArrows?: boolean;
    errorSummaryTitle?: string;
    className?: string;
    id?: string;
}

export function SifForm<T extends FieldValues>({
    children,
    formProps,
    onSubmit,
    onBack,
    includeValidationSummary = true,
    submitPending,
    submitDisabled,
    submitButtonLabel,
    backButtonLabel,
    isFinalSubmit,
    showButtonArrows = true,
    errorSummaryTitle,
    className,
    id,
}: Props<T>) {
    const methods = useForm<T>({
        ...formProps,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    const summaryRef = useRef<HTMLDivElement>(null);

    const handleSubmit = methods.handleSubmit(onSubmit, () => {
        setTimeout(() => summaryRef.current?.focus(), 100);
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off" className={className} id={id}>
                {children}

                {includeValidationSummary && (
                    <div style={{ marginTop: '2rem' }}>
                        <SifValidationSummary<T> heading={errorSummaryTitle} summaryRef={summaryRef} />
                    </div>
                )}

                <div style={{ marginTop: '2rem' }}>
                    <HStack gap="space-4">
                        {onBack && (
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={onBack}
                                icon={showButtonArrows ? <ArrowLeftIcon aria-hidden /> : undefined}>
                                {backButtonLabel || 'Forrige steg'}
                            </Button>
                        )}
                        <Button
                            variant="primary"
                            type="submit"
                            loading={submitPending}
                            disabled={submitDisabled}
                            iconPosition="right"
                            icon={
                                showButtonArrows ? (
                                    isFinalSubmit ? (
                                        <PaperplaneIcon aria-hidden />
                                    ) : (
                                        <ArrowRightIcon aria-hidden />
                                    )
                                ) : undefined
                            }>
                            {submitButtonLabel || (isFinalSubmit ? 'Send inn' : 'Neste steg')}
                        </Button>
                    </HStack>
                </div>
            </form>
        </FormProvider>
    );
}
