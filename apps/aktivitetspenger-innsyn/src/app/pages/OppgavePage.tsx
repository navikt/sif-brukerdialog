import { Oppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { useParams } from 'react-router-dom';

import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { useInnsynContext } from '../hooks/useInnsynContext';
import { useAppIntl } from '../i18n';
import InnsynPage from '../ung-ui/components/innsyn-page/InnsynPage';
import AvvikRegisterinntektOppgave from '../ung-ui/modules/oppgaver/avvik-registerinntekt/AvvikRegisterinntektOppgavePage';
import EndretSluttdatoOppgavePage from '../ung-ui/modules/oppgaver/endret-sluttdato/EndretSluttdatoOppgavePage';
import EndretStartOgSluttdatoOppgavePage from '../ung-ui/modules/oppgaver/endret-start-og-sluttdato/EndretStartOgSluttdatoOppgavePage';
import EndretStartdatoOppgavePage from '../ung-ui/modules/oppgaver/endret-startdato/EndretStartdatoOppgavePage';
import FjernetPeriodeOppgavePage from '../ung-ui/modules/oppgaver/fjernet-periode/FjernetPeriodeOppgavePage';
import MeldtUtOppgavePage from '../ung-ui/modules/oppgaver/meldt-ut/MeldtUtOppgavePage';
import RapporterInntektOppgavePage from '../ung-ui/modules/oppgaver/rapporter-inntekt/RapporterInntektOppgavePage';
import SøkYtelseOppgavePage from '../ung-ui/modules/oppgaver/søk-ytelse/SøkYtelseOppgavePage';
import { getOppgaveDokumentTittel } from '../ung-ui/utils/textUtils';
import OppgaveIkkeFunnetPage from './OppgaveIkkeFunnetPage';

/** Url params */
type OppgavePageParams = {
    oppgaveReferanse: string;
};

const getOppgavePageComponent = (navn: string, oppgave: Oppgave) => {
    switch (oppgave.oppgavetype) {
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return <AvvikRegisterinntektOppgave oppgave={oppgave} navn={navn} />;

        case ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgavePage navn={navn} oppgave={oppgave} />;

        case ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgavePage navn={navn} oppgave={oppgave} />;

        case ParsedOppgavetype.BEKREFT_MELDT_UT:
            return <MeldtUtOppgavePage navn={navn} oppgave={oppgave} />;

        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return <RapporterInntektOppgavePage oppgave={oppgave} navn={navn} />;

        case ParsedOppgavetype.SØK_YTELSE:
            return <SøkYtelseOppgavePage oppgave={oppgave} />;

        case ParsedOppgavetype.BEKREFT_FJERNET_PERIODE:
            return <FjernetPeriodeOppgavePage oppgave={oppgave} navn={navn} />;

        case ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO:
            return <EndretStartOgSluttdatoOppgavePage navn={navn} oppgave={oppgave} />;
    }
};

const OppgavePage = () => {
    const intl = useAppIntl();
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const {
        oppgaver,
        søker: { fornavn: fornavn },
    } = useInnsynContext();
    const oppgave = oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);

    useInnsynBreadcrumbs([{ title: 'Oppgave', url: `/oppgave`, handleInApp: true }]);

    return oppgave ? (
        <InnsynPage documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            {getOppgavePageComponent(fornavn, oppgave)}
        </InnsynPage>
    ) : (
        <OppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} />
    );
};

export default OppgavePage;
