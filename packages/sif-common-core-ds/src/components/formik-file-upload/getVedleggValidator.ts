import { IntlErrorObject, ValidationFunction } from '@navikt/sif-common-formik-ds';
import { Vedlegg } from '../../types/Vedlegg';
import { getTotalSizeOfVedlegg, removeDuplicateVedlegg, vedleggIsUploadedAndValid } from '../../utils/vedleggUtils';

export const MAX_FILESIZE_FOR_UPLOAD = 7999999;
export const MAX_TOTAL_VEDLEGG_SIZE_IN_MB = 24;
export const BYTES_PER_MB = 1024 * 1024;
export const MAX_TOTAL_VEDLEGG_SIZE_BYTES = MAX_TOTAL_VEDLEGG_SIZE_IN_MB * BYTES_PER_MB;

export enum ValidateVedleggError {
    noVedleggUploaded = 'noVedleggUploaded',
    tooManyVedlegg = 'tooManyVedlegg',
    maxTotalSizeExceeded = 'maxTotalSizeExceeded',
}

export const ValidateVedleggErrorKeys = Object.keys(ValidateVedleggError);

const INTL_ERROR_PREFIX = '@core.formikVedleggList.validation';

type VedleggValidationResult =
    | undefined
    | ValidateVedleggError.tooManyVedlegg
    | ValidateVedleggError.noVedleggUploaded
    | ValidateVedleggError.maxTotalSizeExceeded;

type VedleggErrorsProp = Omit<IntlErrorObject, 'key'> & {
    keyPrefix: string;
};

export type VedleggValidatorOptions = {
    required?: boolean;
    maxTotalSize?: number;
    errors?: {
        [ValidateVedleggError.noVedleggUploaded]?: VedleggErrorsProp;
        [ValidateVedleggError.tooManyVedlegg]?: VedleggErrorsProp;
        [ValidateVedleggError.maxTotalSizeExceeded]?: VedleggErrorsProp;
    };
    /**
     * Fixed intl keys are used if set. Overridden by errors
     */
    intlErrorPrefix?: string;
    useDefaultMessages?: boolean;
};

export type VedleggValidator = ReturnType<typeof getVedleggValidator>;

export const getVedleggValidator =
    (
        options: VedleggValidatorOptions = {},
        otherVedlegg?: Vedlegg[],
    ): ValidationFunction<VedleggValidationResult | IntlErrorObject> =>
    (vedlegg: Vedlegg[] = []) => {
        const {
            required,
            maxTotalSize = MAX_TOTAL_VEDLEGG_SIZE_BYTES,
            errors,
            intlErrorPrefix,
            useDefaultMessages,
        } = options;
        const uploadedVedlegg = vedlegg.filter((attachment) => vedleggIsUploadedAndValid(attachment));
        const allVedlegg = removeDuplicateVedlegg([...uploadedVedlegg, ...(otherVedlegg || [])]);
        const totalSizeInBytes: number = getTotalSizeOfVedlegg(allVedlegg);

        const getErrorKey = (error: ValidateVedleggError) => {
            if (errors && errors[error]) {
                const errObj: IntlErrorObject = {
                    ...errors[error],
                    key: `${errors[error].keyPrefix}.${error}`,
                };
                return errObj;
            }
            if (intlErrorPrefix || useDefaultMessages) {
                const errObj: IntlErrorObject = {
                    key: `${intlErrorPrefix || INTL_ERROR_PREFIX}.${error}`,
                    keepKeyUnaltered: true,
                };
                return errObj;
            }
            return error;
        };

        if (required) {
            if (vedlegg.length === 0) {
                return getErrorKey(ValidateVedleggError.noVedleggUploaded);
            }
        }
        if (totalSizeInBytes > maxTotalSize) {
            return getErrorKey(ValidateVedleggError.maxTotalSizeExceeded);
        }
        if (uploadedVedlegg.length > 100) {
            return getErrorKey(ValidateVedleggError.tooManyVedlegg);
        }
        if (required && uploadedVedlegg.length === 0) {
            return getErrorKey(ValidateVedleggError.noVedleggUploaded);
        }
        return undefined;
    };
