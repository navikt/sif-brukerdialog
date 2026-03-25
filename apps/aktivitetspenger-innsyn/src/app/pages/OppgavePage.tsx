import { ParsedOppgavetype } from '@sif/api';
import { useParams } from 'react-router-dom';

import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { useInnsynContext } from '../hooks/useInnsynContext';
import AvvikRegisterinntektOppgavePage from '../ung-ui/modules/oppgaver/avvik-registerinntekt/AvvikRegisterinntektOppgavePage';
import EndretSluttdatoOppgavePage from '../ung-ui/modules/oppgaver/endret-sluttdato/EndretSluttdatoOppgavePage';
import EndretStartOgSluttdatoOppgavePage from '../ung-ui/modules/oppgaver/endret-start-og-sluttdato/EndretStartOgSluttdatoOppgavePage';
import EndretStartdatoOppgavePage from '../ung-ui/modules/oppgaver/endret-startdato/EndretStartdatoOppgavePage';
import FjernetPeriodeOppgavePage from '../ung-ui/modules/oppgaver/fjernet-periode/FjernetPeriodeOppgavePage';
import MeldtUtOppgavePage from '../ung-ui/modules/oppgaver/meldt-ut/MeldtUtOppgavePage';
import RapporterInntektOppgavePage from '../ung-ui/modules/oppgaver/rapporter-inntekt/RapporterInntektOppgavePage';
import SøkYtelseOppgavePage from '../ung-ui/modules/oppgaver/søk-ytelse/SøkYtelseOppgavePage';
import OppgaveIkkeFunnetPage from './OppgaveIkkeFunnetPage';

/** Url params */
type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const {
        oppgaver,
        søker: { fornavn: fornavn },
    } = useInnsynContext();
    const oppgave = oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);

    useInnsynBreadcrumbs([{ title: 'Oppgave', url: `/oppgave`, handleInApp: true }]);

    if (!oppgave) {
        return <OppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} />;
    }

    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return <AvvikRegisterinntektOppgavePage oppgave={oppgave} navn={fornavn} />;

        case ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgavePage navn={fornavn} oppgave={oppgave} />;

        case ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgavePage navn={fornavn} oppgave={oppgave} />;

        case ParsedOppgavetype.BEKREFT_MELDT_UT:
            return <MeldtUtOppgavePage navn={fornavn} oppgave={oppgave} />;

        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return <RapporterInntektOppgavePage oppgave={oppgave} navn={fornavn} />;

        case ParsedOppgavetype.SØK_YTELSE:
            return <SøkYtelseOppgavePage oppgave={oppgave} />;

        case ParsedOppgavetype.BEKREFT_FJERNET_PERIODE:
            return <FjernetPeriodeOppgavePage oppgave={oppgave} navn={fornavn} />;

        case ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO:
            return <EndretStartOgSluttdatoOppgavePage navn={fornavn} oppgave={oppgave} />;
    }
};

export default OppgavePage;
