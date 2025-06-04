import { Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api';

export enum UtvidetRevisjonstype {
    OPPRETTET = Revisjonstype.OPPRETTET,
    ENDRET = Revisjonstype.ENDRET,
    SLETTET = Revisjonstype.SLETTET,
    UKJENT = Revisjonstype.UKJENT,
    SØKNAD_INNSENDT = 'SØKNAD_INNSENDT',
}
