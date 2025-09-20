import { useInnsynBreadcrumbs } from '@innsyn/hooks/useInnsynBreadcrumbs';
import { useRegistrerOppgaveSomÅpnet } from '@innsyn/hooks/useRegistrerOppgaveSomÅpnet';
import EndretSluttdatoOppgavePage from '@innsyn/modules/oppgaver/endret-sluttdato/EndretSluttdatoOppgavePage';
import EndretStartdatoOppgavePage from '@innsyn/modules/oppgaver/endret-startdato/EndretStartdatoOppgavePage';
import KorrigertInntektOppgavePage from '@innsyn/modules/oppgaver/korrigert-inntekt/KorrigertInntektOppgavePage';
import RapporterInntektOppgavePage from '@innsyn/modules/oppgaver/rapporter-inntekt/RapporterInntektOppgavePage';
import SøkYtelseOppgavePage from '@innsyn/modules/oppgaver/søk-ytelse/SøkYtelseOppgavePage';
import { Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useDeltakerContext } from '@shared/hooks/useDeltakerContext';
import { useParams } from 'react-router-dom';

import MeldtUtOppgavePage from '../modules/oppgaver/endret-sluttdato/MeldtUtOppgavePage';
import OppgaveIkkeFunnetPage from './OppgaveIkkeFunnetPage';

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
            return oppgave.oppgavetypeData.forrigeSluttdato ? (
                <EndretSluttdatoOppgavePage deltakerNavn={deltakerNavn} oppgave={oppgave} />
            ) : (
                <MeldtUtOppgavePage deltakerNavn={deltakerNavn} oppgave={oppgave} />
            );

        case Oppgavetype.RAPPORTER_INNTEKT:
            return <RapporterInntektOppgavePage oppgave={oppgave} deltakerNavn={deltakerNavn} />;

        case Oppgavetype.SØK_YTELSE:
            return <SøkYtelseOppgavePage oppgave={oppgave} />;
    }
};

export default OppgavePage;
