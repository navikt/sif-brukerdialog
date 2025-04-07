import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useDeltakerContext } from '../../../context/DeltakerContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Heading, VStack } from '@navikt/ds-react';
import OppgaveIkkeFunnetPage from './OppgaveIkkeFunnet';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import OppgavePanel from '../components/oppgaver/OppgavePanel';
import { onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';

type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const { deltakelse } = useDeltakerContext();
    const oppgave = deltakelse.oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);
    const navigate = useNavigate();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Ungdomsytelse', url: '/', handleInApp: true },
            { title: 'Oppgave', url: `/oppgave`, handleInApp: true },
        ]);
    });

    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });

    if (!oppgave) {
        return <OppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} />;
    }

    return (
        <Page title="Din ungdomsytelse">
            <VStack gap="8">
                {oppgave.status}
                <Heading level="1" size="large">
                    {oppgave.oppgavetype}
                </Heading>
                <OppgavePanel
                    oppgave={oppgave}
                    deltakelseId={deltakelse.id}
                    programPeriode={deltakelse.programPeriode}
                />
            </VStack>
        </Page>
    );
};

export default OppgavePage;
