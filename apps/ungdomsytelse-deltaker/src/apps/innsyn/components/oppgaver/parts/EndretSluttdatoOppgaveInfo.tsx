import { dateFormatter } from '@navikt/sif-common-utils';
import { Alert, BodyLong } from '@navikt/ds-react';

interface Props {
    endretDato?: Date;
}

const EndretSluttdatoOppgaveInfo = ({ endretDato }: Props) => {
    if (!endretDato) {
        return <Alert variant="error">Ingen dato for endring av sluttdato er angitt.</Alert>;
    }
    return (
        <>
            <BodyLong spacing>
                Veilederen din har satt datoen for når du går ut av ungdomsprogrammet til{' '}
                <strong>{dateFormatter.full(endretDato)}</strong>.
            </BodyLong>
            <BodyLong spacing>
                Du får denne beskjeden slik at du kan si hva du mener om sluttdatoen før vi registrerer den.
            </BodyLong>
            <BodyLong spacing>
                Er du uenig i sluttdatoen? Ta kontakt med veilderen din først. Når dere har snakket sammen, kommer du
                tilbake hit og sender inn svaret ditt.
            </BodyLong>
        </>
    );
};

export default EndretSluttdatoOppgaveInfo;
