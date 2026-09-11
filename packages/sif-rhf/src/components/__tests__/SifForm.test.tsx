import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { SifForm } from '../SifForm';

interface FormValues {
    felt: string;
}

const TestForm = ({ onSubmit }: { onSubmit: () => Promise<unknown> }) => {
    const methods = useForm<FormValues>({ defaultValues: { felt: 'verdi' } });

    return (
        <SifForm<FormValues> methods={methods} onSubmit={onSubmit} buttons={<button type="submit">Send inn</button>}>
            <div />
        </SifForm>
    );
};

describe('SifForm', () => {
    // Regresjonstest: feiler dersom catchen i SifForm fjernes.
    it('gir ingen unhandled rejection når onSubmit feiler', async () => {
        const unhandled = vi.fn();
        process.on('unhandledRejection', unhandled);

        render(<TestForm onSubmit={() => Promise.reject(new Error('innsending feilet'))} />);
        fireEvent.click(screen.getByRole('button', { name: 'Send inn' }));

        await new Promise((resolve) => setTimeout(resolve, 50));
        process.off('unhandledRejection', unhandled);

        expect(unhandled).not.toHaveBeenCalled();
    });

    it('kjører onSubmit normalt når den lykkes', async () => {
        const onSubmit = vi.fn().mockResolvedValue(undefined);

        render(<TestForm onSubmit={onSubmit} />);
        fireEvent.click(screen.getByRole('button', { name: 'Send inn' }));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalled();
        });
    });
});
