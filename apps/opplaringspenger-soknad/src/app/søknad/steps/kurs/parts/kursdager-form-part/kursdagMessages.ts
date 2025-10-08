import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    'kursdag.form.dag.label': 'Dag {harFlereDager, select, true { {dagNr}} other{}} med opplæring',
    'kursdag.form.dag.description':
        'Legg til dag og antall timer du er på opplæring, og eventuell reisetid til og fra opplæringen. Hvis du ikke reiser, trenger du ikke fylle ut timer med reise.',
    'kursdag.form.dato.label': 'Velg dato',
    'kursdag.form.tidKurs.label': 'Timer med opplæring',
    'kursdag.form.tidReise.label': 'Timer med reise',

    'kursdag.form.dato.validation.dateHasNoValue':
        '{harFlereDager, select, true { Dag {dagNr}:} other{}} Du må velge kursdato. Skriv inn eller velg dato fra datovelgeren.',

    'kursdag.form.tidKurs.validation.timeHasNoValue':
        'Du må fylle hvor lenge kurset varer{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidKurs.validation.hoursAreInvalid':
        'Antall timer med kurs er ikke et gyldig tall{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.minutesAreInvalid':
        'Antall minutter med kurs er ikke et gyldig tall{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.tooManyHours':
        'Antall timer med kurs kan ikke overstige 24 timer{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.tooManyMinutes':
        'Antall minutter med kurs kan ikke overstige 59 minutter{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.durationIsTooLong':
        'Antall timer og minutter registrert med kurs er for høyt. Tiden kan ikke overstige 24 timer hver ukedag{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.durationIsTooShort':
        'Antall timer og minutter med kurs kan ikke være mindre enn 0 timer og 0 minutter{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.minutesAreNegative':
        'Antall timer og minutter med kurs kan ikke være mindre enn 0 timer og 0 minutter{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.hoursAreNegative':
        'Antall timer og minutter med kurs kan ikke være mindre enn 0 timer og 0 minutter{harFlereDager, select, true { ({dato})} other{}}.',

    'kursdag.form.tidReise.validation.timeHasNoValue':
        'Du må fylle hvor lenge reisen varer{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidReise.validation.hoursAreInvalid':
        'Antall timer med reise er ikke et gyldig tall{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidReise.validation.minutesAreInvalid':
        'Antall minutter med reise er ikke et gyldig tall{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidReise.validation.tooManyHours':
        'Antall timer med reise kan ikke overstige 24 timer{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidReise.validation.tooManyMinutes':
        'Antall minutter med reise kan ikke overstige 59 minutter{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidReise.validation.durationIsTooLong':
        'Antall timer og minutter registrert med reise er for høyt. Tiden kan ikke overstige 24 timer hver ukedag{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidReise.validation.durationIsTooShort':
        'Antall timer og minutter med reise kan ikke være mindre enn 0 timer og 0 minutter{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidReise.validation.minutesAreNegative':
        'Antall timer og minutter med reise kan ikke være mindre enn 0 timer og 0 minutter{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidReise.validation.hoursAreNegative':
        'Antall timer og minutter med reise kan ikke være mindre enn 0 timer og 0 minutter{harFlereDager, select, true { {dato}} other{}}.',

    'kursdag.fjern.label': 'Fjern dag med kurs {harFlereDager, select, true { {dagNr}} other{}}',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type KursdagMessageKeys = keyof typeof nb;

export const kursdagMessages = {
    nb,
    nn,
};

export const useKursdagIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<KursdagMessageKeys>(intl);
};
