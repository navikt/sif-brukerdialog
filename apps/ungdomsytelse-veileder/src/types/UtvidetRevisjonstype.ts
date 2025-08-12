import { Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api-veileder';

enum RevisjonstypeSøknadInnsendt {
    'SØKNAD_INNSENDT' = 'SØKNAD_INNSENDT',
}

export enum UtvidetRevisjonstype {
    'OPPRETTET' = Revisjonstype.OPPRETTET,
    'ENDRET' = Revisjonstype.ENDRET,
    'SLETTET' = Revisjonstype.SLETTET,
    'UKJENT' = Revisjonstype.UKJENT,
    'SØKNAD_INNSENDT' = RevisjonstypeSøknadInnsendt.SØKNAD_INNSENDT,
}
