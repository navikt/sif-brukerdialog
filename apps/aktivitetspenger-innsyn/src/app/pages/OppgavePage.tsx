import { sifApiQueryKeys } from '@sif/api';
import { UngOppgaveIkkeFunnetPage, UngOppgavePage as UngOppgavePage } from '@sif/ung-innsyn/pages';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { useInnsynContext } from '../hooks/useInnsynContext';
import { useAppIntl } from '../i18n';

/** Url params */
type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const {
        oppgaver,
        søker: { fornavn: fornavn },
    } = useInnsynContext();
    const oppgave = oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);
    const queryClient = useQueryClient();

    useInnsynBreadcrumbs([{ title: 'Oppgave', url: `/oppgave`, handleInApp: true }]);

    return oppgave ? (
        <UngOppgavePage
            navn={fornavn}
            oppgave={oppgave}
            applikasjonTittel={text('application.title')}
            onCancel={() => navigate('/')}
            onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: sifApiQueryKeys.oppgaver });
                setTimeout(() => {
                    queryClient.refetchQueries({ queryKey: sifApiQueryKeys.oppgaver });
                }, 3000);
            }}
        />
    ) : (
        <UngOppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} applikasjonTittel={text('application.title')} />
    );
};

export default OppgavePage;
