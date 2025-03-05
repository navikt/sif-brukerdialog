import { veilederApiService } from './veilederApiService';
import { deltakerApiService } from './deltakerApiService';

export { veilederApiService } from './veilederApiService';
export { deltakerApiService } from './deltakerApiService';

export const ungDeltakelseApiService = {
    veileder: veilederApiService,
    deltaker: deltakerApiService,
};
