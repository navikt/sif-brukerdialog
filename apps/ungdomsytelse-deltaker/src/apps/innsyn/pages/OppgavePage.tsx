import { Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useParams } from 'react-router-dom';

import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { useRegistrerOppgaveSomÅpnet } from '../hooks/useRegistrerOppgaveSomÅpnet';
import { EndretSluttdatoOppgavePageV2 } from '../oppgaver/endret-sluttdato/EndretSluttdatoOppgavePageV2';
import { EndretStartdatoOppgavePageV2 } from '../oppgaver/endret-startdato/EndretStartdatoOppgavePageV2';
import { KorrigertInntektOppgavePageV2 } from '../oppgaver/korrigert-inntekt/KorrigertInntektOppgavePageV2';
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
            return <KorrigertInntektOppgavePageV2 oppgave={oppgave} deltakerNavn={deltakerNavn} />;

        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgavePageV2 deltakerNavn={deltakerNavn} oppgave={oppgave} />;

        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgavePageV2 deltakerNavn={deltakerNavn} oppgave={oppgave} />;

        case Oppgavetype.RAPPORTER_INNTEKT:
            return <RapporterInntektOppgavePage oppgave={oppgave} deltakerNavn={deltakerNavn} />;

        case Oppgavetype.SØK_YTELSE:
            return <SøkYtelseOppgavePage oppgave={oppgave} />;
    }
};

export default OppgavePage;
