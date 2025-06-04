import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    endretDato: Date;
    svarfrist: Date;
}

const EndretStartdatoOppgaveInfo = ({ endretDato, svarfrist }: Props) => {
    const formatertDato = dateFormatter.full(endretDato);
    return (
        <>
            <BodyLong spacing>
                Veilederen din har endret startdatoen din i ungdomsprogrammet til <strong>{formatertDato}</strong>.
            </BodyLong>
            <BodyLong spacing>Du får denne meldingen slik at du kan komme med en tilbakemelding på datoen.</BodyLong>
            <BodyLong spacing>
                Ingen tilbakemelding? Kryss av på “Nei” med én gang og send inn svaret ditt. Jo fortere du svarer, jo
                fortere får vi behandlet saken din.
            </BodyLong>
            <BodyLong spacing>
                Har du en tilbakemelding? Ta kontakt med veilederen din først. Når dere har snakket sammen, sender du
                inn svaret ditt her.
            </BodyLong>
            <BodyLong spacing>
                Hvis vi ikke hører fra deg innen svarfristen har gått ut, bruker vi {formatertDato} som startdato når vi
                går videre med søknaden din.
            </BodyLong>
            <BodyLong spacing>Fristen for å svare er {dateFormatter.full(svarfrist)}.</BodyLong>
        </>
    );
};

export default EndretStartdatoOppgaveInfo;
