import { DeltakelseHistorikkDto } from '@navikt/ung-deltakelse-opplyser-api';

export interface DeltakelseHistorikkInnslag extends Omit<DeltakelseHistorikkDto, 'tidspunkt'> {
    tidspunkt: Date;
}
