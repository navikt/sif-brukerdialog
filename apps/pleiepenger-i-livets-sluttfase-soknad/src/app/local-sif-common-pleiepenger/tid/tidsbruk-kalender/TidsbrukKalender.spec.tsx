import React from 'react';
import { DateRange, getDatesInMonthOutsideDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { TidsbrukKalender } from '../..';
import { render } from '../../../tests/TestUtils';
import ArbeidstidEnkeltdagTekst from '../../arbeidstid/arbeidstid-kalender/components/arbeidstid-enkeltdag-tekst/ArbeidstidEnkeltdagTekst';

const måned: DateRange = {
    from: ISODateToDate('2022-02-01'),
    to: ISODateToDate('2022-02-28'),
};

const periode: DateRange = {
    from: ISODateToDate('2022-02-09'),
    to: ISODateToDate('2022-02-11'),
};

describe('<Tid>', () => {
    const renderKalender = () =>
        render(
            <TidsbrukKalender
                dager={{
                    '2021-01-01': {
                        hours: '0',
                        minutes: '0',
                    },
                    '2021-01-04': {
                        hours: '0',
                        minutes: '0',
                    },
                    '2021-01-05': {
                        hours: '2',
                        minutes: '0',
                    },
                }}
                dagerOpprinnelig={{
                    '2021-01-01': {
                        hours: '7',
                        minutes: '30',
                    },
                    '2021-01-04': {
                        hours: '7',
                        minutes: '30',
                    },
                    '2021-01-05': {
                        hours: '5',
                        minutes: '30',
                    },
                }}
                utilgjengeligeDatoer={getDatesInMonthOutsideDateRange(måned.from, periode)}
                tomUkeContentRenderer={() => <>Ingen dager tilgjengelig denne uken</>}
                periode={måned}
                skjulTommeDagerIListe={true}
                visOpprinneligTid={true}
                tidRenderer={({ tid, prosent }) => <ArbeidstidEnkeltdagTekst tid={tid} prosent={prosent} />}
                opprinneligTidRenderer={({ tid, prosent }) => <ArbeidstidEnkeltdagTekst tid={tid} prosent={prosent} />}
                onDateClick={(date: Date) => {
                    console.log(date);
                }}
            />
        );

    it('rendres only required week', async () => {
        const screen = renderKalender();
        expect(screen.queryByTestId('calendar-grid-week-number-5')).toBeNull();
        expect(screen.queryByTestId('calendar-grid-week-number-6')).toBeDefined();
        expect(screen.queryByTestId('calendar-grid-week-number-7')).toBeNull();
    });
    it('rendres days in week correctly', async () => {
        const screen = renderKalender();
        expect(screen.queryByTestId('calendar-grid-date-2022-02-07')).toHaveClass('calendarGrid__day--disabled');
        expect(screen.queryByTestId('calendar-grid-date-2022-02-08')).toHaveClass('calendarGrid__day--disabled');
        expect(screen.queryByTestId('calendar-grid-date-2022-02-09')).not.toHaveClass('calendarGrid__day--disabled');
        expect(screen.queryByTestId('calendar-grid-date-2022-02-10')).not.toHaveClass('calendarGrid__day--disabled');
        expect(screen.queryByTestId('calendar-grid-date-2022-02-11')).not.toHaveClass('calendarGrid__day--disabled');
        expect(screen.queryByTestId('calendar-grid-date-2022-02-09')).toHaveClass('calendarGrid__day--button');
        expect(screen.queryByTestId('calendar-grid-date-2022-02-10')).toHaveClass('calendarGrid__day--button');
        expect(screen.queryByTestId('calendar-grid-date-2022-02-11')).toHaveClass('calendarGrid__day--button');
    });
});
