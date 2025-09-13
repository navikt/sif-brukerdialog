import { useParams } from 'react-router-dom';
import { Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { useRegistrerOppgaveSomÅpnet } from '../hooks/useRegistrerOppgaveSomÅpnet';
import { EndretSluttdatoOppgavePage } from '../oppgaver/endret-sluttdato/EndretSluttdatoOppgavePage';
import { EndretStartdatoOppgavePage } from '../oppgaver/endret-startdato/EndretStartdatoOppgavePage';
import { KorrigertInntektOppgavePage } from '../oppgaver/korrigert-inntekt/KorrigertInntektOppgavePage';
import OppgaveIkkeFunnetPage from '../oppgaver/oppgave-ikke-funnet/OppgaveIkkeFunnetPage';
import RapporterInntektOppgavePage from '../oppgaver/rapporter-inntekt/RapporterInntektOppgavePage';
import SøkYtelseOppgavePage from '../oppgaver/søk-ytelse/SøkYtelseOppgavePage';

/** Url params */
type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const {
        deltakelsePeriode,
        søker: { fornavn: deltakerNavn },
    } = useDeltakerContext();
    const oppgave = deltakelsePeriode.oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);

    useInnsynBreadcrumbs([{ title: 'Oppgave', url: `/oppgave`, handleInApp: true }]);
    useRegistrerOppgaveSomÅpnet(oppgave);

    if (!oppgave) {
        return <OppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} />;
    }

    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return <KorrigertInntektOppgavePage oppgave={oppgave} deltakerNavn={deltakerNavn} />;

        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgavePage deltakerNavn={deltakerNavn} oppgave={oppgave} />;

        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgavePage deltakerNavn={deltakerNavn} oppgave={oppgave} />;

        case Oppgavetype.RAPPORTER_INNTEKT:
            return <RapporterInntektOppgavePage oppgave={oppgave} deltakerNavn={deltakerNavn} />;

        case Oppgavetype.SØK_YTELSE:
            return <SøkYtelseOppgavePage oppgave={oppgave} />;
    }
};

export default OppgavePage;
