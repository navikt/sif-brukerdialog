import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

export enum UtvidetRevisjonstype {
    OPPRETTET = VeilederApi.Revisjonstype.OPPRETTET,
    ENDRET = VeilederApi.Revisjonstype.ENDRET,
    SLETTET = VeilederApi.Revisjonstype.SLETTET,
    UKJENT = VeilederApi.Revisjonstype.UKJENT,
    SØKNAD_INNSENDT = 'SØKNAD_INNSENDT',
}
