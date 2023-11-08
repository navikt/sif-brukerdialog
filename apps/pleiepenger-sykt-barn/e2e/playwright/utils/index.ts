import { startOfISOWeek, addWeeks, subWeeks } from 'date-fns';

export const getSøknadsdato = () => new Date();

export const getSøknadsperiode = () => ({
    from: subWeeks(startOfISOWeek(getSøknadsdato()), 3),
    to: addWeeks(startOfISOWeek(getSøknadsdato()), 1),
});
