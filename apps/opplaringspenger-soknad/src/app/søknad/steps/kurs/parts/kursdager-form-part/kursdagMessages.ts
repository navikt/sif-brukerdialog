import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    'kursdag.form.dag.label': 'Dag {harFlereDager, select, true { {dagNr}} other{}} med opplæring',
    'kursdag.form.dato.label': 'Velg dato',
    'kursdag.form.tidKurs.label': 'Timer med opplæring',
    'kursdag.form.tidReise.label': 'Timer med reise',

    'kursdag.form.dato.validation.dateHasNoValue':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du må velge dato. Skriv inn eller velg dato fra datovelgeren.',
    'kursdag.form.dato.validation.dateHasInvalidFormat':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du må oppgi dato i et gyldig format. Gyldig format er dd.mm.åååå.',
    'kursdag.form.dato.validation.likeKursdager':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du har oppgitt samme dato flere ganger.',
    'kursdag.form.dato.validation.erHelgedag':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du kan ikke velge en lørdag eller søndag.',

    'kursdag.form.tidKurs.validation.timeHasNoValue':
        'Du må fylle hvor lenge kurset varer{harFlereDager, select, true { (dag {dagNr}, {dato})} other{}}.',
    'kursdag.form.tidKurs.validation.hoursAreInvalid':
        'Antall timer er ikke et gyldig tall{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.minutesAreInvalid':
        'Antall minutter er ikke et gyldig tall{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.tooManyHours':
        'Antall timer kan ikke overstige 24 timer{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.tooManyMinutes':
        'Antall minutter kan ikke overstige 59 minutter{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.durationIsTooLong':
        'Antall timer og minutter registrert er for høyt. Tiden kan ikke overstige 24 timer{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.durationIsTooShort':
        'Antall timer og minutter kan ikke være mindre enn 1 time{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.minutesAreNegative':
        'Antall timer og minutter kan ikke være mindre enn 1 time{harFlereDager, select, true { ({dato})} other{}}.',
    'kursdag.form.tidKurs.validation.hoursAreNegative':
        'Antall timer og minutter kan ikke være mindre enn 1 time{harFlereDager, select, true { ({dato})} other{}}.',

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
        'Antall timer og minutter registrert med reise er for høyt. Tiden kan ikke overstige 24 timer{harFlereDager, select, true { {dato}} other{}}.',
    'kursdag.form.tidReise.validation.durationIsTooShort':
        'Antall timer og minutter med reise kan ikke være mindre enn 30 minutter{harFlereDager, select, true { {dato}} other{}}. Hvis du ikke har reisetid må du sette timer og minutter til 0.',
    'kursdag.form.tidReise.validation.minutesAreNegative':
        'Antall minutter med reise {harFlereDager, select, true { {dato},} other{}} kan ikke være et negativt tall.',
    'kursdag.form.tidReise.validation.hoursAreNegative':
        'Antall timer med reise {harFlereDager, select, true { {dato},} other{}} kan ikke være mindre et negativt tall.',

    'kursdag.fjern.label': 'Fjern dag {harFlereDager, select, true { {dagNr}} other{}}',
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
