import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { useIntl } from 'react-intl';

const nb = {
    '@forms.annetBarn.list.leggTil': 'Legg til barn',
    '@forms.annetBarn.list.ingenLagtTil': 'Ingen barn er lagt til',
    '@forms.annetBarn.list.title': 'Registrerte barn',
    '@forms.annetBarn.list.født': 'Født',
    '@forms.annetBarn.dialog.title': 'Legg til barn',
    '@forms.annetBarn.form.title': 'Legg til barn',
    '@forms.annetBarn.form.fnr': 'Barnets fødselsnummer/D-nummer',
    '@forms.annetBarn.form.fødselsdato': 'Barnets fødselsdato',
    '@forms.annetBarn.form.navn': 'Barnets navn',
    '@forms.annetBarn.form.okButton': 'Ok',
    '@forms.annetBarn.form.cancelButton': 'Avbryt',
    '@forms.annetBarn.form.årsak.spm': 'Kryss av for årsaken til at du la til dette barnet selv:',
    '@forms.annetBarn.form.årsak.FOSTERBARN': 'Barnet er mitt fosterbarn',
    '@forms.annetBarn.form.årsak.ANNET': 'Annet',

    '@forms.annetBarnForm.navn.stringHasNoValue': 'Skriv inn barnets navn',
    '@forms.annetBarnForm.fødselsdato.dateHasNoValue':
        'Du må oppgi barnets fødselsdato. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.annetBarnForm.fødselsdato.dateIsBeforeMin':
        'Barnets fødselsdato kan ikke være før {dato}. Skriv inn eller velg startdato fra datovelgeren.',
    '@forms.annetBarnForm.fødselsdato.dateIsAfterMax': 'Barnets fødselsdato kan ikke være etter dagens dato',
    '@forms.annetBarnForm.fødselsdato.dateHasInvalidFormat':
        'Du må oppgi barnets fødselsdato i et gyldig format. Gyldig format er dd.mm.ååå.',
    '@forms.annetBarnForm.fnr.fødselsnummerHasNoValue': 'Skriv inn barnets fødselsnummer',
    '@forms.annetBarnForm.fnr.fødselsnummerIsInvalid':
        'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
    '@forms.annetBarnForm.fnr.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgitt et fødselsnummer som du ikke kan bruke. Kontroller at du har tastet inn barnets fødselsnummer.',
    '@forms.annetBarnForm.fnr.fødselsnummerIsNot11Chars':
        'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
    '@forms.annetBarnForm.fnr.fødselsnummerIsNotAllowed':
        'Du har oppgitt et fødselsnummer som du ikke kan bruke. Kontroller at du har tastet inn barnets fødselsnummer.',
    '@forms.annetBarnForm.type.noValue': 'Du må krysse av for årsaken til at du la til dette barnet selv.',
};
const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type AnnetBarnMessageKeys = keyof typeof nb;

export const soknadMessages = {
    nb,
    nn,
};

export const useAnnetBarnIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AnnetBarnMessageKeys>(intl);
};

export default {
    nb,
    nn,
};
