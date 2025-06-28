import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

export interface DeltakelseHistorikkInnslag extends Omit<VeilederApi.DeltakelseHistorikkDto, 'tidspunkt'> {
    tidspunkt: Date;
}
