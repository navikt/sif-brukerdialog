import { render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { SifFileUpload } from '../SifFileUpload';
import { UploadedFile } from '../types';

interface FormValues {
    vedlegg: UploadedFile[];
}

const makeUploadedFile = (): UploadedFile => ({
    file: new File(['content'], 'file.jpg', { type: 'image/jpeg' }),
    pending: false,
    uploaded: true,
    error: false,
    reasons: [],
    canRetry: false,
    info: { id: 'id-1', url: 'http://example.com/id-1' },
});

const TestForm = ({ acceptedFiles }: { acceptedFiles: UploadedFile[] }) => {
    const methods = useForm<FormValues>({ defaultValues: { vedlegg: [] } });
    const values = useWatch({ control: methods.control, name: 'vedlegg' }) ?? [];

    return (
        <FormProvider {...methods}>
            <SifFileUpload<FormValues>
                name="vedlegg"
                acceptedFiles={acceptedFiles}
                onSelect={vi.fn()}
                label="Last opp"
            />
            <div data-testid="values-count">{values.length}</div>
        </FormProvider>
    );
};

describe('SifFileUpload', () => {
    it('synkroniserer acceptedFiles til RHF-feltet', async () => {
        const { rerender } = render(<TestForm acceptedFiles={[]} />);

        rerender(<TestForm acceptedFiles={[makeUploadedFile()]} />);

        await waitFor(() => {
            expect(screen.getByTestId('values-count').textContent).toBe('1');
        });
    });
});
