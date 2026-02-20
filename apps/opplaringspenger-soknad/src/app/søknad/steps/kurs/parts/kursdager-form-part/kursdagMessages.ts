import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

const nb = {
    'kursdag.form.dag.label': 'Dag {harFlereDager, select, true { {dagNr}} other{}} med opplæring',
    'kursdag.form.dato.label': 'Velg dato',

    'kursdag.form.dato.validation.dateHasNoValue':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du må velge dato. Skriv inn eller velg dato fra datovelgeren.',
    'kursdag.form.dato.validation.dateHasInvalidFormat':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du må oppgi dato i et gyldig format. Gyldig format er dd.mm.åååå.',
    'kursdag.form.dato.validation.likeKursdager':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du har oppgitt samme dato flere ganger.',
    'kursdag.form.dato.validation.erHelgedag':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du kan ikke velge en lørdag eller søndag.',

    'kursdag.fjern.label': 'Fjern dag {harFlereDager, select, true { {dagNr}} other{}}',
};

const nn: Record<keyof typeof nb, string> = {
    'kursdag.form.dag.label': 'Dag {harFlereDager, select, true { {dagNr}} other{}} med opplæring',
    'kursdag.form.dato.label': 'Vel dato',
    'kursdag.form.dato.validation.dateHasNoValue':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du må velje dato. Skriv inn eller vel dato frå datoveljaren.',
    'kursdag.form.dato.validation.dateHasInvalidFormat':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du må oppgje dato i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'kursdag.form.dato.validation.likeKursdager':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du har oppgjeve same dato fleire gongar.',
    'kursdag.form.dato.validation.erHelgedag':
        '{harFlereDager, select, true { Dag {dagNr}: } other{}}Du kan ikkje velje ein laurdag eller sundag.',
    'kursdag.fjern.label': 'Fjern dag {harFlereDager, select, true { {dagNr}} other{}}',
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
