import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
    SøknadStepFormProvider,
    useSøknadStepFormContext,
} from '../SøknadStepFormContext';
import { SøknadAppContext, SøknadAppContextValue } from '../../context/SøknadAppContext';
import { useMellomlagring } from '../../hooks/useMellomlagring';
import { createSøknadAppStore } from '../../store/createSøknadAppStore';

const createContextValue = (
    store: ReturnType<typeof createSøknadAppStore>,
    lagreMellomlagring = vi.fn().mockResolvedValue(undefined),
): SøknadAppContextValue => ({
    store,
    config: { start: { route: 'start' } },
    stepOrder: ['start'],
    versjon: 1,
    basePath: '/soknad',
    applicationTitle: 'Test',
    resumeLaterUrl: 'https://www.nav.no/minside',
    lagreMellomlagring,
    slettMellomlagring: vi.fn().mockResolvedValue(undefined),
});

const LiveFormValues = ({ stepId, values }: { stepId: string; values: Record<string, unknown> }) => {
    const { registerGetValuesForStep, unregisterGetValuesForStep } = useSøknadStepFormContext();

    useEffect(() => {
        registerGetValuesForStep(stepId, () => values);
        return () => unregisterGetValuesForStep(stepId);
    }, [stepId, values, registerGetValuesForStep, unregisterGetValuesForStep]);

    return null;
};

const SaveButton = () => {
    const { lagre } = useMellomlagring();
    return <button onClick={() => void lagre()}>Lagre</button>;
};

const FormThatSavesOnUnmount = () => {
    const { registerGetValuesForStep, unregisterGetValuesForStep, setFormValuesForStep, shouldSaveOnUnmountForStep } =
        useSøknadStepFormContext();

    useEffect(() => {
        registerGetValuesForStep('start', () => ({ gammelVerdi: true }));
        return () => {
            unregisterGetValuesForStep('start');
            if (shouldSaveOnUnmountForStep('start')) {
                setFormValuesForStep('start', { gammelVerdi: true });
            }
        };
    }, [registerGetValuesForStep, unregisterGetValuesForStep, setFormValuesForStep, shouldSaveOnUnmountForStep]);

    return null;
};

const ClearAndUnmountButton = () => {
    const [showForm, setShowForm] = useState(true);
    const { clearAllFormValues, draftFormValues } = useSøknadStepFormContext();

    return (
        <>
            {showForm ? <FormThatSavesOnUnmount /> : null}
            <button
                onClick={() => {
                    clearAllFormValues();
                    setShowForm(false);
                }}>
                Avbryt
            </button>
            <output>{JSON.stringify(draftFormValues)}</output>
        </>
    );
};

describe('SøknadStepFormContext', () => {
    it('beholder persisterte verdier fra tidligere mellomlagring ved ny lagring', async () => {
        const store = createSøknadAppStore({ config: { start: { route: 'start' } }, stepOrder: ['start'] });
        store.getState().init({
            versjon: 1,
            resumeStepId: 'start',
            søknadsdata: {},
            persistedFormValues: { tidligereSteg: { bevart: true } },
        });
        const lagreMellomlagring = vi.fn().mockResolvedValue(undefined);

        render(
            <SøknadStepFormProvider>
                <SøknadAppContext.Provider value={createContextValue(store, lagreMellomlagring)}>
                    <LiveFormValues stepId="start" values={{ nytt: true }} />
                    <SaveButton />
                </SøknadAppContext.Provider>
            </SøknadStepFormProvider>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Lagre' }));

        await waitFor(() =>
            expect(lagreMellomlagring).toHaveBeenCalledWith(
                expect.objectContaining({
                    persistedFormValues: {
                        tidligereSteg: { bevart: true },
                        start: { nytt: true },
                    },
                }),
            ),
        );
    });

    it('lar ikke unmount lagre gamle skjemaverdier etter avbryt', () => {
        render(
            <SøknadStepFormProvider>
                <ClearAndUnmountButton />
            </SøknadStepFormProvider>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(screen.getByRole('status').textContent).toBe('{}');
    });
});
