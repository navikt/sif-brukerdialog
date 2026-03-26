import { UngOppgaveIkkeFunnetPage, UngOppgavePage as UngOppgavePage } from '@sif/ung-ui/pages';
import { useParams } from 'react-router-dom';

import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { useInnsynContext } from '../hooks/useInnsynContext';
import { useAppIntl } from '../i18n';

/** Url params */
type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { text } = useAppIntl();
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const {
        oppgaver,
        søker: { fornavn: fornavn },
    } = useInnsynContext();
    const oppgave = oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);

    useInnsynBreadcrumbs([{ title: 'Oppgave', url: `/oppgave`, handleInApp: true }]);

    return oppgave ? (
        <UngOppgavePage navn={fornavn} oppgave={oppgave} applikasjonTittel={text('application.title')} />
    ) : (
        <UngOppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} applikasjonTittel={text('application.title')} />
    );
};

export default OppgavePage;
