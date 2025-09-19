import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { useAppIntl } from '../../../../i18n';
import { EndretStartdatoOppgave } from '../../../../types/Oppgave';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel } from '../../utils/textUtils';
import { EndretStartdatoOppsummering } from './parts/EndretStartdatoOppsummering';

interface Props {
    deltakerNavn: string;
    oppgave: EndretStartdatoOppgave;
    initialVisKvittering?: boolean;
}

export const EndretStartdatoOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();
    const formatertDato = (
        <span className="text-nowrap">{dateFormatter.full(oppgave.oppgavetypeData.nyStartdato)}</span>
    );
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(oppgave.frist)}</span>;

    const sidetittel = intl.text('oppgavetype.BEKREFT_ENDRET_STARTDATO.sidetittel');
    const oppgavetittel = intl.text('oppgavetype.BEKREFT_ENDRET_STARTDATO.oppgavetittel');
    const harTilbakemeldingSpørsmål = intl.text('oppgavetype.BEKREFT_ENDRET_STARTDATO.harTilbakemeldingSpørsmål');
    const tilbakemeldingFritekstLabel = intl.text('oppgavetype.BEKREFT_ENDRET_STARTDATO.tilbakemeldingFritekstLabel');
    const kvitteringTekst = intl.text('oppgavetype.BEKREFT_ENDRET_STARTDATO.kvitteringTekst');

    return (
        <DefaultPageLayout documentTitle={getDokumentTittel(sidetittel)}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                oppgavetittel={oppgavetittel}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart
                    spørsmål={harTilbakemeldingSpørsmål}
                    tilbakemeldingLabel={tilbakemeldingFritekstLabel}>
                    <BodyLong spacing>
                        Veilederen din har endret startdatoen din i ungdomsprogrammet til{' '}
                        <strong>{formatertDato}</strong>.
                    </BodyLong>
                    <BodyLong spacing>
                        Du får denne meldingen slik at du kan komme med en tilbakemelding på datoen.
                    </BodyLong>
                    <BodyLong spacing>
                        Ingen tilbakemelding? Kryss av på &quot;Nei&quot; med én gang og send inn svaret ditt. Jo
                        fortere du svarer, jo fortere får vi behandlet saken din.
                    </BodyLong>
                    <BodyLong spacing>
                        Har du en tilbakemelding? Ta kontakt med veilederen din først. Når dere har snakket sammen,
                        sender du inn svaret ditt her.
                    </BodyLong>
                    <BodyLong spacing weight="semibold">
                        Fristen for å svare er {formatertFrist}.
                    </BodyLong>
                    <BodyLong spacing>
                        Hvis vi ikke hører fra deg innen svarfristen har gått ut, bruker vi {formatertDato} som
                        startdato når vi behandler saken din.
                    </BodyLong>
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart spørsmål={harTilbakemeldingSpørsmål}>
                    <EndretStartdatoOppsummering oppgave={oppgave} />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>{kvitteringTekst}</Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};
