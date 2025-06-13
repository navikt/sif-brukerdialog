import { ApiError, fødselsnummerFormatter } from '@navikt/ung-common';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import { Alert } from '@navikt/ds-react';
import { isAxiosError } from 'axios';

interface Props {
    error: ApiError;
    fnr: string;
}

const getFeilmelding = (fnr: string, error: ApiError): string | undefined => {
    const formattedFnr = fødselsnummerFormatter.applyFormat(fnr);
    if (isAxiosError(error.originalError)) {
        switch (error.originalError.status) {
            case 403:
                return `Kunne ikke hente opp personen med fødselsnummer ${formattedFnr} fordi du ikke har tilgang. Årsak: ${error.message}`;
            case 404:
                return `Kunne ikke finne personen med fødselsnummer ${formattedFnr}.`;
            case 500:
                return `En intern serverfeil oppstod ved henting av deltaker med fnr ${formattedFnr}. Vennligst prøv igjen senere.`;
        }
    }
    return `Det oppstod en feil ved henting av deltaker med fnr ${formattedFnr}. Vennligst prøv igjen senere.`;
};

const FinnDeltakerApiError = ({ error, fnr }: Props) => {
    const feilmelding = getFeilmelding(fnr, error);
    return feilmelding ? <Alert variant="error">{feilmelding}</Alert> : <ApiErrorAlert error={error} />;
};

export default FinnDeltakerApiError;
