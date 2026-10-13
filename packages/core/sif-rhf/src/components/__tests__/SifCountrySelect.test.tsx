import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { IntlProvider } from 'react-intl';
import { describe, expect, it, vi } from 'vitest';

import { SifCountrySelect } from '../SifCountrySelect';

vi.mock('@sif/utils', () => ({
    getCountries: () => [
        { alpha3: 'NOR', name: 'Norge' },
        { alpha3: 'SWE', name: 'Sverige' },
    ],
}));

interface FormValues {
    land: string;
}

const TestForm = () => {
    const methods = useForm<FormValues>({ defaultValues: { land: '' } });

    return (
        <IntlProvider locale="nb">
            <FormProvider {...methods}>
                <SifCountrySelect<FormValues> name="land" label="Land" excludeNorway />
            </FormProvider>
        </IntlProvider>
    );
};

describe('SifCountrySelect', () => {
    it('viser ikke Norge når excludeNorway er satt', () => {
        render(<TestForm />);

        expect(screen.queryByRole('option', { name: 'Norge' })).toBeNull();
        expect(screen.getByRole('option', { name: 'Sverige' })).not.toBeNull();
    });
});
