import { ApiError, fødselsnummerFormatter } from '@navikt/ung-common';
import ApiErrorAlert from '../../components/api-error-alert/ApiErrorAlert';
import { Alert, BodyShort, Box } from '@navikt/ds-react';
import { isAxiosError } from 'axios';
import FødselsnummerInline from '../../atoms/FødselsnummerInline';

interface Props {
    error: ApiError;
    fnr: string;
}

const getFinnDeltakerFeilmelding = (fnr: string, error: ApiError): React.ReactNode | undefined => {
    const formattedFnr = fødselsnummerFormatter.applyFormat(fnr);
    if (isAxiosError(error.originalError)) {
        switch (error.originalError.status) {
            case 403:
                return (
                    <Box>
                        <BodyShort spacing>
                            Kunne ikke hente opp personen med fødselsnummer <FødselsnummerInline fnr={fnr} /> fordi du
                            ikke har tilgang.
                        </BodyShort>
                        <BodyShort size="small">Årsak: {error.message}</BodyShort>
                    </Box>
                );
            case 404:
                return `Kunne ikke finne personen med fødselsnummer ${formattedFnr}.`;
            case 500:
                return `En intern serverfeil oppstod ved henting av deltaker med fnr ${formattedFnr}. Vennligst prøv igjen senere.`;
        }
    }
    return `Det oppstod en feil ved henting av deltaker med fnr ${formattedFnr}. Vennligst prøv igjen senere.`;
};

const FinnDeltakerApiError = ({ error, fnr }: Props) => {
    const finnDeltakerFeilmelding = getFinnDeltakerFeilmelding(fnr, error);
    if (finnDeltakerFeilmelding) {
        return <Alert variant="error">{finnDeltakerFeilmelding}</Alert>;
    }
    return <ApiErrorAlert error={error} />;
};

export default FinnDeltakerApiError;
