import { useInnsynBreadcrumbs } from '@innsyn/hooks/useInnsynBreadcrumbs';
import { useDeltakerContext } from '@shared/hooks/useDeltakerContext';
import { sifApiQueryKeys } from '@sif/api';
import { UngOppgaveIkkeFunnetPage, UngOppgavePage } from '@sif/ung-innsyn/pages';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppIntl } from '../../../i18n';
import UngLoadingPage from '../../../pages/UngLoadingPage';
import getLenker from '../../../utils/lenker';
/** Url params */
type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const refetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const [isRefetching, setIsRefetching] = useState(true);
    const {
        oppgaver,
        søker: { fornavn },
    } = useDeltakerContext();
    const oppgave = oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);

    useEffect(() => {
        queryClient.refetchQueries({ queryKey: sifApiQueryKeys.oppgaver }).then(() => {
            setIsRefetching(false);
        });
        return () => {
            clearTimeout(refetchTimeoutRef.current);
        };
    }, []);

    useInnsynBreadcrumbs([{ title: 'Oppgave', url: `/oppgave`, handleInApp: true }]);

    if (isRefetching) {
        return <UngLoadingPage />;
    }

    return oppgave ? (
        <UngOppgavePage
            navn={fornavn}
            oppgave={oppgave}
            applikasjonTittel={text('innsyn.sidetittel')}
            dokumentarkivUrl={getLenker().dokumentarkiv}
            onCancel={() => navigate('/')}
            onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: sifApiQueryKeys.oppgaver });
                clearTimeout(refetchTimeoutRef.current);
                /** Venter pga oppdateringer i backend kan ta litt tid */
                refetchTimeoutRef.current = setTimeout(() => {
                    queryClient.refetchQueries({ queryKey: sifApiQueryKeys.oppgaver });
                }, 3000);
            }}
        />
    ) : (
        <UngOppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} applikasjonTittel={text('innsyn.sidetittel')} />
    );
};

export default OppgavePage;
