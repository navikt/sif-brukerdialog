import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const arbeidstidStepMessages: MessageFileFormat = {
    nb: {
        'arbeidstidForm.arbeidAktivitet.noValue':
            'Det er ikke registrert noen endring for {arbeidAktivitetNavn}. Hvis du ikke ønsker å registrere noen endringer, kan du gå tilbake til forrige steg og velge bort {arbeidAktivitetNavn}.',
        'arbeidstid.faktisk.mangler':
            'Du har ikke oppgitt hvor mye du jobber hos {navn} for alle uker i perioden med pleiepenger',
    },
};
