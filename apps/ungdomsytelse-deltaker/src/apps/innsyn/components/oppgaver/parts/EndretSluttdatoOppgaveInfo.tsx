import { dateFormatter } from '@navikt/sif-common-utils';
import { BodyLong } from '@navikt/ds-react';

interface Props {
    endretDato: Date;
    endretFraDato?: Date;
    svarfrist: Date;
}

const EndretSluttdatoOppgaveInfo = ({ endretDato, svarfrist, endretFraDato }: Props) => {
    const formatertDato = dateFormatter.full(endretDato);

    return endretFraDato === undefined ? (
        /** Første gang sluttdapo settes */
        <>
            <BodyLong spacing>
                Veilederen din har meldt deg ut av ungdomsprogrammet fra og med <strong>{formatertDato}</strong>.
            </BodyLong>
            <BodyLong spacing>Du får denne meldingen slik at du kan komme med en tilbakemelding på datoen. </BodyLong>
            <BodyLong spacing>
                Ingen tilbakemelding? Kryss av på “Nei” med én gang og send inn svaret ditt. Jo fortere du svarer, jo
                fortere får vi behandlet saken din.
            </BodyLong>
            <BodyLong spacing>
                Har du en tilbakemelding? Ta kontakt med veilederen din først. Når dere har snakket sammen, sender du
                inn svaret ditt her.
            </BodyLong>
            <BodyLong spacing>
                Hvis vi ikke hører fra deg innen svarfristen har gått ut, bruker vi {formatertDato} som sluttdato når vi
                behandler saken din.
            </BodyLong>
            <BodyLong spacing>Fristen for å svare er {dateFormatter.full(svarfrist)}.</BodyLong>
        </>
    ) : (
        <>
            <BodyLong spacing>
                Veilederen din har endret sluttdatoen din i ungdomsprogrammet til <strong>{formatertDato}</strong>.
            </BodyLong>
            <BodyLong spacing>Du får denne meldingen slik at du kan komme med en tilbakemelding på datoen. </BodyLong>
            <BodyLong spacing>
                Ingen tilbakemelding? Kryss av på “Nei” med én gang og send inn svaret ditt. Jo fortere du svarer, jo
                fortere får vi behandlet saken din.
            </BodyLong>
            <BodyLong spacing>
                Har du en tilbakemelding? Ta kontakt med veilederen din først. Når dere har snakket sammen, sender du
                inn svaret ditt her.
            </BodyLong>
            <BodyLong spacing>
                Hvis vi ikke hører fra deg innen svarfristen har gått ut, bruker vi {formatertDato} som sluttdato når vi
                behandler saken din.
            </BodyLong>
            <BodyLong spacing>Fristen for å svare er {dateFormatter.full(svarfrist)}.</BodyLong>
        </>
    );
};

export default EndretSluttdatoOppgaveInfo;
