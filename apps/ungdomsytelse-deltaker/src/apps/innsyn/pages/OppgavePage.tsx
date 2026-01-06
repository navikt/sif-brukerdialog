import { useInnsynBreadcrumbs } from '@innsyn/hooks/useInnsynBreadcrumbs';
import { useRegistrerOppgaveSomÅpnet } from '@innsyn/hooks/useRegistrerOppgaveSomÅpnet';
import EndretSluttdatoOppgavePage from '@innsyn/modules/oppgaver/endret-sluttdato/EndretSluttdatoOppgavePage';
import EndretStartdatoOppgavePage from '@innsyn/modules/oppgaver/endret-startdato/EndretStartdatoOppgavePage';
import RapporterInntektOppgavePage from '@innsyn/modules/oppgaver/rapporter-inntekt/RapporterInntektOppgavePage';
import SøkYtelseOppgavePage from '@innsyn/modules/oppgaver/søk-ytelse/SøkYtelseOppgavePage';
import { useDeltakerContext } from '@shared/hooks/useDeltakerContext';
import { useParams } from 'react-router-dom';

import { ParsedOppgavetype } from '../../../types/Oppgave';
import AvvikRegisterinntektOppgavePage from '../modules/oppgaver/avvik-registerinntekt/AvvikRegisterinntektOppgavePage';
import FjernetPeriodeOppgavePage from '../modules/oppgaver/fjernet-periode/FjernetPeriodeOppgavePage';
import MeldtUtOppgavePage from '../modules/oppgaver/meldt-ut/MeldtUtOppgavePage';
import OppgaveIkkeFunnetPage from './OppgaveIkkeFunnetPage';

/** Url params */
type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = (): React.ReactElement => {
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
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return <AvvikRegisterinntektOppgavePage oppgave={oppgave} deltakerNavn={deltakerNavn} />;

        case ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgavePage deltakerNavn={deltakerNavn} oppgave={oppgave} />;

        case ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgavePage deltakerNavn={deltakerNavn} oppgave={oppgave} />;

        case ParsedOppgavetype.BEKREFT_MELDT_UT:
            return <MeldtUtOppgavePage deltakerNavn={deltakerNavn} oppgave={oppgave} />;

        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return <RapporterInntektOppgavePage oppgave={oppgave} deltakerNavn={deltakerNavn} />;

        case ParsedOppgavetype.SØK_YTELSE:
            return <SøkYtelseOppgavePage oppgave={oppgave} />;

        case ParsedOppgavetype.BEKREFT_FJERNET_PERIODE:
            return <FjernetPeriodeOppgavePage oppgave={oppgave} deltakerNavn={deltakerNavn} />;

        case ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO:
            return <>TODO</>;
    }
};

export default OppgavePage;
