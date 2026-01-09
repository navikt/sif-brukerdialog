import { NaturalYtelseTypeDto } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';

export const naturalytelseNavn: Record<NaturalYtelseTypeDto, string> = {
    ELEKTRISK_KOMMUNIKASJON: 'Elektronisk kommunikasjon',
    AKSJER_GRUNNFONDSBEVIS_TIL_UNDERKURS: 'Aksjer / grunnfondsbevis til underkurs',
    LOSJI: 'Losji',
    KOST_DØGN: 'Kost (døgn)',
    BESØKSREISER_HJEMMET_ANNET: 'Besøksreiser i hjemmet annet',
    KOSTBESPARELSE_I_HJEMMET: 'Kostbesparelse i hjemmet',
    RENTEFORDEL_LÅN: 'Rentefordel lån',
    BIL: 'Bil',
    KOST_DAGER: 'Kost (dager)',
    BOLIG: 'Bolig',
    SKATTEPLIKTIG_DEL_FORSIKRINGER: 'Skattepliktig del av visse forsikringer',
    FRI_TRANSPORT: 'Fri transport',
    OPSJONER: 'Opsjoner',
    TILSKUDD_BARNEHAGEPLASS: 'Tilskudd barnehageplass',
    BEDRIFTSBARNEHAGEPLASS: 'Bedriftsbarnehageplass',
    YRKEBIL_TJENESTLIGBEHOV_KILOMETER: 'Yrkesbil tjenestlig behov kilometer',
    YRKEBIL_TJENESTLIGBEHOV_LISTEPRIS: 'Yrkesbil tjenestlig behov listepris',
    INNBETALING_TIL_UTENLANDSK_PENSJONSORDNING: 'Innbetaling utenlandsk pensjonsordning',
    ANNET: 'Annet',
    UDEFINERT: 'Udefinert',
};
