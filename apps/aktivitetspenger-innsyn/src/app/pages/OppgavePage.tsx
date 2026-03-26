import { InnsynPage } from '@sif/ung-ui/components';
import { OppgaveRenderer } from '@sif/ung-ui/modules';
import { useParams } from 'react-router-dom';

import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { useInnsynContext } from '../hooks/useInnsynContext';
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

    return oppgave ? (
        <InnsynPage documentTitle="Oppgaveside">
            <OppgaveRenderer navn={fornavn} oppgave={oppgave} />
        </InnsynPage>
    ) : (
        <OppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} />
    );
};

export default OppgavePage;
