import { Heading, VStack } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router-dom';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import OppgaveWrapper from '../components/oppgaver/OppgaveWrapper';
import OppgaveIkkeFunnetPage from './OppgaveIkkeFunnet';

type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const { deltakelsePeriode } = useDeltakerContext();
    const oppgave = deltakelsePeriode.oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);
    const navigate = useNavigate();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Ungdomsprogramytelse', url: '/', handleInApp: true },
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
                <OppgaveWrapper
                    oppgave={oppgave}
                    deltakelseId={deltakelsePeriode.id}
                    programPeriode={deltakelsePeriode.programPeriode}
                />
            </VStack>
        </Page>
    );
};

export default OppgavePage;
