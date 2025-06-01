import { Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api';

export interface DeltakelseHistorikkInnslag {
    tidspunkt: Date;
    revisjonstype: Revisjonstype;
    utfører: string;
}
