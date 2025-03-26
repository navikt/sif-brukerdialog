import { DateRange } from '@navikt/sif-common-utils';
import { RapportPeriodeinfoDto } from '@navikt/ung-deltakelse-opplyser-api';

export interface Rapporteringsperiode extends Omit<RapportPeriodeinfoDto, 'fraOgMed' | 'tilOgMed'> {
    periode: DateRange;
    erÅpenRapporteringsperiode: boolean;
    arbeidstakerOgFrilansInntekt: number;
    inntektFraYtelse: number;
    summertInntekt: number;
}
