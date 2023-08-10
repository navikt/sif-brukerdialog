import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { Duration, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import userEvent from '@testing-library/user-event';
import TidEnkeltdagForm from './TidEnkeltdagForm';
import { render, withMarkup } from '../../../tests/TestUtils';

describe('<TidEnkeltdagDialog>', () => {
    const handleCancel = jest.fn();
    const handleSubmit = jest.fn();

    const renderDialog = (tider?: { tid?: Partial<Duration>; tidOpprinnelig?: Duration }) =>
        render(
            <TidEnkeltdagForm
                hvorMyeSpørsmålRenderer={() => 'Hvor mye'}
                minTid={{ hours: 0, minutes: 0 }}
                maksTid={{ hours: 7, minutes: 30 }}
                dato={ISODateToDate('2022-02-02')}
                periode={ISODateRangeToDateRange('2022-01-01/2022-02-15')}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                {...tider}
            />
        );

    it('rendrer dialog uten at tid er satt', async () => {
        const screen = renderDialog();
        const timer = screen.getByLabelText('Timer');
        const minutter = screen.getByLabelText('Minutter');
        const submit = screen.getByText('Lagre');
        expect(timer).toBeDefined();
        expect(minutter).toBeDefined();
        expect(submit).toBeDefined();
    });
    it('rendrer dialog med initiell tid', async () => {
        const screen = renderDialog({ tid: { hours: '1', minutes: '30' } });
        const timer = screen.getByLabelText('Timer');
        const minutter = screen.getByLabelText('Minutter');
        expect(timer).toHaveValue('1');
        expect(minutter).toHaveValue('30');
    });
    it('rendrer dialog med opprinneligTid tid', async () => {
        const screen = renderDialog({ tidOpprinnelig: { hours: '1', minutes: '30' } });
        const textWithMarkup = withMarkup(screen.getByText);
        expect(textWithMarkup('Endret fra 1 time 30 minutter')).toBeDefined();
    });
    it('Viser feilmelding ved ugyldig input', async () => {
        const screen = renderDialog();
        const timer = screen.getByLabelText('Timer');
        const minutter = screen.getByLabelText('Minutter');
        const submit = screen.getByText('Lagre');
        userEvent.type(timer, 'x');
        userEvent.type(minutter, 'x');
        userEvent.click(submit);
        await waitFor(
            () => {
                expect(screen.getByText('Antall timer er ikke et gyldig tall.')).toBeDefined();
            },
            { timeout: 200 }
        );
        fireEvent.change(timer, { target: { value: '0' } });
        await waitFor(
            () => {
                expect(screen.getByText('Antall minutter er ikke et gyldig tall.')).toBeDefined();
            },
            { timeout: 200 }
        );
        fireEvent.change(minutter, { target: { value: '' } });
        fireEvent.change(timer, { target: { value: '' } });
        userEvent.click(submit);
        await waitFor(
            () => {
                expect(screen.getByText('Du må fylle ut timer og minutter.')).toBeDefined();
            },
            { timeout: 200 }
        );
        fireEvent.change(timer, { target: { value: '5' } });
        fireEvent.change(minutter, { target: { value: '30' } });
        userEvent.click(submit);

        await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
    });
});
