import { useInnsynBreadcrumbs } from '@innsyn/hooks/useInnsynBreadcrumbs';
import { commonQueries } from '@shared/api/queries/commonQueries';
import { useDeltakerContext } from '@shared/hooks/useDeltakerContext';
import { UngOppgaveIkkeFunnetPage, UngOppgavePage } from '@sif/ung-ui/pages';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppIntl } from '../../../i18n';
/** Url params */
type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        oppgaver,
        søker: { fornavn },
    } = useDeltakerContext();
    const oppgave = oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);

    useInnsynBreadcrumbs([{ title: 'Oppgave', url: `/oppgave`, handleInApp: true }]);

    return oppgave ? (
        <UngOppgavePage
            navn={fornavn}
            oppgave={oppgave}
            applikasjonTittel={text('innsyn.sidetittel')}
            onCancel={() => navigate('/')}
            onSuccess={() => queryClient.invalidateQueries(commonQueries.deltakelseperioder)}
        />
    ) : (
        <UngOppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} applikasjonTittel={text('innsyn.sidetittel')} />
    );
};

export default OppgavePage;
