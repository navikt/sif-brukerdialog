import { DeltakelseHistorikkDto } from '@navikt/ung-deltakelse-opplyser-api-veileder';

export interface DeltakelseHistorikkInnslag extends Omit<DeltakelseHistorikkDto, 'tidspunkt'> {
    tidspunkt: Date;
}
