import { BodyShort } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router-dom';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { EndretProgramperiodeEndringType, Oppgavetype } from '@navikt/ung-common';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import Oppgavebekreftelse from '../components/oppgavebekreftelse/Oppgavebekreftelse';
import KorrigertInntektOppgave from '../components/oppgaver/KorrigertInntektOppgave';
import EndretSluttdatoOppgaveInfo from '../components/oppgaver/parts/EndretSluttdatoOppgaveInfo';
import EndretStartdatoOppgaveInfo from '../components/oppgaver/parts/EndretStartdatoOppgaveInfo';
import { useAppIntl } from '../i18n';
import { getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../utils/textUtils';
import OppgaveIkkeFunnetPage from './OppgaveIkkeFunnet';
import DefaultPage from '../components/page-layout/DefaultPage';
import { useMarkerOppgaveSomÅpnet } from '../hooks/api/useMarkerOppgaveSomÅpnet';

type OppgavePageParams = {
    oppgaveReferanse: string;
};

const OppgavePage = () => {
    const { oppgaveReferanse } = useParams<OppgavePageParams>();
    const { deltakelsePeriode, søker } = useDeltakerContext();
    const oppgave = deltakelsePeriode.oppgaver.find((o) => o.oppgaveReferanse === oppgaveReferanse);
    const navigate = useNavigate();
    const intl = useAppIntl();

    const { mutateAsync } = useMarkerOppgaveSomÅpnet();

    useEffectOnce(() => {
        setBreadcrumbs([
            { title: 'Min side', url: '/min-side' },
            { title: 'Ditt ungdomsprogram', url: '/', handleInApp: true },
            { title: 'Oppgave', url: `/oppgave`, handleInApp: true },
        ]);
    });

    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });

    useEffectOnce(async () => {
        if (!oppgave) {
            return;
        }
        if (oppgave.åpnetDato === undefined) {
            await mutateAsync(oppgave.oppgaveReferanse).catch(() => {
                // console.error('Feil ved åpning av oppgave:', e);
            });
        }
    });

    if (!oppgave) {
        return <OppgaveIkkeFunnetPage oppgaveReferanse={oppgaveReferanse} />;
    }

    const renderOppgavebekreftelsePage = (children: React.ReactNode) => {
        const tekster = getOppgaveBekreftelseTekster(oppgave, intl);
        const oppsummering = getOppgaveOppsummering(oppgave);
        return (
            <DefaultPage title={`${tekster.tittel} - Ditt ungdomsprogram`}>
                <Oppgavebekreftelse
                    tekster={tekster}
                    oppsummering={oppsummering}
                    oppgave={oppgave}
                    deltakerNavn={søker.fornavn}>
                    {children}
                </Oppgavebekreftelse>
            </DefaultPage>
        );
    };

    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return renderOppgavebekreftelsePage(
                <KorrigertInntektOppgave oppgave={oppgave} deltakelseId={deltakelsePeriode.id} />,
            );

        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return renderOppgavebekreftelsePage(
                oppgave.oppgavetypeData.endringType === EndretProgramperiodeEndringType.ENDRET_STARTDATO ? (
                    <EndretStartdatoOppgaveInfo endretDato={oppgave.oppgavetypeData.programperiode.fraOgMed} />
                ) : (
                    <EndretSluttdatoOppgaveInfo endretDato={oppgave.oppgavetypeData.programperiode.tilOgMed} />
                ),
            );

        case Oppgavetype.RAPPORTER_INNTEKT:
            return (
                <DefaultPage title="Rapporter inntekt - Ditt ungdomsprogram">
                    <BodyShort spacing>Rapporter inntekt oppgave</BodyShort>
                </DefaultPage>
            );
    }
};

export default OppgavePage;
