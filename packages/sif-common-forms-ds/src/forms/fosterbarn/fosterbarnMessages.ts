import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

const nb = {
    '@forms.fosterbarn.form.navn_label': 'Navn',
    '@forms.fosterbarn.form.fødselsnummer_label': 'Fødselsnummer/D-nummer',
    '@forms.fosterbarn.list.legg_til_knapp': 'Legg til fosterbarn',
    '@forms.fosterbarn.list.tittel': 'Fosterbarn',
    '@forms.fosterbarn.modal.tittel': 'Legg til fosterbarn',
    '@forms.fosterbarnForm.fødselsnummer.fødselsnummerHasNoValue': 'Skriv inn barnets fødselsnummer',
    '@forms.fosterbarnForm.fødselsnummer.fødselsnummerIsInvalid':
        'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
    '@forms.fosterbarnForm.fødselsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
    '@forms.fosterbarnForm.fødselsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgitt ditt eget fødselsnummer som barnets fødselsnummer. Skriv inn barnets fødselsnummer.',
    '@forms.fosterbarnForm.navn.stringHasNoValue': 'Skriv inn barnets navn',
};
const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type FosterbarnMessageKeys = keyof typeof nb;

export const fosterbarnMessages = {
    nb,
    nn,
};

export const useFosterbarnIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<FosterbarnMessageKeys>(intl);
};
