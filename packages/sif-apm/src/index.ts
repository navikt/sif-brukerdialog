export { appLogger } from './appLogger';
export type { AppOwnership } from './initApm';
export {
    initApm,
    isForeignCodeException,
    isKnownNoisyException,
    isNoiseException,
    setAppOwnership,
} from './initApm';
export type { CaptureExceptionOptions } from '@nais/apm';
export { captureException, captureMessage } from '@nais/apm';
