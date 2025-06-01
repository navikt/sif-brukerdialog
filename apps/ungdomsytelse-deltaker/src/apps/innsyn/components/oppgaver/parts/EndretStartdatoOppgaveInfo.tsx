import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    endretDato: Date;
}

const EndretStartdatoOppgaveInfo = ({ endretDato }: Props) => {
    return (
        <>
            <BodyLong spacing>
                Veilederen din har endret startdatoen din i ungdomsprogrammet til{' '}
                <strong>{dateFormatter.full(endretDato)}</strong>.
            </BodyLong>
            <BodyLong spacing>
                Du får denne beskjeden slik at du kan si hva du mener om den nye startdatoen før vi registrerer den.
            </BodyLong>
            <BodyLong spacing>
                Er du uenig i den nye startdatoen? Ta kontakt med veilderen din først. Når dere har snakket sammen,
                kommer du tilbake hit og sender inn svaret ditt.
            </BodyLong>
        </>
    );
};

export default EndretStartdatoOppgaveInfo;
