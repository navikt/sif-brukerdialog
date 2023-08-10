import { composeStories } from '@storybook/testing-react';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import * as stories from '../../../../../storybook/stories/skjema/ArbeidstidPeriodeForm.stories';
import { ArbeidstidPeriodeData } from '../../types';
import { ArbeiderIPeriodenSvar } from '../../../../types';
import { ensureCompleteDurationWeekdays, Weekday } from '@navikt/sif-common-utils/lib';

const { Default } = composeStories(stories);

describe('<ArbeidstidPeriodeForm>', () => {
    const fyllUtPeriode = async () => {
        expect(screen.getByText('Fra og med')).toBeInTheDocument();
        expect(screen.getByText('Til og med')).toBeInTheDocument();

        userEvent.click(screen.getByLabelText('Velg hele søknadsperioden'));

        expect(await screen.findByTestId('fra-dato')).toHaveValue('01.01.2022');
        expect(await screen.findByTestId('fra-dato')).toBeDisabled();
        expect(await screen.findByTestId('til-dato')).toHaveValue('01.04.2022');
        expect(await screen.findByTestId('til-dato')).toBeDisabled();
    };

    it('Helt fravær hele perioden', async () => {
        const onSubmit = jest.fn();

        render(<Default onSubmit={onSubmit} />);

        await fyllUtPeriode();

        userEvent.click(screen.getByTestId('helt-fravær'));
        userEvent.click(screen.getByText('Ok'));

        const submitData: ArbeidstidPeriodeData = {
            arbeiderHvordan: ArbeiderIPeriodenSvar.heltFravær,
            fom: dayjs.utc('2022-01-01').toDate(),
            tom: dayjs.utc('2022-04-01').toDate(),
        };

        await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(submitData));
    });
    it('Jobber som vanlig hele perioden', async () => {
        const onSubmit = jest.fn();

        render(<Default onSubmit={onSubmit} />);
        await fyllUtPeriode();

        userEvent.click(screen.getByTestId('som-vanlig'));
        userEvent.click(screen.getByText('Ok'));

        const submitData: ArbeidstidPeriodeData = {
            arbeiderHvordan: ArbeiderIPeriodenSvar.somVanlig,
            fom: dayjs.utc('2022-01-01').toDate(),
            tom: dayjs.utc('2022-04-01').toDate(),
        };

        await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(submitData));
    });

    it('Jobber redusert perioden', async () => {
        const onSubmit = jest.fn();

        render(<Default onSubmit={onSubmit} />);
        await fyllUtPeriode();

        userEvent.click(screen.getByTestId('jobber-redusert'));

        await userEvent.type(screen.getByTestId('tid-ukedager__friday_hours'), '2');

        userEvent.click(screen.getByText('Ok'));

        const submitData: ArbeidstidPeriodeData = {
            arbeiderHvordan: ArbeiderIPeriodenSvar.redusert,
            fom: dayjs.utc('2022-01-01').toDate(),
            tom: dayjs.utc('2022-04-01').toDate(),
            tidFasteDager: ensureCompleteDurationWeekdays({
                [Weekday.friday]: { hours: '2', minutes: '0' },
            }),
        };

        await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(submitData));
    });

    it('Stoppes dersom arbeidstid er under 0', async () => {
        render(<Default />);

        await fyllUtPeriode();
        await userEvent.click(screen.getByTestId('jobber-redusert'));
        await userEvent.click(screen.getByText('Ok'));

        expect(await screen.findByText('Feil i skjema')).toBeInTheDocument();
        expect(await screen.findAllByText('Du må oppgi hvor mange timer du jobber i uken.')).toHaveLength(2);
    });
});
