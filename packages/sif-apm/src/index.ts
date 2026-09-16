export { appLogger } from './appLogger';
export {
    initApm,
    isForeignCodeException,
    isKnownNoisyException,
    isNoiseException,
    setAppOwnership,
} from './initApm';
export type { AppOwnership } from './initApm';
export { captureException, captureMessage } from '@nais/apm';
export type { CaptureExceptionOptions } from '@nais/apm';
