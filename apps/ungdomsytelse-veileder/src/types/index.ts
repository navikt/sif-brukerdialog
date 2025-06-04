import { Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api';
import { UtvidetRevisjonstype } from './UtvidetRevisjonstype';

export interface DeltakelseHistorikkInnslag {
    tidspunkt: Date;
    revisjonstype: UtvidetRevisjonstype | Revisjonstype;
    utfører: string;
}
