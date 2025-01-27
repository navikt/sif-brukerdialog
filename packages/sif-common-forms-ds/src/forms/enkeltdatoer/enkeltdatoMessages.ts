import { useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    '@forms.enkeltdato.form.title': 'Dato',
    '@forms.enkeltdato.form.okButton': 'Ok',
    '@forms.enkeltdato.form.cancelButton': 'Avbryt',
    '@forms.enkeltdato.form.dato.label': 'Velg dato',
    '@forms.enkeltdato.form.dato.dateHasNoValue':
        'Du må oppgi en gyldig dato. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.enkeltdato.form.dato.dateIsAfterMax':
        'Datoen kan ikke være etter {dato}. Skriv inn eller velg dato fra datovelgeren.',
    '@forms.enkeltdato.form.dato.dateIsBeforeMin':
        'Datoen kan ikke være før {dato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    '@forms.enkeltdato.form.dato.dateHasInvalidFormat':
        'Du må oppgi datoen i et gyldig format. Gyldig format er dd.mm.åååå.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type EnkeltdatoMessageKeys = keyof typeof nb;

export const enkeltdatoMessages = {
    nb,
    nn,
};

export const useEnkeltdatoIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<EnkeltdatoMessageKeys>(intl);
};
