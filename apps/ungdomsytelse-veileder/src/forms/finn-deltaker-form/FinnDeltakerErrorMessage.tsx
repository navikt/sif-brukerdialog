import { ApiError, isApiErrorObject } from '@navikt/ung-common';
import { FinnDeltakerError, isFinnDeltakerError } from '../../api/deltaker/findDeltaker';
import ApiErrorInfo from '../../components/api-error-info/ApiErrorInfo';

interface Props {
    error: FinnDeltakerError | ApiError | null;
}

const FinnDeltakerErrorMessage = ({ error }: Props) => {
    if (isFinnDeltakerError(error)) {
        return error.message;
    } else if (isApiErrorObject(error)) {
        return <ApiErrorInfo apiError={error} />;
    } else {
        return 'En feil oppstod ved henting av deltaker';
    }
};

export default FinnDeltakerErrorMessage;
